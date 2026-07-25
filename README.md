# Desire to succeed

A responsive, front-end NGO management dashboard for tracking donations, volunteers, and community projects.

## Run locally

Open `index.html` in a modern browser. For the most reliable browser behavior, serve the folder with any static web server (for example, VS Code Live Server).

## Pages

- `index.html` — public landing page
- `dashboard.html` — overview and charts
- `donations.html` — add, search, edit, and delete donations
- `volunteers.html` — add, search, edit, and delete volunteers
- `projects.html` — searchable project catalogue
- `contact.html` — contact form
- `login.html` / `admin.html` — dashboard entry routes

## Structure

```
css/        Shared dashboard and landing-page styles
js/         Shared helpers and page-specific behavior
*.html      Standalone application pages
*.jpg/png   Local project and profile images
```

## Data and dependencies

Donation, volunteer, and contact-message data are saved in browser LocalStorage under the `nss.*` keys. The project uses Font Awesome and Chart.js from CDNs; an internet connection is required for those enhancements. Core pages and LocalStorage features work without a build step.
