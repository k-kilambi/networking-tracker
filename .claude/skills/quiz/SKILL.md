---
name: quiz
description: Check the student's understanding of what was just built by asking them to explain it in their own words. Use when the student asks to be quizzed or after a feature ships.
argument-hint: [topic]
---

Check the student's understanding of: $ARGUMENTS. If no topic was given, use the most recently built feature.

Base your questions on the actual code in this repo, and read it first. Aim at the high-level understanding the class requires: how the app accepts and stores data, and how users interact with it. Don't test syntax.

1. Ask one question at a time, and wait for the answer. Ask 3 questions at most, starting with the easiest. Good types:
   - Trace it: "When I click Save, where does the data go?"
   - Why: "Why does this need its own table?"
   - Break it: "What would go wrong if we removed this check?"
   - Demo Q&A: "A classmate asks how you stop one user seeing another's data. What do you say?"

2. After each answer, say what was right and what was missing, without softening real gaps. If they're stuck, give a hint before giving the answer. Point to the part of the app or code that shows it.

3. Finish with one line on what's solid and one on what to revisit. Do not change any code.
