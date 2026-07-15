# Task Manager

A responsive, RTL-first task manager built with vanilla JavaScript and Tailwind CSS v4.

The app supports creating tasks with priority labels, editing and deleting tasks, marking tasks as done, dark/light theme switching, and automatic date rendering in Persian locale.

## Features

- RTL and Persian UI layout
- Responsive sidebar drawer for mobile and desktop
- Create task flow with validation (title, description, priority)
- Three priority levels: low, medium, high
- Edit and delete actions per task
- Mark tasks as completed with separate done section
- Task counters for pending and completed tasks
- Local storage persistence for tasks and theme
- Light and dark theme toggle

## Tech Stack

- HTML5
- Vanilla JavaScript (ES Modules)
- Tailwind CSS v4 (@tailwindcss/cli)
- Prettier + prettier-plugin-tailwindcss

## Project Structure

```
Task-Manager/
  index.html
  package.json
  src/
    assets/
      fonts/
      icons/
    scripts/
      main.js
      modules/
        createReadTasks.js
        dateFormatter.js
        drawerMenu.js
        editDeleteTasks.js
        theme.js
        themeLocalStorage.js
    style/
      input.css
      output.css
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Installation

```bash
npm install
```

### Development Workflow

Run Tailwind in watch mode:

```bash
npm run watch
```

Then open index.html in your browser (or use the VS Code Live Server extension for automatic reload).

## Available Script

```bash
npm run watch
```

This compiles src/style/input.css into src/style/output.css and keeps watching for changes.

## Data Persistence

The app stores data in browser localStorage:

- tasksList: array of created tasks and completion status
- theme: selected UI theme (light or dark)

## Main Modules

- drawerMenu.js: handles mobile drawer open/close and overlay behavior
- theme.js: handles theme toggle actions
- themeLocalStorage.js: applies saved theme on initial page load
- dateFormatter.js: renders today date in fa-IR format
- createReadTasks.js: create, render, move, and persist tasks
- editDeleteTasks.js: task options menu, edit panel, and delete behavior

## Notes

- This is a frontend-only app and does not require a backend service.
- Task IDs are generated using Date.now().

## License

No license file is currently defined in this repository.
