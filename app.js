import { seedProducts } from './products.js';

const STORAGE = {
  products: 'lunara_products_v2',
  cart: 'lunara_cart_v2',
  wishlist: 'lunara_wishlist_v2',
  inquiries: 'lunara_inquiries_v2'
};

const BUSINESS = {
  name: 'Lunara Perfume House',
  whatsapp: '201000000000',
  phone: '+20 100 000 0000',
  email: 'hello@lunara.example'
};

const app = document.querySelector('#app');
const toastEl = document.querySelector('#toast');
let toastTimer;
let searchTimer;

const state = {
  products: load(STORAGE.products, seedProducts),
  cart: load(STORAGE.cart, []),
  wishlist: load(STORAGE.wishlist, []),
  inquiries: load(STORAGE.inquiries, []),
  filters: { search: '', category: 'All', occasion: 'All', scent: 'All', min: '', max: '', sort: 'featured' },
  selectedDetail: { size: null, wrap: 'No' }
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function money(n) { return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(Number(n) || 0); }
function esc(v) { return String(v ?? '').replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }
function toast(msg) { clearTimeout(toastTimer); toastEl.textContent = msg; toastEl.classList.add('show'); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200); }
function cartCount() { return state.cart.reduce((sum, i) => sum + Number(i.quantity || 0), 0); }
function cartTotal() { return state.cart.reduce((sum, i) => sum + (Number(i.price) * Number(i.quantity)), 0); }
function findProduct(id) { return state.products.find(p => p.id === Number(id)); }
function currentRoute() {
  const raw = location.hash.replace(/^#/, '') || '/home';
  const [path, queryString = ''] = raw.split('?');
  return { path, params: new URLSearchParams(queryString) };
}
function go(path) { location.hash = path; }

function icon(name) {
  const icons = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"></path></svg>',
    cart: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2l2.1 11.2A2 2 0 0 0 9.1 17h7.8a2 2 0 0 0 1.96-1.62L20 8H6"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h13M13 6l6 6-6 6"></path></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"></path></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.07 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.28-1.28a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92Z"></path></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>'
  };
  return icons[name] || '';
}

function layout(content) {
  const { path } = currentRoute();
  const active = path.startsWith('/shop') ? 'shop' : path.startsWith('/faq') ? 'faq' : path.startsWith('/contact') ? 'contact' : 'home';
  return `
  <div class="announcement"><div class="container announcement-inner"><span>WhatsApp ordering</span><span class="announcement-dot">•</span><span>No account required</span><span class="announcement-dot">•</span><span>Manual confirmation, payment & delivery</span></div></div>
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="#/home" aria-label="Lunara home"><span class="brand-mark">L</span><span class="brand-word">LUNARA</span></a>
      <nav class="nav-links" aria-label="Main navigation">
        <a class="${active==='home'?'active':''}" href="#/home">Home</a>
        <a class="${active==='shop'?'active':''}" href="#/shop">Shop</a>
        <a class="${active==='faq'?'active':''}" href="#/faq">FAQ</a>
        <a class="${active==='contact'?'active':''}" href="#/contact">Contact</a>
      </nav>
      <div class="nav-actions">
        <button class="icon-btn" aria-label="Search perfumes" onclick="focusShopSearch()">${icon('search')}</button>
        <a class="icon-btn" href="#/wishlist" aria-label="Wishlist">${icon('heart')}<span class="badge" id="wish-count">${state.wishlist.length}</span></a>
        <a class="icon-btn" href="#/cart" aria-label="Shopping cart">${icon('cart')}<span class="badge" id="cart-count">${cartCount()}</span></a>
        <button class="icon-btn mobile-menu" aria-label="Open navigation menu" aria-expanded="false" onclick="toggleMobileMenu()">${icon('menu')}</button>
      </div>
    </div>
  </header>
  <div id="mobile-panel" class="container mobile-panel" hidden>
    <div class="panel mobile-panel-inner">
      <a href="#/home">Home</a><a href="#/shop">Shop</a><a href="#/wishlist">Wishlist</a><a href="#/faq">FAQ</a><a href="#/contact">Contact</a>
    </div>
  </div>
  <main id="app-content" tabindex="-1">${content}</main>
  <footer class="footer">
    <div class="container footer-grid">
      <div><div class="brand"><span class="brand-mark">L</span><span class="brand-word">LUNARA</span></div><p>Thoughtful fragrance, wrapped beautifully. Order directly through WhatsApp with no account required.</p></div>
      <div><h4>Explore</h4><p><a href="#/shop">All perfumes</a></p><p><a href="#/wishlist">Wishlist</a></p><p><a href="#/faq">FAQ</a></p></div>
      <div><h4>Contact</h4><p><a href="tel:${BUSINESS.phone.replace(/\s/g,'')}">${esc(BUSINESS.phone)}</a></p><p><a href="mailto:${BUSINESS.email}">${esc(BUSINESS.email)}</a></p><p><a href="https://wa.me/${BUSINESS.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></p></div>
      <div><h4>Business</h4><p><a href="#/admin/products">Owner area</a></p><p>Payment and delivery are handled manually through WhatsApp.</p></div>
    </div>
    <div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${BUSINESS.name}</span><span>Responsive · Accessible · Lightweight</span></div>
  </footer>`;
}

