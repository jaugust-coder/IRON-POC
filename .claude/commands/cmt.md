# Commit Message Generator

Generate a conventional commit message for the staged files following these rules:

## Rules to Follow

1. **Get branch name** to extract Jira ticket (format: `SPA-XXXXX`)
2. **Analyze ONLY staged files** using `git diff --cached`
3. **Follow Conventional Commits format**: `<type>(<scope>): <description>`
   - Always include Jira ticket in scope: `type(SPA-XXXXX): description`
4. **Commitlint config**: Max header length 200 characters
5. **Types allowed** (from @commitlint/config-conventional):
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, no logic change)
   - `refactor`: Code refactoring (no feat/fix)
   - `perf`: Performance improvements
   - `test`: Adding/updating tests
   - `chore`: Maintenance tasks (deps, config, build)
   - `ci`: CI/CD changes
   - `build`: Build system changes
   - `revert`: Revert previous commit

## Steps to Execute

1. Run `git branch --show-current` to get current branch
2. Extract ticket ID (e.g., `SPA-23463` from `feature/SPA-23463`)
3. Run `git diff --cached --name-only` to see staged files
4. Run `git diff --cached` to analyze changes
5. Determine appropriate commit type based on changes
6. Generate commit message with format: `type(TICKET-ID): description`
7. Ensure total length d 200 characters
8. Present commit message to user for approval

## Examples

```
feat(SPA-23463): add user authentication flow
fix(SPA-23463): resolve null pointer in audience filter
chore(SPA-23463): update dependencies to latest versions
refactor(SPA-23463): reorganize folder structure for better modularity
docs(SPA-23463): update API documentation for audience endpoints
test(SPA-23463): add unit tests for audience creation service
```

## Output Format

Present the generated commit message clearly:

```
Proposed commit message:
type(SPA-XXXXX): description

Files to be committed:
- file1.ts
- file2.tsx

Would you like to:
1. Commit with this message
2. Edit the message
3. Cancel
```
