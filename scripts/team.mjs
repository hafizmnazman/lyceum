// The two-repo team workflow. This folder stays the source of truth, with its
// own README and history. The team repo is a private sandbox where teammates
// branch freely. Nothing from this repo's history ever reaches the team repo:
// every publish is a fresh snapshot commit on top of the team's main, built
// without touching this working tree or its index.
//
//   node scripts/team.mjs init <team-repo-url>    add the remote, the push guard and the pre-push hook
//   node scripts/team.mjs publish [--dry-run] [--force] [-m "note"]
//                                                 snapshot this working tree onto the team's main
//   node scripts/team.mjs status                  team branches and open pull requests
//   node scripts/team.mjs review <branch>         what a branch changes; the full diff goes to a file
//   node scripts/team.mjs take <branch> [path...] merge a branch's changes, or only some paths, into
//                                                 this working tree (files it changes are backed up first)
//
// What the team repo gets: every tracked or untracked, non-ignored file here,
// minus EXCLUDE, with team-overlay/ mapped to the root (its README.md,
// FEEDBACK.md, .github/ and gitignore replace this repo's). Teammates' edits to
// those files come back into team-overlay/ when you take them.
// This file is never published.

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const REMOTE = "team";
const OVERLAY = "team-overlay/";
const EXCLUDE = [
  (p) => p === "README.md", // this repo's README stays here
  (p) => p.startsWith(".github/"), // this repo's GitHub and README assets
  (p) => p === "scripts/team.mjs", // this tool
  // The owner's plans, records and reviews stay here too (the owner's word, 22 October 2026): the team gets
  // the working code and what its checks read (docs/claims.md, docs/research/, the guide, the palette, the shots).
  (p) => ["CLAUDE.md", "DECISIONS.md", "JUDGES.md"].includes(p),
  (p) => /^docs\/(lyceum-upgrade-plan|lyceum-improvement-plan|run-log|decisions|as-built|demo-script)\.md$/.test(p),
  (p) => /^docs\/(review|history|competition)\//.test(p),
  // Screenshots from before the current shot script, which nothing reads.
  (p) => /^docs\/presentation\/shot-(agents|evidence-table|home-with-brief|how-it-works|inbox-brief|meeting-brief|studio-journey|update-hours)\.png$/.test(p),
];
const HOOK_MARK = "lyceum-team-guard";

function git(args, opts = {}) {
  const r = spawnSync("git", args, { input: opts.input, env: { ...process.env, ...(opts.env ?? {}) }, maxBuffer: 1 << 28, encoding: opts.buffer ? "buffer" : "utf8" });
  if (r.error) throw r.error;
  if (r.status !== 0 && !opts.allowFail) throw new Error("git " + args.join(" ") + " failed:\n" + String(r.stderr).trim());
  return opts.allowFail ? r : r.stdout;
}
const ok = (args) => git(args, { allowFail: true }).status === 0;
process.chdir(git(["rev-parse", "--show-toplevel"]).trim());
const GIT_DIR = resolve(git(["rev-parse", "--git-dir"]).trim());
const STATE_FILE = join(GIT_DIR, "lyceum-team.json");
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, "utf8")) : {};
const saveState = () => writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
const die = (msg) => { console.error(msg); process.exit(1); };

const remoteUrl = () => { const r = git(["remote", "get-url", REMOTE], { allowFail: true }); return r.status === 0 ? r.stdout.trim() : null; };
const requireRemote = () => remoteUrl() ?? die("No team remote yet. Run: node scripts/team.mjs init <team-repo-url>");
const fetchTeam = () => git(["fetch", REMOTE, "--prune", "--no-tags", "--quiet"]);
const teamMain = () => (ok(["rev-parse", "-q", "--verify", "refs/remotes/team/main"]) ? git(["rev-parse", "refs/remotes/team/main"]).trim() : null);
const slug = () => { const m = /github\.com[/:]([^/]+)\/([^/]+?)(\.git)?$/.exec(remoteUrl() ?? ""); return m ? m[1] + "/" + m[2] : null; };

// ---------- the snapshot ----------
function exportEntries() {
  const listed = git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).split("\0").filter(Boolean);
  const files = [...new Set(listed)].filter((p) => existsSync(p) && statSync(p).isFile());
  const entries = new Map(); // team path -> local path
  for (const p of files) if (!p.startsWith(OVERLAY) && !EXCLUDE.some((f) => f(p))) entries.set(p, p);
  for (const p of files) if (p.startsWith(OVERLAY)) { const rel = p.slice(OVERLAY.length); entries.set(rel === "gitignore" ? ".gitignore" : rel, p); }
  return entries;
}
const localPathFor = (teamPath) => (teamPath === ".gitignore" ? OVERLAY + "gitignore" : teamPath === "README.md" || teamPath === "FEEDBACK.md" || teamPath.startsWith(".github/") || existsSync(OVERLAY + teamPath) ? OVERLAY + teamPath : teamPath);