function stars(rating) {
  const full = Math.round(Number(rating) || 0);
  return `<span class="stars" aria-label="Rated ${esc(rating)} out of 5">${'★'.repeat(Math.min(full,5))}${'☆'.repeat(Math.max(0,5-full))}</span>`;
}

function productCard(p) {
  const inWish = state.wishlist.includes(p.id);
  return `<article class="product-card">
    <div class="product-media">
      <button type="button" class="icon-btn heart ${inWish?'is-liked':''}" aria-label="${inWish?'Remove from':'Add to'} wishlist" aria-pressed="${inWish}" onclick="toggleWishlist(${p.id})">${icon('heart')}</button>
      <a href="#/product/${p.id}" aria-label="View ${esc(p.name)} details"><div class="product-image"><img src="${p.image}" alt="${esc(p.name)} perfume bottle" loading="lazy" width="800" height="880"></div></a>
      ${!p.availability ? '<span class="product-badge muted-badge">Out of stock</span>' : ''}
    </div>
    <div class="product-info">
      <div class="product-top"><div><div class="product-name">${esc(p.name)}</div><div class="meta">${esc(p.category)} · ${p.sizes.join(' / ')}</div></div><div class="price">${money(p.price)}</div></div>
      <div class="rating-row">${stars(p.rating)}<span class="meta">${esc(p.rating)} · ${esc(p.reviews)} reviews</span></div>
      <div class="stock ${p.availability?'in-stock':'out-stock'}">${p.availability?'Available now':'Currently unavailable'}</div>
      <div class="product-actions"><a class="btn btn-secondary" href="#/product/${p.id}">Details</a><button type="button" class="btn btn-primary" ${p.availability?'':'disabled'} onclick="quickAdd(${p.id})">Add to cart</button></div>
    </div>
  </article>`;
}

function homePage() {
  const featured = state.products.slice(0,4);
  return layout(`
    <section class="hero"><div class="container hero-grid">
      <div class="hero-copy-wrap"><div class="eyebrow">Modern fragrance house</div><h1>Find the scent that feels like <em>you.</em></h1><p class="hero-copy">Discover floral, woody, oriental and fresh perfumes curated for meaningful moments, personal rituals and thoughtful gifting.</p><div class="actions"><a class="btn btn-primary btn-lg" href="#/shop">Shop perfumes ${icon('arrow')}</a><a class="text-link" href="#/faq">How ordering works <span aria-hidden="true">→</span></a></div><div class="hero-points"><span>${icon('check')} Guest checkout</span><span>${icon('check')} Gift wrapping where available</span><span>${icon('check')} WhatsApp review before sending</span></div></div>
      <div class="hero-art" aria-label="Decorative perfume bottle illustration"><div class="hero-orbit orbit-a"></div><div class="hero-orbit orbit-b"></div><div class="bottle"><div class="bottle-cap"></div><div class="bottle-label"><strong>LUNARA</strong><span>EAU DE PARFUM</span></div></div><span class="hero-note note-top">Rose · Jasmine</span><span class="hero-note note-bottom">Amber · Musk</span></div>
    </div></section>

    <section class="service-strip"><div class="container service-grid"><div><strong>Simple discovery</strong><span>Search, filter and sort by what matters to you.</span></div><div><strong>Thoughtful gifting</strong><span>Choose gift wrapping where it is offered.</span></div><div><strong>Human checkout</strong><span>Review your order, then continue on WhatsApp.</span></div></div></section>

    <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Curated collection</div><h2>Featured perfumes</h2><p>Explore signature scents with clear availability, sizes, notes and customer ratings.</p></div><a class="btn btn-secondary" href="#/shop">View all ${icon('arrow')}</a></div><div class="grid-4">${featured.map(productCard).join('')}</div></div></section>

    <section class="section alt"><div class="container"><div class="section-head"><div><div class="eyebrow">Shop by moment</div><h2>Find the right occasion</h2><p>Start with the reason you are choosing a fragrance.</p></div></div><div class="grid-4">${['Birthday','Wedding','Gift','Personal use'].map((o,i)=>`<a class="category-card occasion-${i+1}" href="#/shop?occasion=${encodeURIComponent(o)}"><span class="category-index">0${i+1}</span><strong>${o}</strong><span>Explore ${o.toLowerCase()} picks ${icon('arrow')}</span></a>`).join('')}</div></div></section>

    <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Scent families</div><h2>Choose by character</h2><p>Use scent family and note filters to narrow the collection.</p></div><a class="btn btn-secondary" href="#/shop">Explore notes ${icon('arrow')}</a></div><div class="scent-grid">${['Floral','Woody','Oriental','Fresh'].map((s,i)=>`<a class="scent-card scent-${i+1}" href="#/shop?category=${encodeURIComponent(s)}"><span>${['Petals & soft musk','Dry woods & amber','Warm spice & depth','Citrus & airy notes'][i]}</span><strong>${s}</strong><span>Shop ${s.toLowerCase()} ${icon('arrow')}</span></a>`).join('')}</div></div></section>

    <section class="section alt"><div class="container"><div class="section-head"><div><div class="eyebrow">How it works</div><h2>From discovery to WhatsApp</h2><p>A simple purchase journey without account creation or automatic payment.</p></div></div><div class="steps-grid"><div class="step"><span>01</span><h3>Discover</h3><p>Search, filter and open the fragrance that fits your moment.</p></div><div class="step"><span>02</span><h3>Review</h3><p>Select bottle size and gift wrapping where available, then add to cart.</p></div><div class="step"><span>03</span><h3>Continue to WhatsApp</h3><p>Confirm your details and review the exact message before it opens in WhatsApp.</p></div></div></div></section>

    <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Loved by customers</div><h2>Reviews that feel personal</h2><p>Product ratings and review snippets stay visible during discovery and comparison.</p></div></div><div class="grid-3"><div class="review-card"><div class="rating-row">${stars(5)}<span class="meta">5.0 · recent</span></div><p>“The bottle felt special and the scent lasted all day. Ordering on WhatsApp was simple.”</p><strong>Salma</strong></div><div class="review-card"><div class="rating-row">${stars(5)}<span class="meta">5.0 · recent</span></div><p>“I used the gift wrap for a birthday order and the whole experience was very clear.”</p><strong>Mariam</strong></div><div class="review-card"><div class="rating-row">${stars(4)}<span class="meta">4.0 · recent</span></div><p>“The notes helped me narrow down the fragrance I wanted without needing an account.”</p><strong>Omar</strong></div></div></div></section>
  `);
}

