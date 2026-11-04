---
name: feature
description: Start the feature loop for one feature, including the Issue, the branch, the prompt log, and a plain-English explanation before any code is written. Use when the student starts a new feature or other PR-sized piece of work.
argument-hint: <feature-name>
---

Start the loop for: $ARGUMENTS

If no name was given, ask which feature from the plan to start.

1. **Check it's allowed.**
   - Stop if the PLAN.md PR isn't merged, unless this work is the plan itself.
   - Stop if there are uncommitted changes to tracked files, or another feature is unfinished. Explain and let the student choose.
   - Warn if this isn't the next feature in the plan's order.
   - Update main: `git switch main`, then `git pull`.

2. **Explain the feature before building it.** In plain English, cover what it does for the user, what changes in the app and database, any new terms, and how we'll know it works. Quote its user story from `PLAN.md`. Flag any decision the plan leaves open and ask the student to make it.

3. **Create the Issue.** Use `gh issue create`, with the user story copied exactly from the plan. Note the Issue number.

4. **Create the branch.** `git switch -c feature/<name>` from the updated main.

5. **Start the prompt log.** Create `prompts/<name>.md` with the feature name and Issue number. Log the student's prompts from here on, as `CLAUDE.md` describes.

6. **Wait.** Confirm the Issue, branch, and log are ready, then ask the student to go ahead before writing code.

While building, keep to this one feature. If you notice something unrelated, note it instead of fixing it. When it's built, ask the student to try it in the running app, then suggest `/ship`.
