# Requirement → implementation traceability

| Requirement | Implemented in |
|---|---|
| Browse perfume products | `#/shop`, responsive product grid + detail pages |
| Search perfumes | Shop search input |
| Filter by category | Category select |
| Filter by occasion | Birthday / Wedding / Gift / Personal use chips |
| Filter by price range | Minimum / maximum price fields |
| Filter by scent family / notes | Scent-note chips + category-based scent family cards |
| Sort by price | Featured / low-to-high / high-to-low |
| Product details | Name, price, size, availability, image, description, ingredients, notes, rating and review snippets |
| Bottle size variant | Product details size selector |
| Gift wrapping / packaging variant | Product details Yes/No selector where supported |
| Add/remove/update cart | Cart page + quantity controls |
| Cart subtotal / total | Cart summary |
| Guest checkout | Checkout form without account creation |
| Optional order note | Checkout form |
| Order review before WhatsApp | `#/checkout/review` |
| Pre-filled WhatsApp message | WhatsApp link with encoded order details |
| Manual confirmation/payment/delivery | UI copy explicitly keeps these manual |
| FAQ | `#/faq` |
| Reviews + ratings | Home + product details, with rating counts and review snippets |
| WhatsApp / phone / email / contact form | `#/contact` + footer |
| Wishlist add/remove | Wishlist + product cards/details |
| Owner add/edit/remove product | `#/admin/products` |
| Availability toggle | Owner products |
| Price/details update | Owner edit action |
| Manage inquiries | `#/admin/inquiries` |
| Performance-conscious | Local SVG artwork, no runtime dependencies, lazy-loaded listing images |
| 2–3 second Fast 3G target | Addressed as a production performance acceptance criterion in `QA_CHECKLIST.md` |
| HTTPS expectation | Deployment note in README |
| 99.9% availability | Documented as a production non-functional requirement |
| Responsive | Mobile / tablet / desktop breakpoints |
| Keyboard accessibility | Native controls, focus-visible states, skip link, reduced-motion support |
| Alternative text | Product images have meaningful `alt` text |
| Common accessibility practices | Semantic headings, labels, `aria-pressed`, native controls |