function applyQuery() {
  const { params } = currentRoute();
  if (params.get('occasion')) state.filters.occasion = params.get('occasion');
  if (params.get('category')) state.filters.category = params.get('category');
}

function shopPage() {
  applyQuery();
  const cats = ['All', ...new Set(state.products.map(p=>p.category))];
  const occasions = ['All', 'Birthday', 'Wedding', 'Gift', 'Personal use'];
  const scents = ['All', ...new Set(state.products.flatMap(p=>p.notes))];
  let list = [...state.products];
  const f = state.filters;
  list = list.filter(p => !f.search || `${p.name} ${p.category} ${p.notes.join(' ')}`.toLowerCase().includes(f.search.toLowerCase()));
  if (f.category !== 'All') list = list.filter(p=>p.category===f.category);
  if (f.occasion !== 'All') list = list.filter(p=>p.occasions.includes(f.occasion));
  if (f.scent !== 'All') list = list.filter(p=>p.notes.includes(f.scent));
  if (f.min !== '') list = list.filter(p=>p.price>=Number(f.min));
  if (f.max !== '') list = list.filter(p=>p.price<=Number(f.max));
  if (f.sort==='priceAsc') list.sort((a,b)=>a.price-b.price);
  if (f.sort==='priceDesc') list.sort((a,b)=>b.price-a.price);
  return layout(`<section class="section"><div class="container">
    <div class="page-hero"><div><div class="eyebrow">Product discovery</div><h1>Shop perfumes</h1><p>Search, filter and sort by category, occasion, price and scent notes.</p></div><div class="result-count"><strong>${list.length}</strong><span>of ${state.products.length} perfumes shown</span></div></div>
    <div class="discovery-panel panel">
      <div class="shop-toolbar">
        <div class="search-wrap"><span>${icon('search')}</span><input id="search" class="input search-input" value="${esc(f.search)}" placeholder="Search by perfume, family or note..." aria-label="Search perfumes" oninput="setSearch(this.value)"></div>
        <select class="select" aria-label="Category" onchange="setFilter('category', this.value)">${cats.map(v=>`<option ${f.category===v?'selected':''}>${v}</option>`).join('')}</select>
        <select class="select" aria-label="Sort" onchange="setFilter('sort', this.value)"><option value="featured" ${f.sort==='featured'?'selected':''}>Featured</option><option value="priceAsc" ${f.sort==='priceAsc'?'selected':''}>Price: low to high</option><option value="priceDesc" ${f.sort==='priceDesc'?'selected':''}>Price: high to low</option></select>
      </div>
      <div class="filter-group"><span class="filter-label">Occasion</span><div class="filter-bar">${occasions.map(v=>`<button type="button" class="chip ${f.occasion===v?'active':''}" aria-pressed="${f.occasion===v}" onclick="setFilter('occasion','${esc(v)}')">${v}</button>`).join('')}</div></div>
      <div class="filter-group"><span class="filter-label">Scent note</span><div class="filter-bar">${scents.map(v=>`<button type="button" class="chip ${f.scent===v?'active':''}" aria-pressed="${f.scent===v}" onclick="setFilter('scent','${esc(v)}')">${v}</button>`).join('')}</div></div>
      <div class="price-filter"><div><label for="min">Minimum price</label><input id="min" class="input" type="number" min="0" value="${esc(f.min)}" oninput="setFilter('min', this.value)"></div><div><label for="max">Maximum price</label><input id="max" class="input" type="number" min="0" value="${esc(f.max)}" oninput="setFilter('max', this.value)"></div><button type="button" class="btn btn-secondary" onclick="resetFilters()">Reset filters</button></div>
    </div>
    ${list.length ? `<div class="grid-4">${list.map(productCard).join('')}</div>` : `<div class="panel empty"><h3>No perfumes match these filters.</h3><p>Try a broader occasion, note or price range.</p><button type="button" class="btn btn-secondary" onclick="resetFilters()">Clear filters</button></div>`}
  </div></section>`);
}

