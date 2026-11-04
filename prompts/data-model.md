# Prompt log: Feature 2, data model

Issue: #7

## Prompt 1: starting the feature

> Live test passed

Context: this closed out feature 1. Supabase's logs showed the live sequence: login, logout, login, logout, and a refused wrong password. That proved logging in straight after logging out, the gap left open in PR #6.

Response summary: opened the Issue and branch, explained the four new tables and their safety rules, and waited for the student's go-ahead before writing the SQL.

## Prompt 2: speeding up

> We're going to need to move a lot faster because we're only on feature 2, and there's a bunch of features and a ton of other stuff we're going to need to do.

Response summary: the student set a faster pace, so the agent shortened its explanations and built the data model. It applied the SQL with the Supabase connector and ran 13 privacy and safety checks in a rolled-back test using two real accounts. All 13 passed. Agent additions to the plan: two-column foreign keys so a row can only point to the same user's rows, a rule that a task's conversation must be with the same contact, one star per user per contact, and clearing a task's link when its conversation is deleted.
