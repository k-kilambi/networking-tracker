# Prompt log: Feature 5, stars

Issue: #14

## Prompt 1: fast mode

> Yes, you merge

Response summary: added a star button to the contact list and contact page, a Starred page, and a shared contact table.

What went sideways: the agent's first version crashed the contact list with "Cannot read properties of null (reading 'length')". It assumed Supabase would return a list of stars for each contact. The one-star-per-user rule from feature 2 makes Supabase return one star or nothing instead, and the type check couldn't catch it because the app has no generated database types. The agent caught this while testing in the browser and fixed it before the PR.