function productPage(id) {
  const p = findProduct(id);
  if (!p) return layout(`<section class="section"><div class="container panel empty"><h2>Product not found</h2><a class="btn btn-primary" href="#/shop">Back to shop</a></div></section>`);
  state.selectedDetail = { size: p.sizes[0], wrap: 'No' };
  const inWish = state.wishlist.includes(p.id);
  return layout(`<section class="container detail">
    <div class="detail-visual"><div class="detail-image"><img src="${p.image}" alt="${esc(p.name)} perfume bottle" width="800" height="880"></div><div class="detail-caption"><span>${esc(p.category)} fragrance</span><span>${p.availability?'Available now':'Currently unavailable'}</span></div></div>
    <div class="detail-info"><div class="eyebrow">${esc(p.category)} fragrance</div><h1>${esc(p.name)}</h1><div class="rating-row detail-rating">${stars(p.rating)}<span class="meta">${esc(p.rating)} · ${esc(p.reviews)} reviews</span></div><div class="detail-price">${money(p.price)}</div><p class="lead-copy">${esc(p.description)}</p>
      <div class="option-row"><label>Bottle size</label><div class="option-grid" id="size-options" role="group" aria-label="Bottle size">${p.sizes.map((s,i)=>`<button type="button" class="option ${i===0?'selected':''}" data-size="${esc(s)}" aria-pressed="${i===0}" onclick="pickOption('size', '${esc(s)}')">${esc(s)}</button>`).join('')}</div></div>
      <div class="option-row"><label>Gift wrapping / packaging</label><div class="option-grid" id="wrap-options" role="group" aria-label="Gift wrapping"><button type="button" class="option selected" data-wrap="No" aria-pressed="true" onclick="pickOption('wrap','No')">No</button>${p.giftWrapping?`<button type="button" class="option" data-wrap="Yes" aria-pressed="false" onclick="pickOption('wrap','Yes')">Yes</button>`:''}</div></div>
      <div class="detail-actions"><button type="button" class="btn btn-primary btn-lg" ${p.availability?'':'disabled'} onclick="addFromDetail(${p.id})">Add to cart ${icon('arrow')}</button><button type="button" class="btn btn-secondary" onclick="toggleWishlist(${p.id})">${inWish?'Remove from':'Add to'} wishlist</button></div>
      <div class="note"><strong>${p.availability?'In stock':'Out of stock'}</strong> · Ordering does not require an account. Confirmation, payment and delivery are handled manually through WhatsApp.</div>
      <div class="detail-sections"><div><h3>Scent notes</h3><div class="tag-list">${p.notes.map(n=>`<span class="tag">${esc(n)}</span>`).join('')}</div></div><div><h3>Ingredients / product information</h3><p class="meta">${esc(p.ingredients)}</p></div><div><h3>Customer reviews</h3><div class="review-stack">${(p.reviewSnippets||[]).map(r=>`<div class="mini-review"><div class="rating-row">${stars(r.rating)}<span class="meta">${esc(r.author)}</span></div><p>${esc(r.text)}</p></div>`).join('')}</div></div></div>
    </div>
  </section>`);
}

function pickOption(type, value) {
  state.selectedDetail[type] = value;
  const selector = type === 'size' ? '#size-options .option' : '#wrap-options .option';
  document.querySelectorAll(selector).forEach(el => {
    const selected = (type==='size' ? el.dataset.size : el.dataset.wrap) === value;
    el.classList.toggle('selected', selected);
    el.setAttribute('aria-pressed', String(selected));
  });
}
function addFromDetail(id) {
  const p = findProduct(id); if (!p || !p.availability) return;
  addCartItem({ productId:id, size:state.selectedDetail.size || p.sizes[0], giftWrapping:state.selectedDetail.wrap === 'Yes' });
}
function addCartItem(item) {
  const p = findProduct(item.productId); if (!p || !p.availability) return;
  const existing = state.cart.find(i => i.productId===item.productId && i.size===item.size && i.giftWrapping===item.giftWrapping);
  if (existing) existing.quantity += 1;
  else state.cart.push({ ...item, quantity:1, price:p.price });
  save(STORAGE.cart, state.cart); update(); toast(`${p.name} added to cart`);
}
function quickAdd(id) {
  const p = findProduct(id); if (!p || !p.availability) return;
  addCartItem({ productId:id, size:p.sizes[0], giftWrapping:false });
}

