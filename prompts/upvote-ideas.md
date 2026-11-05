# Prompt log: Upvote future ideas

Issue: #45

## Prompt 1: the idea

> let's make that button more interesting looking, and add an "Upvote this" for each listed new feature that logs that user showed interest in that feature (and then they don't have that option after that, so we will need to track in the db

Context: added after the class submission. It isn't in the original plan.

Response summary: added an `idea_upvotes` table with one row per user per idea and no way to change or remove a row, so an upvote is permanent. Each idea in the popup now has an "Upvote this" button, which becomes "Upvoted" once clicked. The Automate Everything button now has a sparkle icon and an indigo-to-pink gradient. Agent's choices: the button's look, the table's design, keeping the ideas in code instead of a table, and not showing upvote counts in the app.
