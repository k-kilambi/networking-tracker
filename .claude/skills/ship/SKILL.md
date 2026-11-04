---
name: ship
description: Finish the feature loop by checking the work, opening the PR, and walking through merge, deploy, and checking the live app. Use when a feature is built and the student wants to wrap it up.
---

Finish the loop for the current branch. Stop and explain if any check fails.

1. **Check before opening a PR.**
   - The branch isn't main.
   - `prompts/<feature>.md` exists on this branch and has real entries.
   - The Issue number is known.
   - The diff (`git diff main...HEAD` plus uncommitted changes) covers this one feature, with no secrets or stray files. `CLAUDE.md` and `.claude/` only belong in tooling PRs, and `docs/assignment-brief.md` is never committed.
   - Tests pass, if any exist.
   - The student has tried the feature in the running app. Ask if unsure.

2. **Commit and push.** Add files by name, show the student what's going in, commit, and `git push -u origin <branch>`.

3. **Open the PR into main.** Draft the description and show it to the student before running `gh pr create`. Include:
   - What changed, in plain English.
   - `closes #N`.
   - Bugs caught, if any: what happened, how they noticed, how it was fixed.
   - Any departure from the plan: what changed, why, and who decided.
   - For a test PR: the plain-English explanation, red and green screenshots, and "what would break it". Ask the student to supply the screenshots.

4. **Merge.** Merging is the student's action. Explain what it does and confirm before running `gh pr merge --merge --delete-branch`, or let them click Merge on GitHub. Check that the Issue closed.

5. **Deploy and check.** Make sure the live URL has updated. Ask the student to try the feature on the live site, and fix anything that differs from local through a new loop.

6. **Wrap up.** Run `git switch main` and `git pull`. Suggest `/quiz` if the feature introduced something new, then name the next feature in the plan.