function cartPage() {
  const validItems = state.cart.filter(item => findProduct(item.productId));
  if (validItems.length !== state.cart.length) { state.cart = validItems; save(STORAGE.cart, state.cart); }
  if (!state.cart.length) return layout(`<section class="section"><div class="container panel empty"><div class="empty-icon">${icon('cart')}</div><h2>Your cart is empty.</h2><p>Explore the collection and add a fragrance to get started.</p><a class="btn btn-primary" href="#/shop">Browse perfumes</a></div></section>`);
  return layout(`<section class="section"><div class="container"><div class="page-hero"><div><div class="eyebrow">Cart</div><h1>Your selection</h1><p>Review quantities, sizes and gift wrapping before checkout.</p></div><div class="result-count"><strong>${cartCount()}</strong><span>items</span></div></div><div class="cart-layout"><div class="panel cart-panel">${state.cart.map((item,idx)=>{const p=findProduct(item.productId);return `<div class="cart-item"><div class="thumb"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></div><div><strong>${esc(p.name)}</strong><div class="meta">${esc(item.size)} · Gift wrap: ${item.giftWrapping?'Yes':'No'}</div><div class="qty" style="margin-top:10px"><button type="button" aria-label="Decrease ${esc(p.name)} quantity" onclick="changeQty(${idx}, -1)">−</button><span>${item.quantity}</span><button type="button" aria-label="Increase ${esc(p.name)} quantity" onclick="changeQty(${idx}, 1)">+</button></div></div><div class="cart-item-total"><strong>${money(item.price*item.quantity)}</strong><button type="button" class="text-btn danger" onclick="removeCart(${idx})">Remove</button></div></div>`;}).join('')}</div><aside class="panel summary-card"><div class="summary-kicker">Order summary</div><h3>Ready when you are</h3><div class="summary-line"><span>Subtotal</span><strong>${money(cartTotal())}</strong></div><div class="summary-line"><span>Delivery</span><span class="meta">Confirmed manually</span></div><div class="summary-total"><span>Total</span><span>${money(cartTotal())}</span></div><a class="btn btn-primary btn-full" href="#/checkout">Continue to checkout ${icon('arrow')}</a><p class="micro-copy">No account required. Payment and delivery are confirmed manually through WhatsApp.</p></aside></div></div></section>`);
}
function changeQty(idx, delta) { if (!state.cart[idx]) return; state.cart[idx].quantity += delta; if(state.cart[idx].quantity<=0) state.cart.splice(idx,1); save(STORAGE.cart,state.cart); render(); }
function removeCart(idx) { state.cart.splice(idx,1); save(STORAGE.cart,state.cart); render(); toast('Item removed'); }

