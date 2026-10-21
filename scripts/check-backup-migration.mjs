// A0: prove the backup migration through the real store.
// Usage: node scripts/check-backup-migration.mjs   (from the repo root)
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.argv[2] ?? process.cwd();
const mod = (p) => import(pathToFileURL(join(root, p)).href);
const store = await mod("src/app/store.ts");
const { PEOPLE_IDS } = await mod("src/data/seed.ts");
const sample = JSON.parse(readFileSync(join(root, "public/demo/collected-sample.json"), "utf8"));

let failed = 0;
const check = (name, ok, detail = "") => { console.log((ok ? "PASS  " : "FAIL  ") + name + (detail ? "  (" + detail + ")" : "")); if (!ok) failed++; };
const S = () => store.getState();

// Build real evidence from the saved sample and freeze one snapshot.
store.resetDemoState(); store.login(PEOPLE_IDS.sobri);
store.setSkillLexicon("CS310", ["SQL", "Python", "Tableau"]);
const loader = async () => ({ ok: true, postings: sample.postings, retrievedAt: sample.retrievedAt, cached: false, total: sample.postings.length, label: sample.label });
check("collection from the saved sample", (await store.runCollection("CS310", { provider: "sample", board: "", query: "", inText: false }, loader)).ok);
check("postings imported", store.importCollectedPostings("CS310", sample.postings.map((p) => p.id)).ok);
store.scanForRequirements("CS310"); store.confirmProposals("CS310", S().scanProposals);
const unreviewed = S().evidenceSources.filter((s) => s.subjectId === "CS310" && !s.reviewed).map((s) => s.id);
check("postings marked reviewed", store.setSourcesReviewed("CS310", unreviewed, true).ok);
const snap = store.takeEvidenceSnapshot("CS310", "A0 migration check");
check("snapshot frozen", snap.ok, snap.error ?? "");
const counts = () => ({ sources: S().evidenceSources.length, mentions: S().skillMentions.length, snapshots: S().evidenceSnapshots.length });
const before = counts();
console.log("Workspace before export:", JSON.stringify(before));

// Schema 4: export, then restore into a fresh workspace.
const raw4 = store.exportWorkspaceBackup();
const parsed4 = JSON.parse(raw4);
check("export reports schemaVersion 4", parsed4.schemaVersion === 4, String(parsed4.schemaVersion));
check("export carries the snapshot", parsed4.data.evidenceSnapshots?.length === 1);
store.resetDemoState(); store.login(PEOPLE_IDS.sobri);
const preview4 = store.previewWorkspaceBackup(raw4);
check("schema 4 preview", preview4.ok, preview4.error ?? "");
const restored4 = store.restoreWorkspaceBackup(raw4, preview4.fingerprint, true);
check("schema 4 restore", restored4.ok, restored4.error ?? "");
check("schema 4 restore keeps sources, quotations and the snapshot", JSON.stringify(counts()) === JSON.stringify(before), JSON.stringify(counts()));
const eligible = S().evidenceSnapshots[0].eligible;
check("the restored snapshot still compares with the current evidence (every reviewed posting carried)", store.changesSinceLastSnapshot("CS310")?.carried === eligible, store.changesSinceLastSnapshot("CS310")?.carried + " of " + eligible);

// Schema 3: strip evidenceSnapshots and set schemaVersion 3, then restore.
const older = JSON.parse(raw4); older.schemaVersion = 3; delete older.data.evidenceSnapshots;
const raw3 = JSON.stringify(older);
store.resetDemoState(); store.login(PEOPLE_IDS.sobri);
const preview3 = store.previewWorkspaceBackup(raw3);
check("schema 3 preview", preview3.ok, preview3.error ?? "");
const restored3 = store.restoreWorkspaceBackup(raw3, preview3.fingerprint, true);
check("schema 3 restore", restored3.ok, restored3.error ?? "");
check("schema 3 restore has empty snapshots", Array.isArray(S().evidenceSnapshots) && S().evidenceSnapshots.length === 0, String(S().evidenceSnapshots?.length));
check("schema 3 restore keeps sources and quotations", S().evidenceSources.length === before.sources && S().skillMentions.length === before.mentions);
check("schema 3 workspace re-exports at schema 4", JSON.parse(store.exportWorkspaceBackup()).schemaVersion === 4);

console.log(failed ? failed + " checks failed" : "BACKUP MIGRATION OK");
process.exit(failed ? 1 : 0);
