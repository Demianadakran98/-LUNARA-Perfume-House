# Figma AI Agent Prompt — Lunara

Create a premium, modern and responsive perfume e-commerce website named **Lunara** based on the supplied requirements and the low-fidelity wireframe.

## Screens

Create these screens in the same visual system:

1. Home
2. Product Listing / Discovery
3. Product Details
4. Cart
5. Checkout
6. WhatsApp Order Review
7. Wishlist
8. FAQ
9. Contact
10. Owner Products
11. Owner Inquiries

## Functional UI requirements

Customers must be able to:

- Browse perfume products
- Search for perfumes
- Filter by category
- Filter by occasion: Birthday, Wedding, Gift, Personal use
- Filter by price range
- Filter by scent family / notes, including Floral, Woody, Oriental and Fresh
- Sort by price ascending or descending
- View name, price, size/volume, availability, image, description, ingredients/notes, ratings and reviews
- Select bottle size
- Select gift wrapping / packaging where available
- Add, remove and update cart quantities
- View cart subtotal and total
- Checkout without an account
- Enter name, phone, delivery address and optional note / gift message
- Review the order before continuing to WhatsApp
- Continue with a pre-filled WhatsApp message containing products, quantities, prices, total and customer information
- Add / remove wishlist items
- View FAQs and contact the business through WhatsApp, phone, email and contact form

The owner area must remain small: product CRUD, availability, price/details updates and inquiry management only.

Do not add payment automation, delivery automation, account creation, or additional product variants.

## Visual direction

Use an editorial luxury aesthetic:

- Warm ivory background
- Charcoal text
- Muted bronze accent
- Refined serif display typography
- Clean sans-serif UI/body typography
- Generous whitespace
- Soft 1 px borders
- Restrained rounded cards
- Subtle shadows
- Premium editorial perfume imagery

The main action should be a dark charcoal pill button. Secondary actions should be light with a soft border.

## Components

Use reusable components for:

- Header / navigation
- Search
- Wishlist and cart indicators
- Product card
- Product rating row
- Availability state
- Filter chip
- Select control
- Price range inputs
- Bottle-size selector
- Gift-wrapping selector
- Quantity stepper
- Order summary card
- Contact card
- FAQ accordion
- Owner table
- Empty state
- Toast / feedback state

## Responsive behavior

Create and show behavior for:

- Desktop: 1440 px frame, four-column product grid where suitable
- Tablet: 834 px frame, two-column product grid
- Mobile: 390 px frame, single-column product grid and stacked forms/actions

Product details should become one column on smaller screens. Cart and checkout should stack their summary below content when required.

## Accessibility

Use visible keyboard focus states, meaningful image alt text, semantic hierarchy, clear labels, sufficient contrast and reduced-motion-friendly transitions.

## Performance

Keep imagery lightweight and use lazy-loaded imagery for products below the viewport. Do not add large visual effects or unnecessary dependencies.