function checkoutPage() {
  if (!state.cart.length) return layout(`<section class="section"><div class="container panel empty"><h2>Add something to your cart first.</h2><a class="btn btn-primary" href="#/shop">Browse perfumes</a></div></section>`);
  return layout(`<section class="section"><div class="container"><div class="page-hero"><div><div class="eyebrow">Checkout</div><h1>Your details</h1><p>No account required. Review your order, then continue to WhatsApp with the details pre-filled.</p></div><div class="checkout-mark"><span>Guest checkout</span><strong>01</strong></div></div><div class="checkout-layout"><form class="panel form-card" onsubmit="submitCheckout(event)"><div class="form-grid"><div class="field"><label for="name">Name</label><input class="input" id="name" name="name" required autocomplete="name"></div><div class="field"><label for="phone">Phone number</label><input class="input" id="phone" name="phone" required autocomplete="tel"></div><div class="field field-full"><label for="address">Delivery address</label><textarea id="address" name="address" required autocomplete="street-address"></textarea></div><div class="field field-full"><label for="note">Optional note / gift message</label><textarea id="note" name="note" placeholder="e.g. Happy Birthday!"></textarea></div></div><button class="btn btn-primary btn-lg btn-full" type="submit">Review order & continue to WhatsApp ${icon('arrow')}</button></form><aside class="panel summary-card"><div class="summary-kicker">Your order</div><h3>Before you send</h3>${state.cart.map(i=>{const p=findProduct(i.productId);return `<div class="summary-line"><span>${esc(p.name)} × ${i.quantity}<br><small>${esc(i.size)} · Wrap ${i.giftWrapping?'Yes':'No'}</small></span><strong>${money(i.price*i.quantity)}</strong></div>`}).join('')}<div class="summary-total"><span>Total</span><span>${money(cartTotal())}</span></div><div class="notice" style="margin-top:16px">After WhatsApp opens, the business owner will manually confirm the order, payment and delivery.</div></aside></div></div></section>`);
}
function submitCheckout(ev) {
  ev.preventDefault();
  const fd = new FormData(ev.currentTarget);
  const customer = { name:String(fd.get('name')||'').trim(), phone:String(fd.get('phone')||'').trim(), address:String(fd.get('address')||'').trim(), note:String(fd.get('note')||'').trim() };
  const message = buildWhatsApp(customer);
  sessionStorage.setItem('lunara_last_order', JSON.stringify({ customer, items:state.cart, total:cartTotal() }));
  sessionStorage.setItem('lunara_whatsapp_message', message);
  go('/checkout/review');
}
function buildWhatsApp(customer) {
  const lines = [`New ${BUSINESS.name} Order`, '', `Customer: ${customer.name}`, `Phone: ${customer.phone}`, `Address: ${customer.address}`, '', 'Products:'];
  state.cart.forEach(i => { const p=findProduct(i.productId); if (p) lines.push(`- ${p.name} | ${i.size} | Gift wrap: ${i.giftWrapping?'Yes':'No'} | Qty: ${i.quantity} | ${money(i.price*i.quantity)}`); });
  lines.push('',`Total: ${money(cartTotal())}`); if(customer.note) lines.push(`Note: ${customer.note}`); return lines.join('\n');
}
function reviewPage() {
  const data = JSON.parse(sessionStorage.getItem('lunara_last_order')||'null'); const msg = sessionStorage.getItem('lunara_whatsapp_message')||'';
  if (!data) return layout(`<section class="section"><div class="container panel empty"><h2>No order is ready for review.</h2><a class="btn btn-primary" href="#/cart">Back to cart</a></div></section>`);
  return layout(`<section class="section"><div class="container"><div class="page-hero"><div><div class="eyebrow">Final review</div><h1>Ready for WhatsApp</h1><p>Check the information below before the message is prepared in WhatsApp.</p></div><div class="checkout-mark"><span>Review</span><strong>02</strong></div></div><div class="checkout-layout"><div class="panel"><div class="summary-kicker">Customer</div><h3>${esc(data.customer.name)}</h3><div class="summary-line"><span>Phone</span><strong>${esc(data.customer.phone)}</strong></div><div class="summary-line"><span>Address</span><strong>${esc(data.customer.address)}</strong></div>${data.customer.note?`<div class="summary-line"><span>Note</span><strong>${esc(data.customer.note)}</strong></div>`:''}<div class="divider"></div><div class="summary-kicker">Products</div>${data.items.map(i=>{const p=findProduct(i.productId);return p?`<div class="summary-line"><span>${esc(p.name)}<br><small>${esc(i.size)} · Qty ${i.quantity} · Wrap ${i.giftWrapping?'Yes':'No'}</small></span><strong>${money(i.price*i.quantity)}</strong></div>`:''}).join('')}</div><aside class="panel summary-card"><div class="summary-kicker">Message</div><h3>One last check</h3><div class="message-preview">${esc(msg)}</div><div class="summary-total"><span>Total</span><span>${money(data.total)}</span></div><a class="btn btn-primary btn-full" target="_blank" rel="noopener" href="https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}">Open WhatsApp ${icon('arrow')}</a><button type="button" class="btn btn-secondary btn-full" style="margin-top:10px" onclick="copyWhatsApp()">Copy message</button><p class="micro-copy">The WhatsApp message contains products, quantities, prices, total and customer information.</p></aside></div></div></section>`);
}
async function copyWhatsApp() { const message = sessionStorage.getItem('lunara_whatsapp_message')||''; try { await navigator.clipboard.writeText(message); toast('WhatsApp message copied'); } catch { toast('Copy is not available in this browser'); } }

function wishlistPage() {
  const items = state.products.filter(p=>state.wishlist.includes(p.id));
  return layout(`<section class="section"><div class="container"><div class="page-hero"><div><div class="eyebrow">Wishlist</div><h1>Saved for later</h1><p>Keep the fragrances you are considering in one place.</p></div><div class="result-count"><strong>${items.length}</strong><span>saved</span></div></div>${items.length?`<div class="grid-4">${items.map(productCard).join('')}</div>`:`<div class="panel empty"><div class="empty-icon">${icon('heart')}</div><h2>Your wishlist is empty.</h2><a class="btn btn-primary" href="#/shop">Explore perfumes</a></div>`}</div></section>`);
}
function toggleWishlist(id) { const i=state.wishlist.indexOf(Number(id)); if(i>=0) state.wishlist.splice(i,1); else state.wishlist.push(Number(id)); save(STORAGE.wishlist,state.wishlist); render(); toast(i>=0?'Removed from wishlist':'Added to wishlist'); }

