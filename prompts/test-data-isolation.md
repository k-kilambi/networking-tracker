# Prompt log: Test 1, data isolation

Issue: #11

## Prompt 1: fast mode

> Yes, you merge

Context: this test comes from section 4 of the plan, and the student approved fast mode.

Response summary: wrote a Vitest test that signs up two made-up accounts on each run, adds a contact for User A, and checks User B's list and a direct lookup. Plan change, made by the agent: section 5 says tests use a separate database, but the free plan's project limit makes that hard, so tests run on the real project with made-up accounts. Each run leaves two empty test accounts behind, because removing an account needs the service role key and the app never uses that key.

## Prompt 2: running it

> ready

Context: the agent confirmed the student's accounts had no contacts, then turned off Row Level Security on `contacts`. The student ran `npm test` and got the red result. All 3 checks failed, including User A's, because with the rule off User A's list also included other accounts' contacts. The agent turned the rule back on and confirmed it, and the student ran the test again and got the green result.

Note: the test checks the database directly and doesn't load the web page. The student asked exactly what the test covers, and this limit is stated in the PR.
