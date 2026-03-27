<p align="center">
  <img src="/extra/banner/readme_banner.png"
       alt="FreshRoute Logo"
       width="100%" />
</p>

<h1 align="center">FreshRoute</h1>

<p align="center">
FreshRoute is a web-based grocery ordering platform centered on fresh, organic, and ethically sourced food.
</p>

---

## Overview

FreshRoute allows users to browse fresh groceries, manage a shopping cart, and complete orders through a streamlined and user-focused interface.

This repository contains the design and implementation for the EECS 3311 course project.

## Project Resources

- Trello Board:  
  https://trello.com/invite/b/6991f08cf8e88c70aea8e433/ATTI6078905ea5a857425a3fba1642f134854ABFD8AE/eecs3311freshroute

- Discord Server:  
  https://discord.gg/8YT3uxnzum

- Figma: 
  https://www.figma.com/design/5c4UQhkcLux5jiRIkAHxb5/EECS3311_FreshRoute?node-id=24-2&t=YJvZso7EpI8yFKRt-1


## Motivation and Project Description

FreshRoute was created to address the growing demand for accessible, transparent, and ethically raised/sourced grocery options. While many grocery delivery platforms exist, they often lack a clear emphasis on organic standards and responsible sourcing. This can make it difficult for health-conscious individuals to efficiently identify products that align with their values.

FreshRoute solves this problem by focusing exclusively on fresh, organic, and ethically raised food. By narrowing the scope and prioritizing clarity, the platform simplifies decision-making and promotes sustainable consumption habits. Additionally, FreshRoute introduces recipe-based shopping, allowing users to select dishes and automatically add scaled ingredients to their cart, reducing friction in meal planning.

The project demonstrates user-centred design and a structured software architecture while delivering a focused, streamlined shopping experience.

## Installation for your Software/System

- **Install Git** (to clone the repo and work with branches/PRs).
- **Install Node.js (LTS recommended, Node 18+ is safe) + npm** (needed to install and run both frontend + backend).
- **Install MongoDB (Local)**  
  This project uses a local MongoDB database by default (see `.env`), so make sure **MongoDB Community Server** is installed and the MongoDB service is running.
- **Use the provided package.json files**  
  Install dependencies from the checked-in `package.json` in each app (`frontend/package.json` and `backend/package.json`). Avoid replacing them with default scaffolds so scripts and pinned versions stay consistent (we did this to ensure it ran smoothly on both windows and mac).

- [frontend/package.json](frontend/package.json)


- [backend/package.json](backend/package.json)

**Recommended tools (optional but helpful):**
- VS Code (or any IDE)
- MongoDB Compass (view/edit the database)

---

## List of required tools/programs to run the project

- Git
- Node.js + npm
- MongoDB (Local Community Server)

> **Note:** Express, Mongoose, CORS, dotenv, nodemon, React, and Vite are installed automatically when you run `npm install` inside the project folders (they are listed in `package.json`). Bootstrap will need to be installed. 

---

## Procedure for how to build and run your project.

### 1) Clone the repository
git clone <repo-url>
cd <repo-folder>

### 2) Install backend dependencies
cd backend
npm install

### 3) Create backend environment variables
Create a file: `backend/.env`  
Add the following (matches this repo’s setup):

PORT=4000  
MONGO_URI=mongodb:your_mongodb_connection_string  

### 4) Start MongoDB locally
Ensure your local MongoDB server/service is running (required for the `MONGO_URI` above).

### 5) Install frontend dependencies
- Go to the frontend folder: `cd ../frontend`  
- Install packages:  
  ```bash
  npm install
  npm install bootstrap react-bootstrap

- Ensure Bootstrap CSS is imported in `frontend/src/main.jsx:`
-  `import "bootstrap/dist/css/bootstrap.min.css";`

### 5.1) Replace the backend package.json (also in the above installation notes)

```json
{
  "name": "backend",
  "private": true,
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "dev": "node ./node_modules/nodemon/bin/nodemon.js src/server.js",
    "start": "node src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "mongoose": "^9.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
```

### 5.2) Replace the frontend package.json (also in the above installation notes)

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "node ./node_modules/vite/bin/vite.js",
    "build": "node ./node_modules/vite/bin/vite.js build",
    "preview": "node ./node_modules/vite/bin/vite.js preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "bootstrap": "^5.3.8",
    "react": "^19.1.1",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.1.1",
    "react-icons": "^5.5.0",
    "@vitejs/plugin-react": "^5.0.3",
    "vite": "^7.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.4.0"
  }
}
```



### 6) Start the backend
- Go to the backend folder: `cd ../backend`  
- Start the server: `npm run dev`  

Backend should run at: `http://localhost:4000`

### 7) Start the frontend
- Go to the frontend folder: `cd ../frontend`  
- Start the app: `npm run dev`  

Frontend should run using the link at the terminal

### 8) Open the app
- Visit the link in your browser.
- The frontend will communicate with the backend running at `http://localhost:4000`.

## Contribution

FreshRoute follows a structured team-based development process to ensure clarity and maintainability. We welcome all contributions and you can easily get on board!

### Branching Strategy

FreshRoute follows a simplified Git Flow model:

- `main` - stable production-ready branch  
- `develop` - integration branch for ongoing development  
- `feature/<feature-name>` - individual feature branches  
- `bugfix/<issue-name>` - bug fix branches  
- Specific to Sprint0: `sprint0-setup`

All new work is completed in feature branches and merged via pull requests.

---

### Issue Tracking

We use:

- **Trello** for sprint planning and task management  
- **GitHub** for repository hosting and pull requests  
- We use **GitHub Issues** to track tasks, bugs, and feature requests.

Each Trello card corresponds to a user story in `PB.md` + other assigned tasks.

---

### Pull Requests

- All changes must go through a Pull Request (PR).
- PRs require at least one team member review before merging.
- PR descriptions must reference the related user story.
- No direct commits to `main` after sprint0 as it is just documentation.
- Ensure the code does not break any functionality and works as intended before merging to `main`. 

---

### Commit Conventions

Commits will follow a clear naming structure as shown below in 2 different ways (both are acceptable):

(Note: We started ticket numbers from Trello around Feb 26th so any commits before that might not have the ticket numbers.)

- `Ticket #: feat - add product filtering`
- `Ticket #: fix - correct cart total calculation`
- `Ticket #: docs - update README`
- `Ticket #: refactor - improve checkout logic`
- `Ticket #: sprint0 - updated`

or 

- `Ticket #: add product filtering`
- `Ticket #: correct cart total calculation`
- `Ticket #: update README`
- `Ticket #: improve checkout logic`
- `Ticket #: updated sprint0`


---

### Branch Naming

Branches follow a consistent and descriptive naming convention which follows the Git Flow strategy.

- `feature/<feature-name>`  
  Example: `feature/recipe-scaling`

- `bugfix/<issue-name>`  
  Example: `bugfix/cart-total-error`

- `refactor/<module-name>`  
  Example: `refactor/checkout-logic`

Branch names:
- Are lowercase  
- Use hyphens instead of spaces  
- Clearly describe the purpose of the branch  
- Correspond to a Trello card or GitHub Issue when applicable  
