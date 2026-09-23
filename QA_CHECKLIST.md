# Lunara — QA Checklist

## Functional

- [x] Browse perfume products
- [x] Search by product / family / note
- [x] Filter by category
- [x] Filter by occasion: Birthday, Wedding, Gift, Personal use
- [x] Filter by price range
- [x] Filter by scent note
- [x] Sort by price ascending / descending
- [x] Product details include required information
- [x] Bottle size variant
- [x] Gift wrapping variant only
- [x] Add / remove cart items
- [x] Increase / decrease quantity
- [x] Cart subtotal + total
- [x] Guest checkout
- [x] Optional note / gift message
- [x] Order review before WhatsApp
- [x] Pre-filled WhatsApp message
- [x] Wishlist add / remove
- [x] FAQ
- [x] WhatsApp / phone / email / contact form
- [x] Owner product controls
- [x] Owner inquiry management

## Accessibility

- [x] Skip link
- [x] Native buttons / inputs / selects
- [x] Visible keyboard focus states
- [x] Form labels
- [x] Meaningful product image alt text
- [x] `aria-pressed` on toggle-like filters / options
- [x] Reduced-motion preference

## Responsive

- [x] Desktop layout
- [x] Tablet breakpoint
- [x] Mobile breakpoint
- [x] Stacked checkout and cart layouts on narrow screens
- [x] Mobile navigation

## Performance / delivery notes

- [x] Product artwork is local SVG
- [x] Listing images use lazy loading
- [x] No external runtime dependencies
- [x] HTTPS requirement documented for production deployment

## Manual test scenarios

1. Open Home → Shop → Product Details.
2. Filter by Gift + Floral.
3. Open a product, choose a different bottle size, enable gift wrapping if supported.
4. Add to cart twice and verify quantity increases.
5. Update quantity in Cart and confirm total changes.
6. Complete guest Checkout and open Review.
7. Verify WhatsApp message includes products, quantities, prices, total and customer data.
8. Add / remove a product from Wishlist.
9. Submit Contact form and check Owner → Inquiries.
10. Owner → Products: edit, toggle availability and remove a product.
