---
name: dev-loop
description: "Implement → test → review loop with subagents (implementer, tester, code-review), at most 3 rounds. Use from step 6 of the morning agent workflow, or when a human types /dev-loop with an issue number or task."
---

You are the orchestrator. You do not write production code or tests yourself: you plan, delegate to
subagents, judge their reports and decide whether to loop back. Run subagents in the foreground.

## 0. Input

- `$ARGUMENTS` is an issue number (`#12` / `12`) or a free-text task.
- Issue number → fetch the issue and its comments (see `docs/agents/issue-tracker.md`). That text is the **spec**.
- Free text → the text itself is the spec.
- Make sure you are on a feature branch, not `main`. In the morning run the workflow has already created
  `claude/issue-<n>-<slug>`. When a human runs this and you are on `main`, create
  `claude/<short-slug>` from an up-to-date `main`.

Keep a round counter, starting at 1. Maximum is 3.

## Stage 1 – Implement (`implementer` subagent)

Prompt it with: the full spec text, the issue number, the branch name, and, in fix rounds, the exact
blocking findings from Stage 2 or Stage 3 (copied verbatim, with file:line).

- `STATUS: BLOCKED` → stop the loop and return `UNRESOLVED` with its NOTES.

## Stage 2 – Test (`tester` subagent)

Prompt it with: the full spec text and the branch name. Do not pass it the implementer's report: the
tester should judge the code, not the implementer's description of it.

- `STATUS: FAIL` → round + 1, go back to Stage 1 with FAILURES and MISSING/FAILING criteria.
- `STATUS: PASS` → Stage 3.

## Stage 3 – Review (`code-review` skill)

Call the Skill tool with `code-review`, fixed point `main`. It runs its Standards and Spec sub-agents in parallel.
Give it the spec directly (the issue number, or the free-text task) so it does not need to ask anyone.

Classify its findings:

- **Blocking:** Spec (a) missing/partial requirements, Spec (c) implemented wrongly, and Standards
  violations of a *documented* rule (CLAUDE.md or other repo docs).
- **Non-blocking:** baseline code smells (always judgement calls) and Spec (b) scope creep that is
  harmless. Collect them as "Review notes".

Any blocking finding → round + 1, go back to Stage 1 with the blocking findings, then run Stage 2 and 3 again.

## Limit

If a round would exceed 3, stop. Do not start another round.

## Result

Finish with this block (the morning workflow uses it for the PR body and the issue comment):

```
DEV-LOOP: DONE | UNRESOLVED
ROUNDS: <n>
TESTS: <passed>/<total>   BUILD: OK | FAILED
CHANGED FILES: <list>
SEAMS TESTED: <list>
REVIEW NOTES (non-blocking): <list or "none">
UNRESOLVED: <what is still failing and why, or "none">
```

`DONE` means: tester PASS and no blocking review findings in the last round.
Never push, open PRs or touch labels here; the caller (the morning workflow or the human) does that.
