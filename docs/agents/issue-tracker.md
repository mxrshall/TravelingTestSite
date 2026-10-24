# Issue tracker: GitHub

Issues for this repo live in GitHub Issues at `mxrshall/TravelingTestSite`.

**Use the REST API through `gh api`.** In Claude cloud sessions GitHub's GraphQL API is blocked, so
`gh issue list`, `gh issue view`, `gh pr create` and similar commands fail with HTTP 403.
The REST endpoints below always work.

## Conventions

- **List open issues with a label**:
  `gh api 'repos/mxrshall/TravelingTestSite/issues?state=open&labels=agent&sort=created&direction=asc' --jq '[.[] | select(.pull_request == null) | {number, title, labels: [.labels[].name], assignees: [.assignees[].login]}]'`
- **Read an issue**: `gh api repos/mxrshall/TravelingTestSite/issues/<n> --jq '{number, title, body, labels: [.labels[].name]}'`
- **Read its comments**: `gh api repos/mxrshall/TravelingTestSite/issues/<n>/comments --jq '.[] | {user: .user.login, body}'`
- **Comment**: `gh api --method POST repos/mxrshall/TravelingTestSite/issues/<n>/comments -f body="..."`
- **Add a label**: `gh api --method POST repos/mxrshall/TravelingTestSite/issues/<n>/labels -f 'labels[]=<label>'`
- **Remove a label**: `gh api --method DELETE repos/mxrshall/TravelingTestSite/issues/<n>/labels/<label>`
- **Create an issue**: `gh api --method POST repos/mxrshall/TravelingTestSite/issues -f title="..." -f body="..."`
- **Open a pull request**: `gh api --method POST repos/mxrshall/TravelingTestSite/pulls -f title="..." -f head="<branch>" -f base=main -f body="..."`
  Put `Closes #<n>` in the body so merging the PR closes the issue.

Never close an issue directly; it closes when the human merges the PR.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue as above.

## When a skill says "fetch the relevant ticket"

Read the issue and its comments as above.
