# Prompt log: PLAN.md

Issue: #1

## Prompt 1: the app idea

> The app is a way to project plan for networking-related outreach and tracking. At a high level, I want to be able to have a rolodex of people that I can log. If I have a conversation with them, I can log that outreach.
>
> Specifically, I want to be able to track a task if it's associated with that outreach or person. For example:
>
> * If I had a conversation with a friend and I want to send a follow-up, that would be something.
> * If I had a conversation with somebody and they mentioned a resource, I would want to have an action to check out that resource and then maybe send another message to them about it
>
> generally, it's a way to track coffee chats and actions. There's probably going to need to be some way to have a dashboard showing the status of things, whether people responded to me or I need to follow up with somebody. Maybe that's going to be a time-based kind of reminder. I don't know. Let's maybe plan this out together a little bit.

Response summary: set up the local project folder, then asked product questions to turn the idea into specific plan decisions.

## Prompt 2: first plan decisions

> Yeah, I think it makes sense to star the people. Whether they responded in the app is probably just something that would be manually set. There's probably a future state where some of this is more automated. Maybe there is a browser extension and maybe access to things like Gmail that could then automate some of the polling of the Rolodex, the logging of conversations, and the task creations and marking off. We consider that part of the future, potentially. There'll also be some AI element where you can add things to the databases in natural language, and then it converts it into basically the JSON input, but that's down the line. For the reminders, I also think in-app only for now. Also, for the tasks, I want to be able to set a priority, and we'll be able to use that to filter later in the dashboard, potentially. For the pitch, I'm building a personal CRM and project management tool for job-seeking efforts because I want to stay organized in a way that my brain actually thinks about doing this work. I would use it a few times a week.

Response summary: recorded these decisions, proposed the fields for each table, and asked the student to confirm them and to make the pitch more specific.

## Prompt 3: pitch and database decisions

> On your pushback to the pitch, I think what it actually looks like is that my mind thinks of this in kind of a bottoms-up way. To me, that means starting with who I'm talking to and what I need to do for them to then ultimately get that rapport built or insight into something.
>
> I do think, in regards to the pitch being about job seeking and we've been talking about networking, it's the networking that is related and specific to the job seeking. I think for each person contact card, we are going to potentially want a section for what their company is, which I see we already have, and maybe what job it's for as well (because sometimes we get a contact kind of through a job).
>
> This is also maybe what we'll think about later: having this be a relational database where there's another table for company, another table for applications as well, so we can start to track applications that we have applied to as well. For now, we can keep that manual and say that that's a future iteration.
>
> I think these tables make sense. I think for the tasks, the person would be the contact, which would be the foreign key for the tasks. I think that should be good for the plan. What do you think? I think also, for the task, we should have another field where we can put other notes. If there's a call that sent a link, we can put that link in there to remind ourselves: this is the thing to do. Yeah, I think a due date should be required.

Response summary: confirmed the foreign key choice, wrote out the full table design with types, and raised what should happen to a person's records when they are deleted.

## Prompt 4: deleting a person

> When we delete a person, the entire conversation, tasks, and star are deleted too.

Response summary: recorded this as a cascading delete, which completes the section 3 decisions, then drafted the section 2 user stories in build order for review.

## Prompt 5: approving the features

> Yes, use these

Context: the student approved the agent's draft of 10 user stories and build order without changes. That includes the agent's suggestions: the priority filter sits on Needs attention rather than the dashboard, "Waiting on them" tasks count as needing attention, contacts can be filtered by company, and the dashboard shows open tasks, overdue tasks, conversations this month, and a chart of conversations per week.

Response summary: moved on to section 4 and drafted the two required tests in Given, When, Then form.

## Prompt 6: approving the tests

> Yes, use these

Context: the student approved the agent's draft of both tests without changes. Test 1 checks both the contact list and a direct link to another user's contact. Test 2 checks the "Overdue tasks" stat.

Response summary: moved on to section 5, recommended a technology stack, and corrected the section 3 draft, because the recommended login library stores passwords and sessions in their own tables.

## Prompt 7: choosing Supabase

> Let's use Supabase because I've already used it before, so it might be slightly less of a learning curve.

Decision: the student overrode the agent's recommendation of Neon and Better Auth.

Response summary: replaced Neon, Better Auth, and Drizzle with Supabase, revised the section 3 design to match, then started section 6.

## Prompt 8: design direction

> Yeah, I like the idea of modeling it off of Attio, combined with Asana maybe. It should feel calm, but not so minimal. Maybe calm and medium, not quite calm and maximum, with maybe one or two accent colors. I'm thinking of how Asana kind of has a good amount of colors but still looks a little bit minimal.
>
> When you log in, you should see what tasks you need to do coming up, kind of like what you suggested with the "needs attention" grouped by person. I'm looking at what I need to do, and I'm like, "Okay, who do I need to follow up with? What are my action items that I need to do? What do I need to read because someone told me to?"
>
> Basically, I want to see what I need to do and kind of who it is that I need to do it for. That's the person and the company

Response summary: drafted section 6, flagged that "coming up" goes beyond the approved Needs attention definition of due today or earlier, and started section 7.

## Prompt 9: final plan decisions

> Yeah, I like that fix for the "needs attention first" and the "coming up for the next 7 days." I think the feature I'm least sure I can build is an intuitive dashboard of what we have going on that is user-friendly and just gives a good UX. I also think some of the AI and browser extension stuff that I want to do later on, I'm very unsure if I can build. The order you suggested makes sense for what we would cut first.

Response summary: recorded the final decisions for sections 2, 6, and 7, opened the plan Issue and branch, and drafted PLAN.md for the student's review.

## Prompt 10: approving the plan

> Yes, open the PR

Context: the student reviewed PLAN.md and approved it. The agent asked whether the dashboard risk meant feature 9 or feature 10. That wasn't answered, so the student's original wording stayed in section 7.

Response summary: committed PLAN.md and this log to feature/plan, pushed the branch, and drafted the PR description for review.
