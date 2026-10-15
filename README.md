# College Bus Tracking System — Login Interface Prototype

A modern, responsive web application for the **College Bus Tracking System**. This repository implements Phase 1: the frontend login experience, role-specific login flows, input validation, and an Under Development status page.

> **Scope Note:** This is an authentication and role-orchestration frontend prototype. Live GPS telemetry, map overlays, and backend credential verification are planned for Phase 2 once bus fleet transponders are deployed.

---

## 🎨 Design Philosophy & Color Palette

The interface is built to evoke trust, clarity, and ease of use on college campuses:
- **Main Background:** Pure White (`#FFFFFF`)
- **Primary Typography & Action Elements:** Matte Black (`#202020`)
- **Secondary Text:** Soft Grey (`#737373`)
- **Accent Orange:** Light Orange (`#FFE0C2`)
- **Accent Blue:** Very Light Blue (`#E2F2FF`)
- **Borders:** Subtle Grey (`#EAEAEA`)
- **Form Input Backgrounds:** Off-White (`#FAFAFA`)

---

## 🌐 Universal Cross-Platform Compatibility

To ensure this project runs seamlessly across **any coding platform** (VS Code, StackBlitz, CodeSandbox, Replit, local terminals on Windows/Mac/Linux):
1. **Zero-Dependency SVG Icons:** All icons are self-contained SVGs in `src/components/icons.tsx`, removing brittle external icon library version issues.
2. **Standard Extensionless Imports:** Uses standard bundler-compliant imports (e.g., `import App from './App'`), avoiding `TS5097` errors common in standard React Vite and TypeScript environments.
3. **Dual CSS Architecture:** Built using standard CSS variables and universally supported Tailwind utility classes (`w-12`, `shadow-sm`, `backdrop-blur-sm`), guaranteeing consistent visual presentation across all tools.

---

## 🚀 Key Features

### 1. Landing Page
- Centered brand header with bus icon.
- Main title: *"College Bus Tracking System"*
- Subtitle: *"Your campus commute, made simpler."*
- Supporting text: *"Sign in to access your college transportation portal."*
- Three distinct role cards:
  - **Student**: *"Access your student transportation portal."*
  - **Teacher**: *"Access transportation information for faculty."*
  - **Others**: *"Access the portal for college administration and staff."*
- Responsive 3-column desktop layout that stacks cleanly on mobile devices.

### 2. Role-Specific Login Flows
- **Student Login:**
  - Full Name validation (minimum 2 characters).
  - Gmail ID validation (standard email regex + `@gmail.com` requirement).
  - University Seat Number (USN) validation (minimum 5 alphanumeric characters).
- **Teacher Login:**
  - Faculty/Teacher Name.
  - Academic Department selector (Computer Science, Mechanical, Electronics, etc.).
  - Teacher ID validation.
- **Others Login:**
  - Full Name.
  - Staff ID.
  - Designation/Role dropdown (`Clerk`, `College Administrator`, `Subordinate Staff`, `Bus Staff`, `Other`).
- Inline friendly validation with instant visual feedback.
- Convenient **"Sample Data"** autofill buttons on every form for rapid test evaluation.

### 3. Under Development Placeholder
- Simple transportation icon.
- Heading: *"We're Building Something Useful."*
- Supporting text: *"The College Bus Tracking System is currently under development. Bus locations, route information, and live tracking will be available in a future update."*
- Status badge: *"Coming Soon"*
- Authenticated user's role and profile details.
- Navigation buttons: **"Back to Home"** and **"Logout"** (clears demo session).
- Roadmap preview of Phase 2 features (Live GPS, Arrival ETA, Geofenced Alerts, Incident Broadcasts).

### 4. Interactive Transport Helpdesk & Timetables
- Top navigation provides direct access to campus route schedules, emergency helpline contacts, and transport guidelines in an accessible modal dialog.

---

## 💻 Running the Project (Any Platform)

### Option A: Standard Local Machine (VS Code / Terminal)
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```
Open `http://localhost:3000` (or the port Vite prints in your console).

### Option B: Deploying to GitHub Pages (No White Screen)
1. **Push your code to GitHub.**
2. Go to your repository on GitHub: **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (the provided `.github/workflows/deploy.yml` will automatically build and deploy `dist/` on every push!).
   - *Alternatively*, if serving from a branch, select branch `main` or `gh-pages` and folder `/dist` (or `/root` if pushing `dist/` contents).
4. The application uses `base: './'` in `vite.config.ts`, so assets load with relative paths (`./assets/...`) preventing 404 white screens.