function buildTree(entries) {
  const pairs = [...entries].sort((a, b) => (a[0] < b[0] ? -1 : 1));
  // hash-object reads each file the way `git add` would, line-ending conversion included.
  const shas = git(["hash-object", "-w", "--stdin-paths"], { input: pairs.map(([, local]) => local).join("\n") + "\n" }).trim().split("\n");
  const index = join(tmpdir(), "lyceum-team-index-" + process.pid);
  rmSync(index, { force: true });
  try {
    const env = { GIT_INDEX_FILE: index };
    git(["update-index", "--index-info"], { env, input: pairs.map(([teamPath], i) => "100644 " + shas[i] + "\t" + teamPath).join("\n") + "\n" });
    return git(["write-tree"], { env }).trim();
  } finally { rmSync(index, { force: true }); }
}

function publish(args) {
  requireRemote();
  const dry = args.includes("--dry-run"), force = args.includes("--force");
  const noteAt = args.indexOf("-m"), note = noteAt >= 0 ? args[noteAt + 1] : "";
  fetchTeam();
  const entries = exportEntries();
  // Never publish a half-resolved merge.
  const unresolved = [...entries].filter(([, local]) => {
    if (statSync(local).size > 4 << 20) return false;
    const buf = readFileSync(local);
    if (isBinary(buf)) return false;
    const text = buf.toString("utf8");
    return /^<{7} /m.test(text) && /^>{7} /m.test(text);
  }).map(([teamPath]) => teamPath);
  if (unresolved.length && !force) die("These files still have conflict markers; resolve them first (or publish with --force):\n  " + unresolved.join("\n  "));
  const tree = buildTree(entries);
  const parent = teamMain();
  const bytes = [...entries.values()].reduce((n, p) => n + statSync(p).size, 0);
  console.log(entries.size + " files, " + (bytes / 1048576).toFixed(1) + " MB in the snapshot.");
  if (parent && git(["rev-parse", parent + "^{tree}"]).trim() === tree) { console.log("The team's main already matches this working tree. Nothing to publish."); return; }
  if (parent) console.log(git(["diff", "--stat", "--no-renames", parent, tree]).trimEnd());
  // Never overwrite work that reached the team's main without you seeing it.
  if (parent && parent !== state.lastPublished && parent !== state.acknowledged && !force) {
    const since = state.lastPublished && ok(["merge-base", "--is-ancestor", state.lastPublished, parent]) ? state.lastPublished + ".." + parent : parent;
    die("\nThe team's main has changes you have not taken yet:\n" + git(["log", "--format=  %h %an: %s", "-20", since]) +
      "\nReview them with `node scripts/team.mjs review main`, take what you want with `node scripts/team.mjs take main`, then publish again.\nOr publish with --force to replace them.");
  }
  if (dry) { console.log("\nDry run: nothing was committed or pushed. The snapshot is tree " + tree + "; `git archive " + tree + "` unpacks it."); return; }
  const when = new Date();
  const title = parent ? "Sync from Hafiz's main, " + when.toISOString().slice(0, 10) : "Lyceum team repo: first snapshot";
  const message = title + "\n\n" + (note ? note + "\n\n" : "") + "Lyceum-Sync: " + when.toISOString() + "\n";
  const commit = git(["commit-tree", tree, ...(parent ? ["-p", parent] : []), "-F", "-"], { input: message }).trim();
  git(["push", REMOTE, commit + ":refs/heads/main"]);
  state.lastPublished = commit; state.acknowledged = commit; saveState();
  fetchTeam();
  console.log("Published " + commit.slice(0, 7) + " to the team's main.");
}

// ---------- reading teammates' work ----------
function baseAndTip(branch) {
  fetchTeam();
  if (branch === "main") {
    const tip = teamMain() ?? die("The team repo has no main yet.");
    const base = state.acknowledged ?? state.lastPublished ?? die("Nothing published from here yet, so there is no base to compare main with.");
    return { base, tip, label: "team/main" };
  }
  const ref = "refs/remotes/team/" + branch;
  if (!ok(["rev-parse", "-q", "--verify", ref])) die("No branch called " + branch + " on the team repo. Run `node scripts/team.mjs status` to see them.");
  const tip = git(["rev-parse", ref]).trim();
  const base = git(["merge-base", "refs/remotes/team/main", tip]).trim();
  return { base, tip, label: "team/" + branch };
}

