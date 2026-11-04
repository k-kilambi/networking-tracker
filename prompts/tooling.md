# Prompt log: project tooling

Issue: #3

## Prompt 1: the idea

> Do you think it makes sense to also have a Claude.md so that you can keep all of these instructions top of mind?
>
> Also, I think I might want to build some skills. Maybe we can figure that out and what skills make sense that could be helpful for this process. One example is a /status skill, where I can type that in and understand where we're at, what we've done, and maybe what needs to happen next, or something like that. Maybe there are other skills that you think make sense to build for how we're going to work together.

Response summary: recommended a short CLAUDE.md that points to a saved copy of the brief, plus four skills. Renamed /status to /progress because /status is already a built-in command. Advised holding these files out of git until the plan PR merged.

## Prompt 2: approving the setup

> Okay, that all sounds great. Let's do the next steps.

Response summary: wrote CLAUDE.md, a local copy of the brief, and the four skills, without committing them.

## Prompt 3: opening this PR

> Yes, start it

Response summary: opened the Issue and branch, started this log, and committed the tooling files. /feature and /ship were both used on the real plan PR before this PR. /progress and /quiz haven't been run yet.

## Prompt 4: keeping the brief private

> Keep brief private

What went sideways: the agent pushed the tooling branch, including the course brief, to the public repo before asking whether the brief should be public. It never reached main.

Response summary: removed the brief from the files to be committed, added it to .gitignore, and updated the rules that mention it.

## Prompt 5: choosing the fix

> New clean branch

Context: the agent's attempt to force-push over the old branch was blocked by a Claude Code safety check. The student chose a new branch with a single clean commit, and to delete the old `feature/tooling` branch on GitHub personally.

Response summary: created `feature/project-tooling` without the brief and pushed it.
