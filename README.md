# SaaS-Test2

This repository contains a small React application created with Vite. The app showcases a simple product catalog page and now uses **Tailwind CSS** for styling.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev --workspace=my-app
   ```

Tailwind CSS configuration is located in `my-app/tailwind.config.js`. The main styles are imported in `src/index.css`, which only contains the Tailwind directives without any custom CSS.

The product catalog is located in `my-app/src/ProductCatalog.jsx` and is rendered inside the main `App` component. The app's layout follows the Tailwind UI **light sidebar with header** pattern.
