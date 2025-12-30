# Copilot Instructions for Portfolio 2025

## Project Overview
Personal portfolio SPA for Mamadou Ba (AI Developer & CS Student at CUNY CSI). Built with React 18, Vite 5, Tailwind CSS 3, Framer Motion, and react-icons. Features dark/light theme toggle, animated sections, and professional AI-themed design.

## Architecture
```
src/
├── components/
│   ├── Navbar.jsx      # Floating pill navbar with theme toggle
│   ├── Hero.jsx        # Hero section with animated brain SVG
│   ├── Projects.jsx    # Featured project + project grid
│   ├── TechStack.jsx   # Categorized tech icons (Languages, AI/ML, Tools)
│   ├── About.jsx       # Bio, location, resume download
│   ├── Footer.jsx      # Contact CTA, social links
│   └── index.js        # Barrel exports
├── App.jsx             # Root component, theme state
├── main.jsx            # React entry point
└── index.css           # Tailwind + custom styles
```

## Key Files
| File | Purpose |
|------|---------|
| `tailwind.config.js` | Custom colors: `navy`, `cyan`, `slate` variants |
| `vite.config.js` | `base: "/portfolio-2025/"` for GitHub Pages |
| `package.json` | Deploy scripts: `npm run deploy` |

## Color Palette
```js
navy: '#0a192f'      // Primary background
navy-light: '#112240' // Card backgrounds
cyan: '#64ffda'       // Accent color
slate: '#8892b0'      // Body text
slate-light: '#ccd6f6' // Headings
```

## Commands
```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to dist/
npm run deploy   # Build + deploy to GitHub Pages
npm run lint     # ESLint check
```

## Theme Toggle Pattern
```jsx
// App.jsx passes theme to all components
const [darkMode, setDarkMode] = useState(true);
<Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

// Components use conditional classes
className={darkMode ? 'bg-navy text-slate-light' : 'bg-gray-50 text-gray-900'}
```

## Component Patterns

### Animated Sections (Framer Motion)
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

### Project Cards
```jsx
// Projects.jsx - data structure
const projects = [
  {
    title: "Project Name",
    description: "Description",
    tech: ["Python", "TensorFlow"],
    github: "https://github.com/...",
    live: "#",  // optional
    icon: <HiOutlineChartBar className="w-8 h-8" />,
    featured: true  // shows in large featured card
  }
];
```

### Tech Stack Icons
```jsx
// TechStack.jsx - use react-icons Si* for brands
import { SiPython, SiTensorflow } from 'react-icons/si';
{ name: "Python", icon: SiPython, color: "#3776AB" }
```

## Icons
- **Brand icons**: `react-icons/si` (SiPython, SiTensorflow, etc.)
- **UI icons**: `react-icons/fi` (FiGithub, FiMail, FiDownload)
- **Outline icons**: `react-icons/hi` (HiOutlineChartBar, etc.)

## Deployment
```bash
npm run deploy  # Runs predeploy (build) then gh-pages -d dist
```
- Deployed to: `https://mamadouba2004.github.io/portfolio-2025/`
- All asset paths must work with `/portfolio-2025/` base

## Adding Content

### New Project
Edit `projects` array in `src/components/Projects.jsx`

### New Tech Icon  
Add to `techCategories` in `src/components/TechStack.jsx`

### Update Personal Info
- Email/links: `Footer.jsx`, `Navbar.jsx`
- Bio text: `About.jsx`
- Hero tagline: `Hero.jsx`