function faqPage() {
  const faqs=[['Do I need an account to order?','No. You can complete checkout as a guest and continue to WhatsApp.'],['How is payment handled?','Payment is discussed and confirmed manually with the business owner through WhatsApp.'],['How is delivery arranged?','Delivery arrangements are confirmed manually through WhatsApp after the order is reviewed.'],['Can I request gift wrapping?','Yes, where available on the product page. Gift wrapping is the only packaging variant offered.'],['Can I see availability before ordering?','Yes. Each product shows its current availability status on the shop and product detail pages.']];
  return layout(`<section class="section"><div class="container narrow"><div class="page-hero"><div><div class="eyebrow">Support</div><h1>Frequently asked questions</h1><p>Clear answers about ordering, variants and WhatsApp checkout.</p></div></div><div class="faq-list">${faqs.map(([q,a])=>`<details class="panel"><summary>${esc(q)}</summary><p class="meta">${esc(a)}</p></details>`).join('')}</div></div></section>`);
}
function contactPage() {
  return layout(`<section class="section"><div class="container narrow"><div class="page-hero"><div><div class="eyebrow">Contact</div><h1>Let's talk fragrance</h1><p>Use WhatsApp, phone, email or the contact form for questions and inquiries.</p></div></div><div class="contact-cards"><a class="contact-card" href="https://wa.me/${BUSINESS.whatsapp}" target="_blank" rel="noopener"><strong>WhatsApp</strong><span>Chat directly with the business</span></a><a class="contact-card" href="tel:${BUSINESS.phone.replace(/\s/g,'')}"><strong>Phone</strong><span>${esc(BUSINESS.phone)}</span></a><a class="contact-card" href="mailto:${BUSINESS.email}"><strong>Email</strong><span>${esc(BUSINESS.email)}</span></a></div><form class="panel form-card" onsubmit="submitInquiry(event)"><div class="summary-kicker">Contact form</div><h3>Send an inquiry</h3><div class="form-grid" style="margin-top:18px"><div class="field"><label for="cname">Name</label><input id="cname" class="input" name="name" required autocomplete="name"></div><div class="field"><label for="cphone">Phone</label><input id="cphone" class="input" name="phone" required autocomplete="tel"></div><div class="field field-full"><label for="cemail">Email</label><input id="cemail" class="input" type="email" name="email" required autocomplete="email"></div><div class="field field-full"><label for="cmessage">Message</label><textarea id="cmessage" name="message" required></textarea></div></div><button class="btn btn-primary" type="submit">Send inquiry ${icon('arrow')}</button></form></div></section>`);
}
function submitInquiry(ev) { ev.preventDefault(); const fd=new FormData(ev.currentTarget); state.inquiries.unshift({ id:Date.now(), name:String(fd.get('name')||''), phone:String(fd.get('phone')||''), email:String(fd.get('email')||''), message:String(fd.get('message')||''), createdAt:new Date().toISOString() }); save(STORAGE.inquiries,state.inquiries); ev.currentTarget.reset(); toast('Inquiry received'); }

function adminProductsPage() {
  return layout(`<section class="section"><div class="container"><div class="admin-head"><div><div class="eyebrow">Owner area</div><h1>Products</h1><p class="meta">Small-scope owner controls: add, edit, remove, availability and price/details.</p></div><a class="btn btn-secondary" href="#/admin/inquiries">View inquiries ${icon('arrow')}</a></div><div class="panel" style="overflow:auto"><table class="admin-table"><thead><tr><th>Product</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead><tbody>${state.products.map(p=>`<tr><td><strong>${esc(p.name)}</strong><br><span class="meta">${esc(p.category)} · ${p.sizes.join(' / ')}</span></td><td>${money(p.price)}</td><td><span class="status-pill ${p.availability?'on':'off'}">${p.availability?'In stock':'Out of stock'}</span></td><td><div class="admin-actions"><button type="button" class="btn btn-secondary" onclick="editProduct(${p.id})">Edit</button><button type="button" class="btn btn-secondary" onclick="toggleAvailability(${p.id})">${p.availability?'Mark out':'Mark available'}</button><button type="button" class="btn btn-danger" onclick="deleteProduct(${p.id})">Remove</button></div></td></tr>`).join('')}</tbody></table></div><div class="panel admin-form"><div class="summary-kicker">New product</div><h3>Add product</h3><form onsubmit="addProduct(event)" style="margin-top:14px"><div class="form-grid"><div class="field"><label>Name</label><input class="input" name="name" required></div><div class="field"><label>Price (EGP)</label><input class="input" type="number" min="0" name="price" required></div><div class="field"><label>Category</label><select class="select" name="category"><option>Floral</option><option>Woody</option><option>Oriental</option><option>Fresh</option></select></div><div class="field"><label>Sizes (comma separated)</label><input class="input" name="sizes" placeholder="50ml, 100ml" required></div><div class="field field-full"><label>Description</label><textarea name="description" required></textarea></div><div class="field"><label>Notes (comma separated)</label><input class="input" name="notes" required></div><div class="field"><label>Gift wrapping available?</label><select class="select" name="giftWrapping"><option value="true">Yes</option><option value="false">No</option></select></div></div><button class="btn btn-primary" style="margin-top:15px">Add product</button></form></div></div></section>`);
}
function addProduct(ev) { ev.preventDefault(); const fd=new FormData(ev.currentTarget); const id=Math.max(0,...state.products.map(p=>p.id))+1; state.products.push({ id, name:String(fd.get('name')), price:Number(fd.get('price')), sizes:String(fd.get('sizes')).split(',').map(s=>s.trim()).filter(Boolean), image:'./images/rose-veil.svg', category:String(fd.get('category')), occasions:['Gift'], notes:String(fd.get('notes')).split(',').map(s=>s.trim()).filter(Boolean), description:String(fd.get('description')), ingredients:'Alcohol, Parfum, Aqua, Fragrance Allergens', availability:true, giftWrapping:fd.get('giftWrapping')==='true', rating:0, reviews:0, reviewSnippets:[] }); save(STORAGE.products,state.products); render(); toast('Product added'); }
function editProduct(id) { const p=findProduct(id); if(!p) return; const name=prompt('Product name',p.name); if(name===null)return; const price=prompt('Price (EGP)',p.price); if(price===null)return; const category=prompt('Category',p.category); if(category===null)return; const sizes=prompt('Sizes (comma separated)',p.sizes.join(', ')); if(sizes===null)return; const description=prompt('Description',p.description); if(description===null)return; const notes=prompt('Notes (comma separated)',p.notes.join(', ')); if(notes===null)return; p.name=name; p.price=Number(price)||p.price; p.category=category; p.sizes=sizes.split(',').map(s=>s.trim()).filter(Boolean); p.description=description; p.notes=notes.split(',').map(s=>s.trim()).filter(Boolean); save(STORAGE.products,state.products); render(); toast('Product updated'); }
function toggleAvailability(id) { const p=findProduct(id); if(!p) return; p.availability=!p.availability; save(STORAGE.products,state.products); render(); toast('Availability updated'); }
function deleteProduct(id) { if(!confirm('Remove this product?'))return; state.products=state.products.filter(p=>p.id!==Number(id)); state.wishlist=state.wishlist.filter(w=>w!==Number(id)); state.cart=state.cart.filter(i=>i.productId!==Number(id)); save(STORAGE.products,state.products); save(STORAGE.wishlist,state.wishlist); save(STORAGE.cart,state.cart); render(); toast('Product removed'); }

