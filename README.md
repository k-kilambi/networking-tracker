# Networking Tracker

A personal CRM and task tracker for job-search networking. It starts with who you're talking to and what you need to do for them: keep a rolodex of people, log your conversations, and track follow-ups so nothing slips.

**Live app:** https://networking-tracker-navy-eight.vercel.app

## What it does

- **Accounts:** sign up and log in. Each user sees only their own data.
- **Contacts:** add, view, edit, and delete people, with search, a company filter, and sorting.
- **Stars:** mark priority people and see them in one place.
- **Conversations:** log the date, type, and notes on a contact's page.
- **Tasks:** add follow-ups with a due date, priority, status, and notes. Links in notes are clickable.
- **Home:** see what needs attention and what's coming up in the next 7 days, grouped by person and company.
- **Dashboard:** see open tasks, overdue tasks, conversations this month, and a chart of conversations per week.

## Tools

- **Coding agent:** Claude Code
- **App framework:** Next.js with TypeScript
- **Database and login:** Supabase (Postgres and Supabase Auth)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS and shadcn/ui
- **Chart:** Recharts
- **Tests:** Vitest

## How to run it

You'll need Node.js and a free Supabase project.

1. Clone the repo and install the libraries:

   ```bash
   git clone https://github.com/k-kilambi/networking-tracker.git
   cd networking-tracker
   npm install
   ```

2. In your Supabase project, run the files in `supabase/migrations/` in order, using the SQL Editor.
3. In Supabase's Authentication settings, turn off **Confirm email**.
4. Copy `.env.example` to `.env.local`, then fill in your project URL and publishable key.
5. Start the app, then open http://localhost:3000:

   ```bash
   npm run dev
   ```

## Tests

```bash
npm test
```

There are two tests: one checks that a user can't see another user's data, and one checks the dashboard's overdue count. They run against the Supabase project in `.env.local` using made-up accounts, and each run leaves those empty accounts behind.

## More about the project

- [PLAN.md](PLAN.md): the original plan
- [schema.md](schema.md): the database tables and how they connect
- [prompts/](prompts/): the key prompts behind each pull request

## Notes on the history

Everything reached `main` through a pull request. The one exception is the empty first commit, which contains no files and gives pull requests a branch to target.

## Known limits

- "Today" uses California time, so people in other time zones would see the wrong day.
- Company is plain text, so "Google" and "google" count as different companies.
- There's no password reset yet, and reminders only appear inside the app.
