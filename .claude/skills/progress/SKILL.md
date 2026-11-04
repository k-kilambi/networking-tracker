---
name: progress
description: Show where the class project stands, what's done, what's next, and any broken rules, based on real GitHub and Git state. Use when the student asks for status or what to do next.
---

Report where the project stands. Get facts from the real state, not from memory. Change nothing.

1. Gather the state:
   - `git status --short --branch` and `git log --oneline -15 main`
   - `gh issue list --state all --limit 50`
   - `gh pr list --state all --limit 50 --json number,title,state,mergedAt,body,headRefName`
   - Read `PLAN.md` if it exists, and `docs/assignment-brief.md` for requirements.

2. Check the rules, and list every problem found:
   - The PLAN.md PR merged before any feature PR.
   - No commits on main that didn't come through a PR, apart from the empty root commit.
   - Each merged PR has a linked Issue (`closes #N`), a feature branch, and a `prompts/` file.
   - Each test PR has an explanation, red and green screenshots, and "what would break it".

3. Report briefly, in this order:
   - **Right now:** current branch, any feature in progress, uncommitted work.
   - **Done:** planned features, marked merged or not. Show the count of merged PRs.
   - **Problems:** anything from step 2, or "None found". Include how to fix each.
   - **Still needed:** anything outstanding from the brief, including tests, docs, 5+ real entries, stranger test, reflection, and submission. Say which items you can't verify from here, such as real data on the live site.
   - **Next step:** the single next action, and why it comes next.

If the repo isn't on GitHub yet, say so and make that the next step.
