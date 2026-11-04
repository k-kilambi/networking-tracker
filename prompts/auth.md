# Prompt log: Feature 1, sign up and login

Issue: #5

## Prompt 1: starting the feature

> I merged it

Context: the student merged the tooling PR, which started this feature as discussed.

Response summary: opened the Issue and branch, explained how sign-up and login will work, and waited for the student's go-ahead and a new Supabase project before writing code.

## Prompt 2: go-ahead to build

> Ready, go ahead

Response summary: scaffolded Next.js 16, added Supabase's libraries, and built sign up, log in, log out, a protected home page, and SQL for the users table and trigger. The first version of the agent's setup script failed on a shell quoting error before it wrote anything, so the files were written again with the file tool. Agent decisions to review: `cacheComponents` is turned off because every page depends on who's logged in, `users.id` uses Postgres's `uuid` type where the plan says text, and shadcn/ui waits until feature 3 because this feature has only simple forms.

## Prompt 3: using the Supabase connector

> Are you able to do the Supabase stuff? I just connected it as a connector.

Response summary: used the connector to find the new networking-tracker project by name, confirmed it was empty, ran the users table SQL, saved the project URL and publishable key to the ignored .env.local file, and checked the result. The recruiting-crm project was left untouched.

## Prompt 4: testing

> All worked

Context: the student tested sign up, log out, the logged-out redirect, a wrong password, and log in on the local app. The agent then confirmed one matching row in auth.users and users, which shows the trigger works.

Response summary: committed feature 1, pushed the branch, and drafted the PR description for review.