function status() {
  requireRemote(); fetchTeam();
  const main = teamMain();
  console.log("team/main " + (main ? main.slice(0, 7) + (main === state.lastPublished ? " (your last publish)" : main === state.acknowledged ? " (taken)" : " (has changes you have not taken)") : "does not exist yet"));
  const refs = git(["for-each-ref", "--sort=-committerdate", "--format=%(refname:short)\t%(committerdate:relative)\t%(authorname)\t%(subject)", "refs/remotes/team"]).trim().split("\n").filter(Boolean);
  for (const line of refs) {
    const [name, when, who, subject] = line.split("\t");
    if (name === "team/main" || name === "team/HEAD" || name === "team") continue;
    const ahead = main ? git(["rev-list", "--count", "refs/remotes/team/main.." + name]).trim() : "?";
    const behind = main ? git(["rev-list", "--count", name + "..refs/remotes/team/main"]).trim() : "?";
    console.log("  " + name.replace(/^team\//, "") + "  " + ahead + " new, " + behind + " behind main, " + when + " by " + who + ": " + subject);
  }
  const repo = slug();
  if (repo) {
    const pr = spawnSync("gh", ["pr", "list", "-R", repo, "--state", "open"], { encoding: "utf8" });
    if (pr.status === 0) console.log("\nOpen pull requests:\n" + (pr.stdout.trim() || "  none"));
  }
}

function review(branch) {
  requireRemote();
  const { base, tip, label } = baseAndTip(branch);
  if (base === tip) { console.log(label + " has nothing new."); return; }
  console.log(git(["log", "--format=%h %an, %ar: %s", base + ".." + tip]).trimEnd() + "\n");
  console.log(git(["diff", "--stat", "--no-renames", base, tip]).trimEnd());
  const file = join(tmpdir(), "lyceum-team-review-" + branch.replace(/[^\w.-]+/g, "_") + ".diff");
  writeFileSync(file, git(["diff", "--no-renames", base, tip]));
  console.log("\nFull diff: " + file);
  const repo = slug();
  if (repo && branch !== "main") console.log("On GitHub: https://github.com/" + repo + "/compare/main..." + encodeURIComponent(branch));
  console.log("Take all of it with `node scripts/team.mjs take " + branch + "`, or name the paths you want after the branch.");
}

// ---------- taking teammates' work ----------
const show = (rev, path) => git(["show", rev + ":" + path], { buffer: true });
const isBinary = (buf) => buf.subarray(0, 8000).includes(0);
const lf = (buf) => buf.toString("utf8").replace(/\r\n/g, "\n");

function take(branch, paths) {
  requireRemote();
  const { base, tip, label } = baseAndTip(branch);
  if (base === tip) { console.log(label + " has nothing new."); return; }
  const raw = git(["diff", "--name-status", "--no-renames", "-z", base, tip]).split("\0").filter(Boolean);
  let changes = [];
  for (let i = 0; i < raw.length; i += 2) changes.push({ status: raw[i][0], path: raw[i + 1] });
  if (paths.length) changes = changes.filter((c) => paths.some((p) => c.path === p || c.path.startsWith(p.replace(/\/?$/, "/"))));
  if (!changes.length) die("Nothing in " + label + " matches those paths.");
  const backup = join(GIT_DIR, "lyceum-team-backup", new Date().toISOString().replace(/[:.]/g, "-"));
  const report = { taken: [], merged: [], conflicts: [], kept: [], same: [] };
  const writeLocal = (local, content) => {
    if (existsSync(local)) { mkdirSync(dirname(join(backup, local)), { recursive: true }); copyFileSync(local, join(backup, local)); }
    mkdirSync(dirname(local) || ".", { recursive: true }); writeFileSync(local, content);
  };
  for (const { status: st, path } of changes) {
    const local = localPathFor(path);
    const ours = existsSync(local) ? readFileSync(local) : null;
    const baseBuf = st === "A" ? null : show(base, path), theirs = st === "D" ? null : show(tip, path);
    const binary = [ours, baseBuf, theirs].some((b) => b && isBinary(b));
    const same = (a, b) => a && b && (binary ? a.equals(b) : lf(a) === lf(b));
    if (st === "D") {
      if (!ours) report.same.push(path);
      else if (same(ours, baseBuf)) { mkdirSync(dirname(join(backup, local)), { recursive: true }); copyFileSync(local, join(backup, local)); unlinkSync(local); report.taken.push(path + " (deleted)"); }
      else report.kept.push(path + ": deleted on the branch but changed here, kept yours");
      continue;
    }
    if (ours && same(ours, theirs)) { report.same.push(path); continue; }
    if (st === "M" && !ours) { report.kept.push(path + ": changed on the branch but deleted here, left deleted"); continue; }
    const crlf = ours ? ours.includes("\r\n") : false;
    const asLocal = (text) => (crlf ? text.replace(/\r?\n/g, "\r\n") : text);
    if (!ours || same(ours, baseBuf)) { writeLocal(local, binary ? theirs : asLocal(lf(theirs))); report.taken.push(path); continue; }
    if (binary) { writeLocal(local + ".from-" + branch.replace(/[^\w.-]+/g, "_"), theirs); report.conflicts.push(path + ": binary file changed on both sides, theirs saved next to yours"); continue; }
    const dir = join(tmpdir(), "lyceum-team-merge-" + process.pid); mkdirSync(dir, { recursive: true });
    const [o, b, t] = ["ours", "base", "theirs"].map((n) => join(dir, n));
    writeFileSync(o, lf(ours)); writeFileSync(b, baseBuf ? lf(baseBuf) : ""); writeFileSync(t, lf(theirs));
    const r = spawnSync("git", ["merge-file", "-p", "-L", "yours", "-L", "base", "-L", label, o, b, t], { encoding: "utf8", maxBuffer: 1 << 28 });
    rmSync(dir, { recursive: true, force: true });
    if (r.status === null || r.status < 0 || r.status > 127) die("git merge-file failed on " + path + ": " + r.stderr);
    writeLocal(local, asLocal(r.stdout));
    (r.status === 0 ? report.merged : report.conflicts).push(path + (r.status ? ": " + r.status + " conflict(s), marked with <<<<<<< in the file" : ""));
  }
  if (branch === "main" && !paths.length) { state.acknowledged = tip; saveState(); }
  const section = (title, items) => items.length && console.log(title + ":\n" + items.map((i) => "  " + i).join("\n"));
  section("Taken", report.taken); section("Merged with your changes", report.merged); section("Needs your eye", report.conflicts);
  section("Kept as is", report.kept); section("Already the same", report.same);
  if (existsSync(backup)) console.log("\nFiles it changed were backed up first, in " + backup);
  if (branch === "main" && paths.length) console.log("\nYou took only some paths from main, so publish will still ask you to take or --force the rest.");
}

// ---------- setup ----------
function init(url) {
  if (!url) die("Usage: node scripts/team.mjs init <team-repo-url>");
  const current = remoteUrl();
  if (current && current !== url) die("A team remote already points at " + current + ".");
  if (!current) git(["remote", "add", REMOTE, url]);
  // A bare `git push team` fails instead of pushing your main; publish names its target explicitly.
  git(["config", "remote.team.push", "refs/heads/__use_scripts_team_mjs_publish__:refs/heads/__use_scripts_team_mjs_publish__"]);
  git(["config", "remote.team.tagOpt", "--no-tags"]);
  const hookPath = join(GIT_DIR, "hooks", "pre-push");
  if (existsSync(hookPath) && !readFileSync(hookPath, "utf8").includes(HOOK_MARK)) die("A pre-push hook already exists at " + hookPath + "; merge the guard in by hand.");
  mkdirSync(dirname(hookPath), { recursive: true });
  writeFileSync(hookPath, `#!/bin/sh
# ${HOOK_MARK}: written by scripts/team.mjs. Keeps this repo's history and the team repo's history apart.
url="$2"
team_url=$(git config --get remote.team.url)
z=0000000000000000000000000000000000000000
while read local_ref local_sha remote_ref remote_sha; do
  [ "$local_sha" = "$z" ] && continue
  if [ -n "$team_url" ] && [ "$url" = "$team_url" ]; then
    for own in refs/heads/main refs/remotes/origin/main; do
      if git rev-parse -q --verify "$own" >/dev/null && git merge-base "$local_sha" "$own" >/dev/null 2>&1; then
        echo "Blocked: this push would put your own history on the team repo. Use: node scripts/team.mjs publish" >&2
        exit 1
      fi
    done
  else
    if git rev-parse -q --verify refs/remotes/team/main >/dev/null && git merge-base "$local_sha" refs/remotes/team/main >/dev/null 2>&1; then
      echo "Blocked: this push would put team-repo history on $url. Take team work with: node scripts/team.mjs take <branch>" >&2
      exit 1
    fi
  fi
done
exit 0
`);
  console.log("Team remote: " + url + "\nPush guard and pre-push hook installed. Next: node scripts/team.mjs publish");
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "init") init(rest[0]);
else if (cmd === "publish") publish(rest);
else if (cmd === "status") status();
else if (cmd === "review" && rest[0]) review(rest[0]);
else if (cmd === "take" && rest[0]) take(rest[0], rest.slice(1));
else die("Usage: node scripts/team.mjs init <url> | publish [--dry-run] [--force] [-m note] | status | review <branch> | take <branch> [path...]");
