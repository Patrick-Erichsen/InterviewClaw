# Contributing to InterviewClaw

## Testing skill changes

Before submitting a PR that modifies a skill, run evals to verify your changes don't break existing behavior.

Each skill has test prompts in `skills/<skill-name>/evals/evals.json`. To run them:

1. Install the `skill-creator` skill if you haven't already:
   ```bash
   npx skills add anthropics/skills --filter skill-creator
   ```

2. Open the repo in your coding agent and invoke the skill creator:
   ```
   /skill-creator
   ```

3. Tell it you want to improve `skills/<skill-name>` and that you'd like to run the existing evals.

Eval workspaces are written to `skills/<skill-name>-workspace/` (gitignored) so they don't end up in the repo.
