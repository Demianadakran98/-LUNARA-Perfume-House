# Lunara — Figma AI Handoff

## Goal

Create a polished, responsive high-fidelity Figma design from the supplied product-discovery requirements and low-fidelity wireframes.

## Frames to create

- Desktop: 1440 × 1100
- Tablet: 834 × 1112
- Mobile: 390 × 844

Use the same information hierarchy on all three sizes while allowing layout changes for responsive behavior.

## Screens

1. Home
2. Shop / Product Listing
3. Product Details
4. Cart
5. Checkout
6. WhatsApp Order Review
7. Wishlist
8. FAQ
9. Contact
10. Owner Products
11. Owner Inquiries

## Visual direction

- Background: warm ivory
- Text: charcoal
- Accent: muted bronze / warm brown
- Typography: refined serif for major headings + clean sans-serif for controls/body
- Cards: soft borders, restrained radius, subtle shadows
- Imagery: clean editorial product photography or lightweight bottle illustrations
- Overall feeling: premium, calm, modern, trustworthy

## Design tokens

- Page max width: 1200 px
- Spacing rhythm: 8 px base unit
- Desktop section spacing: ~88 px
- Card radius: 22–24 px
- Small control radius: 12–14 px
- Primary CTA: charcoal filled pill
- Secondary CTA: light background + 1 px border
- Focus ring: visible bronze outline

## Component checklist

- Header / navigation
- Search button
- Wishlist button + count
- Cart button + count
- Mobile navigation drawer
- Product card
- Rating row
- Availability badge
- Filter chip
- Select input
- Price input pair
- Quantity stepper
- Bottle-size selector
- Gift-wrapping selector
- Summary card
- Contact card
- FAQ accordion
- Owner product table
- Empty state
- Toast / feedback message

## Responsive behavior

### Desktop

- Four product columns where space permits
- Two-column product details
- Two-column cart / checkout
- Three-column service, review and contact blocks

### Tablet

- Two product columns
- Product details stack vertically
- Cart / checkout can stack if needed
- Mobile nav treatment is acceptable

### Mobile

- Single-column content
- Full-width primary actions
- Filters wrap and remain keyboard accessible
- Cart totals move below items
- Product detail actions stack
- Contact cards stack

## Figma AI prompt

Use the full prompt in `FIGMA_PROMPT.md`. Paste it after placing the low-fidelity wireframe in the same Figma file.

## Do not add

- Automatic payment
- Automated delivery
- Account creation requirement
- Extra product variants beyond bottle size and gift wrapping
- Large admin dashboard beyond products + inquiries
