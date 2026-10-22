// The automated suites and their check counts, shown on Evaluation. The counts come from running each suite
// (`npm run prove:all`); the landing page states their total, and prove-journey checks the two agree.

export const SUITES: Array<[string, number, string]> = [
  ["Acceptance scenario (illustrative spine)", 12, "canonical numbers of the synthetic scenario"],
  ["Backtest (synthetic)", 4, "closed-loop arithmetic on synthetic data"],
  ["Flow and roles", 28, "store, permissions, state machine"],
  ["Signal reveal (fixture)", 12, "the staged fixture reveal"],
  ["Intake parsing", 18, "xlsx, csv, pdf, pptx parse and interpret"],
  ["Integrity", 13, "evidence edge cases, approval guards"],
  ["Teaching plans", 10, "scope, validation, export"],
  ["Curriculum", 28, "revisions, constraints, adoption, recovery"],
  ["Evidence", 13, "citations, duplicates, Wilson intervals, mappings, backups"],
  ["Collector", 6, "text extraction, cache, rate limits, timeouts"],
  ["Research run", 5, "import on request, exact proposals, briefs, decisions and events in backups"],
  ["Slides", 3, "decks unzipped and read back, chart part included"],
  ["Benchmark and self-checks", 5, "labelled scan set, metric arithmetic, live quotation re-verification, denominator rules"],
  ["The loop and the record", 9, "done rules per term, the decision record, a new term, the event log first in the timeline, Learn matched to the version taught, the term set inside the ring, the routes, every landing figure in the claims register and every quoted clause in its note"],
  ["Evidence snapshots", 6, "frozen windows, change called only when intervals separate, identity matching, backups"],
  ["Moods", 8, "each mood a pure function of the records, the requests in flight and the clock"],
  ["The local door", 5, "every MCP tool through the protocol against the sample workspace: receipts, the export time, read-only annotations, the pack never overwriting, nothing written to the workspace, refusals and the call log"],
  ["The course record", 12, "the sample course in both states, its learning time, the assessment plan and its table of specifications, the matrix levels, the references gap, the rubrics, the tour's revision through the store, and the course file with its manifest"],
  ["Teaching material", 8, "the fourteen sample sessions and their packs read back slide by slide, 18 pt body text, the mark and the demo line in every master, the repair of the parts pptxgenjs declares but does not write, the preview against the file, and samples kept out of the term's teaching"],
  ["Before and after", 8, "the word diff and both texts back from it, topic hours before and after, the week 6 pack under each version changing only where the outcome did, a region for every changed part, renamed and added slides, results marked not comparable when an outcome is reworded, the summary in words, and the decision behind each version read from the event log"],
  ["The judge's way through", 5, "every walk stop rendered by its screen with a route that opens it, captions within twenty words with their labels, the host at the two ends only, the not-built list word for word, the sample workspace restored with the current one kept, and the recap's numbers against their records"],
  ["The two student surveys", 8, "the instruments from the record and the profile, the link under 2,000 characters with no secret in it, the collector's token against its own hash, the floor and the release showing nothing early, one response per device and booth responses never as evidence, the Microsoft Forms importer on its fixture, backups, and the sample's counts"],
];

export const SUITE_TOTAL = SUITES.reduce((n, s) => n + s[1], 0);
