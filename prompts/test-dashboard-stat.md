# Prompt log: Test 2, dashboard stat

Issue: #27

## Prompt 1: fast mode

> Yes, you merge

Context: this test comes from section 4 of the plan.

Response summary: wrote a Vitest test that signs up a made-up user, adds the three tasks from the plan, and checks that the dashboard's overdue count is 1. For the red result, the agent temporarily changed the code on the student's computer to count finished tasks too, without committing it. The student ran the test and got `expected 2 to be 1`. The agent reverted the change and confirmed the file matched the merged code, and the student ran the test again and got the green result.

Note: the test checks the code that calculates the number and doesn't load the dashboard page.
