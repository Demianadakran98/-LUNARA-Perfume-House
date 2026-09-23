# Lunara Perfume House — Professional Responsive Prototype

A lightweight, professional perfume e-commerce prototype built directly from the supplied business requirements.

## What is included

### Customer experience

- Home / brand introduction
- Product discovery / shop
- Search by perfume, family and note
- Category filter
- Occasion filter: Birthday, Wedding, Gift, Personal use
- Price range filter
- Scent-note filter
- Price sorting ascending / descending
- Product details with image, availability, size, notes, ingredients, rating and review snippets
- Product variants limited to bottle size + gift wrapping / packaging
- Cart with quantity controls, remove, subtotal and total
- Guest checkout without account creation
- Optional order note / gift message
- Final order review
- Pre-filled WhatsApp order message
- Wishlist add / remove
- FAQ
- Contact via WhatsApp, phone, email and contact form

### Owner area

- Add products
- Edit product details
- Remove products
- Mark available / out of stock
- Update prices / details
- View and manage inquiries

The owner area intentionally stays small and does not introduce a larger admin system.

## Design deliverables

- `WIREFRAME.md` — textual low-fidelity wireframe
- `lunara-wireframes.svg` — Figma-import-ready visual wireframe reference
- `FIGMA_PROMPT.md` — Figma AI Agent prompt
- `FIGMA_HANDOFF.md` — high-fidelity Figma screen list, components, tokens and responsive rules
- `DESIGN_SYSTEM.md` — color, typography and component direction
- `TASK_MAPPING.md` — requirement-to-implementation traceability
- `QA_CHECKLIST.md` — functional, accessibility, responsive and performance checks

## Run locally

### Option A — VS Code + Live Server

1. Open this folder in VS Code.
2. Install the Live Server extension.
3. Open `index.html` with **Open with Live Server**.

### Option B — Python static server

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Tech approach

This version intentionally stays dependency-free to keep the prototype lightweight:

- HTML
- CSS
- Native JavaScript modules
- `localStorage` for prototype persistence
- `sessionStorage` for the WhatsApp review handoff

A backend/database can be added later without changing the customer-facing requirements or user flows.

## Important demo data

The contact details are placeholders:

- WhatsApp: `201000000000`
- Phone: `+20 100 000 0000`
- Email: `hello@lunara.example`

Replace them in `app.js` before publishing.

## Production notes

- Serve the deployed app through HTTPS.
- A real database/backend can be added later as a separate implementation phase.
- Add a real authenticated owner area if the project later requires production access control.
- Keep payment and delivery manual through WhatsApp, as required by the brief.
- Keep product images optimized; listing images already use lazy loading.
