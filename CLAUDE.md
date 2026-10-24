# TravelingTestSite

Test repository for an automated "morning agent": every morning Claude picks up GitHub issues
labelled `agent`, implements them, and opens a pull request for a human to review.

## Morning agent workflow

Follow these steps exactly when you are running as the scheduled morning agent.

1. **Find work.** List open issues labelled `agent` (see `docs/agents/issue-tracker.md`), oldest first.
   Skip any issue that also has `agent-in-progress`, `needs-info`, or `ready-for-human`,
   and skip any issue that already has an open PR whose body says `Closes #<n>`.
   If nothing is left, stop and report "No agent issues today."
2. **Pick at most ONE issue** per run. Add the `agent-in-progress` label to it.
3. **Check it is clear enough.** Read the issue and its comments. If the expected behaviour is
   ambiguous, do not guess: comment with your specific questions, remove `agent`, add `needs-info`, and stop.
4. **Branch.** `git checkout -b claude/issue-<n>-<short-slug>` from an up-to-date `main`.
5. **Implement test-first** with the `tdd` skill. Use the `diagnosing-bugs` skill when the issue is a bug.
   Keep the change as small as the issue needs; don't refactor unrelated code.
6. **Verify.** Run the full test suite and any lint/build commands that exist. Everything must pass.
   If you can't make it pass, push what you have, open the PR as a draft and explain what is failing.
7. **Open a pull request** against `main`. Write the body with the `pr` skill and include `Closes #<n>`.
8. **Comment on the issue** with a link to the PR and a two-line summary.

### Hard rules

- Never push to `main`, never merge a PR, never force-push, never close issues directly.
- Never delete files or folders unrelated to the issue.
- Never add secrets, tokens or credentials to the repo.
- Never add new dependencies unless the issue asks for it; if needed, say why in the PR.
- If anything unexpected happens (failing setup, missing permissions), stop and report it in the issue.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues; use `gh api` (REST), not `gh issue`/`gh pr`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default triage roles, except "ready for agent" is the existing `agent` label. See `docs/agents/triage-labels.md`.

### Interactive skills (only when a human is chatting)

- `/grill-me` (uses `grilling`): Claude interviews you question by question to sharpen a plan, an issue or a bug diagnosis before any code is written.
  It waits for your answers, so never use it in the unattended morning run.
  Typical use: `/grill-me` on an issue, then turn the agreed result into a clear issue labelled `agent`.

### Domain docs

Single-context. See `docs/agents/domain.md`.

Skills in `.claude/skills/` are copied from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT, see `.claude/skills/LICENSE-mattpocock-skills`).
