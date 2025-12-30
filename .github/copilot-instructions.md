# Copilot Instructions for Portfolio 2025

## Project Overview
This is a personal portfolio website built with **React 19**, **Vite**, and **Tailwind CSS**. It features modern UI design with glassmorphism effects, animations using **Framer Motion**, and icons from **Lucide React**.

## Architecture & Core Components
- **Entry Point**: `src/main.jsx` mounts the React application.
- **Main Layout**: `src/App.jsx` contains the single-page layout, including sections for Hero, About, Projects, and Contact.
- **Routing**: Currently a single-page application (SPA) without client-side routing.
- **State Management**: Local component state (React `useState`, `useEffect`) is sufficient for current complexity.

## Tech Stack & Dependencies
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion (`framer-motion`)
- **Icons**: Lucide React (`lucide-react`)
- **Build Tool**: Vite (using `rolldown-vite`)
- **Linting**: ESLint (Flat Config)

## Development Workflow
- **Start Dev Server**: `npm run dev` (runs on `localhost:5173`)
- **Build for Production**: `npm run build` (outputs to `dist/`)
- **Preview Build**: `npm run preview`
- **Lint Code**: `npm run lint`

## Coding Conventions & Patterns

### Styling (Tailwind CSS)
- Use utility classes for all styling.
- **Glassmorphism**: Use the custom `glass` and `glassBorder` colors defined in `tailwind.config.js`.
  - Example: `bg-glass border border-glassBorder`
- **Gradients**: Use Tailwind's gradient utilities (e.g., `bg-gradient-to-r`).
- **Responsive Design**: Mobile-first approach using standard Tailwind breakpoints (`md:`, `lg:`).

### Components
- Use **Functional Components** with Hooks.
- File extension: `.jsx` for components.
- Keep components small and focused. Extract reusable UI parts (like `TechBadge` in `src/App.jsx`) into separate components if they grow.

### Animations (Framer Motion)
- Import `motion` from `framer-motion`.
- Use `<motion.div>` (or other HTML elements) for animated containers.
- Define animation variants for complex sequences.

### Icons
- Import specific icons from `lucide-react`.
- Example: `import { Github, Mail } from 'lucide-react';`
- Style icons using Tailwind classes (e.g., `className="w-6 h-6 text-gray-400"`).

## Configuration Files
- `vite.config.js`: Vite configuration. Note the `base: '/portfolio-2025/'` setting for deployment.
- `tailwind.config.js`: Tailwind theme extensions (colors, fonts).
- `eslint.config.js`: ESLint rules and plugins.

## Deployment
- The project is configured for deployment to GitHub Pages (implied by `base` in `vite.config.js`).
- Ensure assets are correctly referenced relative to the base path.
