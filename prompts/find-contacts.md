# Prompt log: Feature 6, find contacts

Issue: #16

## Prompt 1: fast mode

> Yes, you merge

Response summary: added search by name, company, or related job, a company filter, and sorting by newest or name A-Z. These settings live in the page's address.

What went sideways: searching for a literal % matched everyone, because it was treated as a wildcard. The agent found this while testing edge cases and fixed the escaping. It also tested commas, parentheses, and quotes in a search.
