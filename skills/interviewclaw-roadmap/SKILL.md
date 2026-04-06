---
name: interviewclaw-roadmap
description: "Creates and updates a weekly study roadmap with exercises, mock interviews, and prep activities mapped to a calendar. Reads from the user's profile, company prep, and practice problem reviews to build a personalized plan. Use when the user wants a study plan, schedule, roadmap, or asks what to work on next."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, WebSearch, WebFetch, Agent, AskUserQuestion
---

# Study Roadmap

You generate and update a personalized weekly study plan that maps exercises, prep sessions, and review activities to a calendar.

## Directory Structure

```
<workspace>/
├── roadmap/
│   ├── current.md        # The active weekly plan (markdown calendar)
│   ├── current.html      # Visual calendar view (open in browser)
│   └── archive/
│       └── YYYY-MM-DD.md # Past weekly plans
```

## Workflow

### Step 1: Gather context

Read these files to understand the user's current state:

1. **`profile.md`** — Background, experience level, tech stack
2. **`goals.md`** — Target roles, company preferences, timeline
3. **`gaps.md`** — Weak spots and focus areas (updated over time by practice reviews)
4. **`pipeline.md`** — Active interviews, stages, and deadlines
5. **`companies/*/README.md`** — What companies they're prepping for, interview stages and timelines
6. **`companies/*/questions.md`** — What topics those companies ask about
7. **`practice/problems/*/REVIEW.md`** — Past performance reviews, recurring weaknesses
8. **`roadmap/current.md`** — Existing plan (if updating rather than creating)

If key files are missing, ask the user for the information you need (upcoming interview dates, hours per day available to study, etc.).

### Step 2: Ask about schedule constraints

If this is a new roadmap (not an update), ask:

1. **What dates should this cover?** (default: the upcoming week, Mon–Fri)
2. **How many hours per day can you dedicate?** (default: 2–3 hours)
3. **Any fixed commitments?** (e.g., "I have a phone screen at Stripe on Thursday at 2pm")
4. **Preference for session length?** (e.g., 45-min focused blocks vs. longer deep dives)

### Step 3: Build the plan

Design a weekly plan that follows these principles:

**Topic progression:** Don't scatter randomly. Group related topics across consecutive days so concepts build on each other:
- Mon–Tue: Backtracking (learn → drill → debug → complexity analysis)
- Wed–Thu: Dynamic Programming (intro → 1D → 2D → practice)
- Fri: Mock interview combining the week's topics

**Session types:**
- **Exercises** — Problems to solve using `/interviewclaw-create-problem`. Specify the topic, difficulty, and category.
- **Review sessions** — Revisit past `REVIEW.md` files, re-attempt problems you struggled with
- **Company-specific prep** — Targeted work on topics from a company's reported questions
- **Mock interviews** — Timed practice simulating a real interview round (give a problem, enforce a time limit, do a full review)
- **Study blocks** — Directed reading/watching on a topic, with specific resources from LeetCode, NeetCode, HelloInterview, or GreatFrontend

**Prioritization logic:**
1. **Urgent interviews first.** If the user has a Stripe onsite in 5 days, that week's plan should focus on Stripe's known question topics.
2. **Weak spots over strengths.** Weight time toward areas from `gaps.md` and `REVIEW.md` where the user struggles.
3. **Variety within days.** Mix problem types within a day (e.g., morning algorithms, afternoon system design) to avoid fatigue.
4. **Progressive difficulty.** Start the week easier, build toward harder problems and mock interviews by end of week.
5. **Rest and review.** Don't fill every slot. Leave gaps for reviewing past work and absorbing concepts.

### Step 4: Write the markdown plan

Write to `roadmap/current.md`:

```markdown
# Study Roadmap — Week of YYYY-MM-DD

## Overview
Brief summary of what this week focuses on and why.

## Schedule

### Monday, MM/DD
| Time | Session | Details |
|------|---------|---------|
| 9:00–9:45 | Backtracking Intro | Study NeetCode backtracking pattern, watch explanation video |
| 10:00–10:45 | Exercise: Subsets | `/interviewclaw-create-problem` — generate a subsets/combinations problem, medium difficulty |

**Goal for today:** Understand the backtracking template and solve 2 problems.

### Tuesday, MM/DD
| Time | Session | Details |
|------|---------|---------|
| 2:00–2:45 | Exercise: Permutations | Backtracking problem, medium difficulty |
| 3:00–3:30 | Review | Re-read Monday's REVIEW.md, re-attempt any failed problems |

...

### Friday, MM/DD
| Time | Session | Details |
|------|---------|---------|
| 12:00–12:45 | Mock Interview | Timed 45-min problem covering this week's topics. Full review after. |

## Resources for This Week
- [NeetCode Backtracking Playlist](https://neetcode.io/roadmap) — watch before Monday's session
- [LeetCode Backtracking Tag](https://leetcode.com/tag/backtracking/) — supplementary problems
- Specific problem links relevant to the week's topics

## Company-Specific Notes
If prepping for specific companies, note which sessions map to which company's interview topics.
```

### Step 5: Generate the HTML calendar

Write a self-contained HTML file to `roadmap/current.html` that renders the plan as a visual weekly calendar (similar to the screenshot the user shared). Requirements:

- **Single HTML file**, no external dependencies — inline all CSS
- **Weekly grid layout**: columns for each day (Mon–Fri), rows for time slots
- **Color-coded session types:**
  - Exercises → blue
  - Mock interviews → green
  - Review sessions → amber/yellow
  - Study blocks → purple
  - Company-specific → use company brand color or a distinct color
- **Each session card shows:** time, title, and a brief detail line
- **Below the calendar grid**, list the day's exercises as cards (matching the screenshot layout where exercises appear below the scheduled sessions)
- **Responsive** — should look good on a laptop screen
- Use clean, modern styling. Light background, rounded cards, clear typography.

Tell the user they can open the HTML file in their browser: `open roadmap/current.html`

### Step 6: Summarize and confirm

Tell the user:
- What the week focuses on and why
- How many hours total are planned
- Which company interviews this maps to (if any)
- How to adjust (they can just ask you to move things around)

## Updating the Roadmap

When the user asks to update the plan:

1. Archive the current plan: move `roadmap/current.md` to `roadmap/archive/YYYY-MM-DD.md`
2. Read new context (completed reviews, new company-prep, updated profile)
3. Adjust the plan based on:
   - What they completed vs. skipped
   - New weaknesses identified in reviews
   - Changed interview timelines
   - User feedback ("I need more system design", "that was too easy")
4. Generate fresh `current.md` and `current.html`

## Important Notes

- Be realistic about time — a 45-min slot means one problem, not three
- Don't overschedule. 3–4 focused sessions per day max for someone studying full-time; 1–2 for someone with a day job
- When suggesting external resources, link to SPECIFIC problems or sections, not just homepages
- The HTML calendar should be self-contained and work offline
- If the user is falling behind, adjust the plan rather than piling on more work
