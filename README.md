# OneWell - Model Development Dashboard

## Project Overview

**OneWell** is a comprehensive Model Development Dashboard designed to provide governance, tracking, and visualization for machine learning model development lifecycles. It offers a centralized interface for monitoring project status, managing data lineage, and tracking operational feeds.

Built with performance and user experience in mind, the application leverages the latest Next.js 16 App Router features and a modern component architecture to deliver a fast, responsive, and accessible interface.

## Tech Stack

The project utilizes a cutting-edge stack focused on scalability, maintainability, and developer experience:

### Core Framework
-   **[Next.js 16](https://nextjs.org/)**: React framework for production, utilizing the App Router for nested layouts and optimized routing.
-   **[React 19](https://react.dev/)**: The latest version of the library for web and native user interfaces.
-   **[TypeScript](https://www.typescriptlang.org/)**: Static type definitions for enhanced code quality and developer productivity.

### Styling & UI
-   **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
-   **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible components for building high-quality design systems (Accordion, Avatar, Progress, etc.).
-   **[Lucide React](https://lucide.dev/)**: Beautiful & consistent icon library.
-   **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React to create smooth transitions and interactive elements.
-   **[next-themes](https://github.com/pacocoursey/next-themes)**: Perfect dark/light mode implementation.
-   **Font**: [Geist](https://vercel.com/font) (Sans & Mono) for excellent readability.

### Utilities

-   **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)**: For efficient and conflict-free class name construction.
-   **[date-fns](https://date-fns.org/)**: Modern JavaScript date utility library.

## Key Features

-   **Project Dashboard**: Centralized view of all active model development projects.
-   **Governance Panel**: Tools for managing compliance and model standards.
-   **Data Lineage View**: Visual representation of data flow and dependencies (`components/dashboard/lineage-view.tsx`).
-   **Operations Feed**: Real-time or chronological feed of system operations and updates (`components/dashboard/operations-feed.tsx`).
-   **Data Tables**: Comprehensive lists and management of datasets (`components/dashboard/data-tables-list.tsx`).
-   **Responsive Layout**: Fully responsive Sidebar and Mobile Navigation (`components/layout`).
-   **Dark Mode Support**: Native dark mode support for all components.

## Project Structure

```bash
.
├── app/                    # Next.js App Router directory
│   ├── layout.tsx          # Root layout with ThemeProvider and Sidebar
│   ├── page.tsx            # Home page (redirects to first project)
│   ├── globals.css         # Global styles and Tailwind directives
│   └── project/            # Project-specific routes
│       └── [id]/           # Dynamic route for individual project views
├── components/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific widget components
│   ├── layout/             # Layout components (Sidebar, MobileNav)
│   ├── ui/                 # Generic UI primitives (Buttons, Cards, etc.)
│   └── theme-provider.tsx  # Next-themes provider wrapper
├── lib/                    # Utility functions and API mocks
│   ├── api.ts              # Data fetching functions
│   └── utils.ts            # Helper functions (cn, etc.)
├── public/                 # Static assets
└── package.json            # Project dependencies and scripts
```

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

-   **Node.js**: Version 18.17 or higher (LTS recommended)
-   **npm**: Installed with Node.js

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/grkmpasaoglu/onewell.git
    cd onewell
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

To create a production-optimized build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Linting

To run the linter and check for code quality issues:

```bash
npm run lint
```
