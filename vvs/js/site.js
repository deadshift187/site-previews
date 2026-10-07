// Shared chrome + helpers for the VVS relaunch mockup.
(function () {
  const C = window.VVS_CATALOG || [];

  // Pieces that would be live for Drop 001. Everything else shows in the Archive.
  const DROP = new Set([
    'vvs-crest-core-14oz-dyed-hoodie', 'vvs-crest-core-dyed-hoodie', 'vvs-crest-core-dyed-hoodie-1',
    'vvs-crest-core-dyed-hoodie-2', 'vvs-crest-core-dyed-hoodie-3', 'vvs-crest-core-dyed-hoodie-4',
    'vvs-crest-core-dyed-hoodie-5', 'vvs-crest-core-black-14oz-hoodie',
    'vvs-tee-black', 'vvs-tee-walnut', 'vvs-tee-cypress', 'vvs-tee-white',
    'vs1-tee-black', 'vs1-tee-emerald', 'vs1-tee-ecru', 'vs2-tee-chocolate', 'vs2-tee-ivy', 'vault-tee-burnt-orange',
    'vvs-snapback-forrest-green', 'vvs-vintage-ny-snapback', 'vvs-snapback-purple', 'vvs-corduroy-snapback-tan', 'vvs-bucket-camo',
    'vvs-1-of-1-hand-dyed-14oz-hoodie-1', 'vvs-1-of-1-vintage-hand-dyed-14oz-hoodie-2', 'vvs-1-of-1-hand-dyed-14oz-hoodie',
    'vvs-1-of-1-bleached-14oz-hoodie', 'vvs-1-of-1-painted-jean-jacket', 'vvs-1-of-1-black-dyed-dress',
    'vvs-1-of-1-bleached-jean-jacket', 'vvs-1-of-1-vintage-hand-dyed-14oz-hoodie-1',
    'crest-crewneck-navy', 'vintage-yankees-starter-pullover', 'vintage-tuskegee-airmen-leather-jacket', 'pepsi-nascar-jacket',
  ]);

  // New pieces shot for the relaunch (not in the old store).
  C.push(
    { handle: 'crest-crewneck-navy', title: 'Crest Crewneck — Navy', grade: 'crest', price: 149,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'], images: ['navy-crewneck-ghost.webp'], new: true, created: '2026-10-07',
      body: 'Heavyweight garment-dyed crewneck. Embroidered crest on the chest, VVS monogram wrist hit on the right cuff.' },
    { handle: 'vintage-yankees-starter-pullover', title: 'Vintage Yankees Starter Pullover', grade: 'vintage', price: 229,
      sizes: ['XL'], images: ['yankees-front.webp', 'yankees-back.webp'], new: true, created: '2026-10-07',
      body: 'Authentic 1990s Starter New York Yankees half-zip hooded pullover. Satin NY back appliqué with honest age patina. American League sleeve patch.' }
  );

  const GRADES = {
    oneofone: { short: '1 of 1', name: 'Flawless', desc: 'Hand-dyed, painted or reconstructed in the Vault. Exactly one exists — never remade.', price: '$199–299' },
    crest:    { short: 'Crest', name: 'Crest Core', desc: 'Heavyweight fleece, embroidered crest and right-cuff wrist hit. Hand-dyed in small batches.', price: '$149–199' },
    vvs:      { short: 'VVS', name: 'Very Very Slight', desc: 'Top-grade blank. Designer weight, embroidered monogram.', price: '$59.99' },
    vs1:      { short: 'VS1', name: 'Very Slight I', desc: 'Premium hand-feel with a relaxed, structured fit.', price: '$54.99' },
    vs2:      { short: 'VS2', name: 'Very Slight II', desc: 'Refined everyday fabric, tailored cut.', price: '$44.99' },
    vault:    { short: 'Vault', name: 'Vault Grade', desc: 'The entry piece. Everyday weight, same embroidery.', price: '$34.99' },
    vintage:  { short: 'Vintage', name: 'Vault Pulled', desc: 'Authentic thrifted pieces, condition-graded by hand.', price: 'Varies' },
    headwear: { short: 'Hats', name: 'Headwear', desc: 'Embroidered snapbacks and buckets. "Los Angeles" across the back.', price: '$29.99–44.99' },
    collab:   { short: 'Collab', name: 'VVS × FOMO', desc: 'Collaboration pieces.', price: 'Varies' },
    finds:    { short: 'Finds', name: 'Vault Finds', desc: 'Collectibles and one-off finds.', price: 'Varies' },
  };

  const DYES = {
    'vvs-crest-core-14oz-dyed-hoodie': ['Clay', '#8a4a26'],
    'vvs-crest-core-dyed-hoodie': ['Tangerine', '#e07a1f'],
    'vvs-crest-core-dyed-hoodie-1': ['Pistachio', '#93a876'],
    'vvs-crest-core-dyed-hoodie-2': ['Coral', '#d6413a'],
    'vvs-crest-core-dyed-hoodie-3': ['Sky Blue', '#4f7cb8'],
    'vvs-crest-core-dyed-hoodie-4': ['Coffee', '#5e4335'],
    'vvs-crest-core-dyed-hoodie-5': ['Graphite', '#55575b'],
    'vvs-crest-core-black-14oz-hoodie': ['Black', '#141414'],
  };

  C.forEach(p => { p.live = DROP.has(p.handle); });

  const money = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
  const img = f => 'assets/products/' + f;

  function displayTitle(p) {
    if (p.grade === 'oneofone') return p.title.replace(/^VVS 1 of 1\s*/i, '').replace(/\s*-\s*\d+$/, '') || p.title;
    if (DYES[p.handle]) return 'Crest Hoodie — ' + DYES[p.handle][0];
    return p.title;
  }

  function card(p) {
    const g = GRADES[p.grade] || {};
    const a = p.images[0] ? `<img loading="lazy" src="${img(p.images[0])}" alt="${displayTitle(p)}">` : '';
    const b = p.images[1] ? `<img loading="lazy" src="${img(p.images[1])}" alt="">` : '';
    const label = p.grade === 'oneofone' ? `No. ${p.no}` : g.short;
    return `<a class="card reveal" href="product.html?p=${p.handle}">
      <div class="card__img">
        <span class="badge ${p.grade === 'oneofone' ? 'badge--gold' : ''}">${label}</span>
        ${p.live ? (p.new ? '<span class="badge badge--sold" style="border-color:#a8762c;color:#a8762c">New</span>' : '') : '<span class="badge badge--sold">Archived</span>'}
        ${a}${b}
      </div>
      <div class="card__meta"><b>${displayTitle(p)}</b><span class="price">${money(p.price)}</span></div>
      <div class="card__sub">${p.grade === 'oneofone' ? '1 of 1 · ' + (p.sizes[0] || 'One size') : g.name}</div>
    </a>`;
  }

  const NAV_L = [['shop.html', 'Shop'], ['shop.html?g=oneofone', '1 of 1'], ['shop.html?g=vintage', 'Vintage'], ['lookbook.html', 'Lookbook']];
  const NAV_R = [['about.html', 'The Vault'], ['shop.html?view=archive', 'Archive'], ['social-kit.html', 'Social Kit']];

  function header() {
    const here = location.pathname.split('/').pop() + location.search;
    const link = ([h, t]) => `<a href="${h}"${here === h ? ' aria-current="page"' : ''}>${t}</a>`;
    return `
    <div class="ticker" role="marquee"><div class="ticker__track">${Array(2).fill(
      ['Drop 001 · The Vault Opens Fri 10.24 · 12PM PST', 'Every piece is graded', 'Free LA delivery over $150', 'Hand-dyed in Downtown Los Angeles']
        .map(s => `<span>${s}</span>`).join('')).join('')}</div></div>
    <header class="site-header">
      <nav class="left">${NAV_L.map(link).join('')}</nav>
      <button class="menu-btn" aria-label="Menu">Menu</button>
      <a class="brandmark" href="index.html" aria-label="VVS Los Angeles home"><img src="assets/brand/crest-bone.png" alt=""><span>VVS LA</span></a>
      <nav class="right">${NAV_R.map(link).join('')}<a class="keep" href="#">Bag<span class="cart-count">0</span></a></nav>
    </header>`;
  }

  function footer() {
    return `
    <footer>
      <div class="foot">
        <div>
          <img src="assets/brand/monogram-gold.png" alt="VVS monogram" style="width:64px;margin-bottom:18px">
          <div class="big">Every piece<br><span class="gold-text">is graded.</span></div>
        </div>
        <div><h4>Shop</h4><ul><li><a href="shop.html?g=oneofone">1 of 1</a></li><li><a href="shop.html?g=crest">Crest Core</a></li><li><a href="shop.html?g=vvs">Graded Tees</a></li><li><a href="shop.html?g=headwear">Headwear</a></li><li><a href="shop.html?g=vintage">Vintage</a></li></ul></div>
        <div><h4>The Vault</h4><ul><li><a href="about.html">Our Story</a></li><li><a href="about.html#grades">The Grading System</a></li><li><a href="shop.html?view=archive">Archive</a></li><li><a href="lookbook.html">Lookbook</a></li></ul></div>
        <div><h4>Visit</h4><ul><li>600 S. Spring St. STE R4</li><li>Los Angeles, CA 90014</li><li>213-716-3404</li><li><a href="https://instagram.com/vintagevaultsupply">@vintagevaultsupply</a></li></ul></div>
      </div>
      <div class="legal"><span>© 2026 Vintage Vault Supply · Los Angeles</span><span>Shipping · Returns · Terms · Privacy</span></div>
    </footer>
    <div class="mock-flag">Mockup — not live</div>`;
  }

  function mountChrome() {
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
  }

  function revealOnScroll() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
  }

  function countdown(el, target) {
    if (!el) return;
    const t = new Date(target).getTime();
    const tick = () => {
      let s = Math.max(0, Math.floor((t - Date.now()) / 1000));
      const d = Math.floor(s / 86400); s %= 86400;
      const h = Math.floor(s / 3600); s %= 3600;
      const m = Math.floor(s / 60); s %= 60;
      el.innerHTML = [['Days', d], ['Hrs', h], ['Min', m], ['Sec', s]]
        .map(([l, v]) => `<div><b>${String(v).padStart(2, '0')}</b><small>${l}</small></div>`).join('');
    };
    tick(); setInterval(tick, 1000);
  }

  window.VVS = { C, GRADES, DYES, card, money, img, displayTitle, mountChrome, revealOnScroll, countdown,
    DROP_DATE: '2026-10-24T12:00:00-07:00' };

  document.addEventListener('DOMContentLoaded', () => { mountChrome(); revealOnScroll(); });
})();
