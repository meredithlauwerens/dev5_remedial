# Contributing to dev5_remedial

Thank you for your interest in contributing to **dev5_remedial**! This document provides guidelines and instructions for contributing to this NPC-camera surveillance simulation project.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm
- PostgreSQL (or Docker & Docker Compose for containerized setup)
- Git

### Setting Up Your Development Environment

1. **Fork the repository** to your own GitHub account.
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/[YOUR_USERNAME]/dev5_remedial.git
   cd dev5_remedial
   ```

3. **Add upstream remote** (to stay synced with main repo):
   ```bash
   git remote add upstream https://github.com/meredithlauwerens/dev5_remedial.git
   ```

4. **Copy environment template**:
   ```bash
   cp .env.template .env
   ```
   Adjust values in `.env` for your local setup.

5. **Set up the database**:
   - **Using Docker (recommended)**:
     ```bash
     docker compose up -d
     ```
   - **Manual PostgreSQL setup**:
     ```bash
     psql -U postgres -f database/init.sql
     ```

6. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

7. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

## Development Workflow

### Creating a Branch

Create a feature branch for your work:
```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` — new features (e.g., `feature/camera-deletion`)
- `bugfix/` — bug fixes (e.g., `bugfix/line-of-sight-calculation`)
- `docs/` — documentation updates (e.g., `docs/api-endpoints`)
- `test/` — test additions (e.g., `test/simulation-service`)

### Running the Application

1. **Start the backend** (from `backend/` directory):
   ```bash
   npm run dev
   ```
   The backend runs on `http://localhost:3000` by default.

2. **Start the frontend** (from `frontend/` directory):
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:5173` by default.

3. **Database**:
   - If using Docker, ensure the container is running: `docker compose ps`
   - If using manual PostgreSQL, ensure the database is initialized.

### Making Changes

#### Backend Changes
- Controllers: `backend/src/controllers/`
- Services: `backend/src/services/`
- Routes: `backend/src/routes/`
- Database config: `backend/src/config/`

#### Frontend Changes
- React components: `frontend/src/components/`
- Pages: `frontend/src/pages/`
- Styles: `frontend/src/styles/` or component-scoped styles

#### Database Changes
- Schema updates: `database/init.sql`
- Apply changes to running instance via `psql` or update `.env` and recreate container

### Testing Your Changes

- **Manual Testing**: Use Postman or curl to test backend endpoints.
- **Example curl request**:
  ```bash
  curl -X GET http://localhost:3000/api/sightings
  ```
- **Frontend**: Test through the browser UI at `http://localhost:5173`.

## Committing Your Changes

### Commit Message Format

Follow [Conventional Commit](https://www.conventionalcommits.org/) format for consistency:

#### Types:
- `feat` — a new feature
- `fix` — a bug fix
- `docs` — documentation changes
- `style` — code style changes (formatting, missing semicolons, etc.)
- `refactor` — code refactoring without feature/fix changes
- `test` — adding or updating tests
- `chore` — dependency updates, build config, etc.

#### Examples:
```bash
git commit -m "feat(camera): add camera deletion endpoint"
git commit -m "fix(simulation): correct line-of-sight calculation for diagonal obstacles"
git commit -m "docs: add API endpoint examples"
git commit -m "test(service): add unit tests for distance calculation"
```

### Staying in Sync

Before pushing, sync with the upstream main branch:
```bash
git fetch upstream
git rebase upstream/main
```

If there are conflicts, resolve them and continue:
```bash
git rebase --continue
```

## Submitting Changes

### Push Your Branch

```bash
git push origin feature/your-feature-name
```

### Create a Pull Request (PR)

1. Go to your fork on GitHub.
2. Click **"Compare & pull request"** for your feature branch.
3. Fill in the PR template with:
   - **Title**: Clear description of changes (e.g., "Add NPC movement speed control")
   - **Description**: 
     - What problem does this solve?
     - How does it work?
     - Any breaking changes?
   - **References**: Link related issues (e.g., `Closes #42`)

### PR Checklist

Before submitting, ensure:
- [ ] Code follows the project's style and conventions
- [ ] Changes have been tested locally
- [ ] Commit messages follow Conventional Commit format
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] Documentation is updated if applicable
- [ ] No unnecessary dependencies added
- [ ] Changes work with the existing codebase

## Code Style & Standards

### General Guidelines
- Use meaningful variable and function names
- Write comments for complex logic
- Keep functions focused and single-responsibility
- Avoid deeply nested code

### Backend (Node.js/Express)
- Use async/await for asynchronous operations
- Handle errors gracefully with try-catch or .catch()
- Return consistent JSON responses
- Use environment variables for configuration
- Follow RESTful conventions for API routes

### Frontend (React/Vite)
- Use functional components with hooks
- Keep components modular and reusable
- Use descriptive prop names
- Avoid hardcoding values; use constants or config files
- Keep component files organized by feature/page

### SQL
- Use meaningful table and column names
- Include comments for complex queries
- Follow consistent indentation

## Common Development Tasks

### Adding a New API Endpoint

1. Create or update the route in `backend/src/routes/`
2. Implement the controller in `backend/src/controllers/`
3. Use the service layer for business logic in `backend/src/services/`
4. Update the README.md with endpoint documentation
5. Test with curl or Postman
6. Create a PR with your changes

### Adding a New Frontend Feature

1. Create components in `frontend/src/components/`
2. Add pages in `frontend/src/pages/` if needed
3. Update `App.jsx` with new routes if applicable
4. Test in development (`npm run dev`)
5. Ensure it works with the backend API

### Updating the Database Schema

1. Modify `database/init.sql`
2. Drop and recreate the container: `docker compose down && docker compose up -d`
3. Or manually apply changes via `psql`
4. Test that existing functionality still works
5. Document changes in the PR

## Reporting Issues

If you find a bug or have a feature request:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs. actual behavior
   - Environment details (OS, Node version, etc.)
3. **Label appropriately**: `bug`, `enhancement`, `documentation`, etc.

## Getting Help

- **Questions**: Open a discussion or issue with the `question` label
- **Documentation**: Check the README and inline code comments
- **Community**: Reach out to project maintainers or existing contributors

## Recognition

Contributors will be recognized in the project's contributor list. Thank you for making this project better!

## License

By contributing to dev5_remedial, you agree that your contributions will be licensed under the MIT License (see [LICENSE](LICENSE) file).

---