function adminInquiriesPage() {
  return layout(`<section class="section"><div class="container"><div class="admin-head"><div><div class="eyebrow">Owner area</div><h1>Inquiries</h1><p class="meta">View and manage customer inquiries submitted through the contact form.</p></div><a class="btn btn-secondary" href="#/admin/products">Products ${icon('arrow')}</a></div>${state.inquiries.length?`<div class="panel" style="overflow:auto"><table class="admin-table"><thead><tr><th>Customer</th><th>Contact</th><th>Message</th><th>Date</th><th>Action</th></tr></thead><tbody>${state.inquiries.map(i=>`<tr><td><strong>${esc(i.name)}</strong></td><td>${esc(i.phone)}<br>${esc(i.email)}</td><td>${esc(i.message)}</td><td>${new Date(i.createdAt).toLocaleString()}</td><td><button type="button" class="btn btn-danger" onclick="deleteInquiry(${i.id})">Delete</button></td></tr>`).join('')}</tbody></table></div>`:`<div class="panel empty"><div class="empty-icon">${icon('mail')}</div><h2>No inquiries yet.</h2><p>New contact-form submissions will appear here.</p></div>`}</div></section>`);
}
function deleteInquiry(id) { state.inquiries=state.inquiries.filter(i=>i.id!==Number(id)); save(STORAGE.inquiries,state.inquiries); render(); toast('Inquiry removed'); }

function setSearch(value) { clearTimeout(searchTimer); state.filters.search=value; searchTimer=setTimeout(()=>render({ preserveSearch:true }),180); }
function setFilter(key,val) { state.filters[key]=val; render(); }
function resetFilters() { state.filters={ search:'', category:'All', occasion:'All', scent:'All', min:'', max:'', sort:'featured' }; render(); }
function focusShopSearch() { location.hash='#/shop'; document.body.dataset.focusSearch='1'; }
function toggleMobileMenu(){ const button=document.querySelector('.mobile-menu'); const el=document.querySelector('#mobile-panel'); if(!el) return; const open=el.hasAttribute('hidden'); if(open){el.removeAttribute('hidden');}else{el.setAttribute('hidden','');} button?.setAttribute('aria-expanded',String(open)); }

Object.assign(window, { toggleMobileMenu, setSearch, setFilter, resetFilters, focusShopSearch, quickAdd, toggleWishlist, addFromDetail, pickOption, changeQty, removeCart, submitCheckout, copyWhatsApp, submitInquiry, editProduct, toggleAvailability, deleteProduct, addProduct, deleteInquiry });

function render() {
  const { path } = currentRoute();
  let html;
  if (path==='/home' || path==='/') html=homePage();
  else if (path==='/shop') html=shopPage();
  else if (path.startsWith('/product/')) html=productPage(path.split('/')[2]);
  else if (path==='/cart') html=cartPage();
  else if (path==='/checkout') html=checkoutPage();
  else if (path==='/checkout/review') html=reviewPage();
  else if (path==='/wishlist') html=wishlistPage();
  else if (path==='/faq') html=faqPage();
  else if (path==='/contact') html=contactPage();
  else if (path==='/admin/products') html=adminProductsPage();
  else if (path==='/admin/inquiries') html=adminInquiriesPage();
  else html=homePage();
  app.innerHTML = html;
  requestAnimationFrame(() => {
    document.querySelector('#app-content')?.focus();
    if (document.body.dataset.focusSearch === '1') {
      document.body.dataset.focusSearch = '0';
      const input = document.querySelector('#search');
      input?.focus();
    }
  });
}
function update() { document.querySelector('#cart-count')?.replaceChildren(document.createTextNode(String(cartCount()))); document.querySelector('#wish-count')?.replaceChildren(document.createTextNode(String(state.wishlist.length))); }
window.addEventListener('hashchange', render);
render();
