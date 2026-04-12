# Commit Message Convention

## Purpose

This document defines the **commit message standards** for this project.  
Following a consistent commit convention helps with:

- Readable Git history
- Easier code reviews
- Better collaboration
- Clear change tracking
- Automated changelogs (if added later)

---

## Commit Message Format

Each commit message must follow this format:

### Example

feat: add pricing section layout
fix: resolve mobile navbar overflow
chore: update dependencies

---

## Commit Types

| Type       | Description                                |
| ---------- | ------------------------------------------ |
| `feat`     | A new feature                              |
| `fix`      | A bug fix                                  |
| `ui`       | UI or styling changes                      |
| `update`   | Update any code block                      |
| `refactor` | Code refactoring without changing behavior |
| `perf`     | Performance improvements                   |
| `docs`     | Documentation updates                      |
| `test`     | Adding or updating tests                   |
| `chore`    | Maintenance tasks (configs, deps, tooling) |
| `build`    | Build system or bundler changes            |
| `ci`       | CI/CD related changes                      |
| `revert`   | Reverting a previous commit                |

---

## Rules

- Use **present tense** (“add”, not “added”)
- Keep the summary **short and descriptive**
- Do **not** capitalize the first letter
- Do **not** end with a period
- One logical change per commit

---

## Good Commit Examples

feat: add hero section call-to-action
ui: adjust button spacing on mobile
fix: correct meta title for seo
docs: update readme with setup steps

---

## Bad Commit Examples

fixed bug
Update
changes
Added pricing section.

---

## Optional Scope (Advanced)

For larger changes, you may include a scope:

---

## Commit Frequency

- Commit **small, logical units of work**
- Avoid mixing unrelated changes in one commit
- Commit early, commit often

---

## Branch-Specific Notes

- `main`: Only production-ready commits
- `development`: Feature-complete and tested commits
- `feature/*`: Work-in-progress allowed

---

## Enforcement (Optional)

This convention can be enforced using:

- Commit hooks (Husky)
- CI validation
- PR review checks

---
