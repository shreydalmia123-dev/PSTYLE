/* ============================================================
   PSTYLE — site script
   ============================================================ */

// Catalog: pages 2 → 39 of the original portfolio. Each entry
// gets a category for the filter chips. (Categorized by the
// titles' character — pure UX flavor, easy for Pankhuri to retag.)
const catalog = [
  { page: 2,  title: 'Bound by Thought',         cat: 'figurative' },
  { page: 3,  title: 'Unspoken Selves',          cat: 'figurative' },
  { page: 4,  title: 'Inward Stillness',         cat: 'figurative' },
  { page: 5,  title: 'Bent in Flame',            cat: 'figurative' },
  { page: 6,  title: 'Green Muse',               cat: 'figurative' },
  { page: 7,  title: 'Balance of Form and Soul', cat: 'abstract'   },
  { page: 8,  title: 'Golden Pause',             cat: 'abstract'   },
  { page: 9,  title: 'Together Rhythm',          cat: 'figurative' },
  { page: 10, title: 'Still Movement',           cat: 'abstract'   },
  { page: 11, title: 'Moon Dreams',              cat: 'spiritual'  },
  { page: 12, title: 'Village Life',             cat: 'narrative'  },
  { page: 13, title: 'Silent Prayers',           cat: 'spiritual'  },
  { page: 14, title: 'Geometric Grace',          cat: 'abstract'   },
  { page: 15, title: 'Layered Mind',             cat: 'abstract'   },
  { page: 16, title: 'Lotus Flow',               cat: 'spiritual'  },
  { page: 17, title: 'Modern Mosaic',            cat: 'abstract'   },
  { page: 18, title: 'Local Junction',           cat: 'narrative'  },
  { page: 19, title: 'Colour Rhythm',            cat: 'abstract'   },
  { page: 20, title: 'Blue Embrace',             cat: 'figurative' },
  { page: 21, title: 'Pattern Play',             cat: 'abstract'   },
  { page: 22, title: 'Open Sky',                 cat: 'narrative'  },
  { page: 23, title: 'Shadow Balance',           cat: 'abstract'   },
  { page: 24, title: 'Red Horizon',              cat: 'narrative'  },
  { page: 25, title: 'Soft Divide',              cat: 'abstract'   },
  { page: 26, title: 'Inner Flight',             cat: 'spiritual'  },
  { page: 27, title: 'Feather Flow',             cat: 'abstract'   },
  { page: 28, title: 'Golden Silence',           cat: 'spiritual'  },
  { page: 29, title: 'Sacred Bite',              cat: 'spiritual'  },
  { page: 30, title: 'Floral Essence',           cat: 'abstract'   },
  { page: 31, title: 'Dance of Divine Union',    cat: 'spiritual'  },
  { page: 32, title: 'Soulmates in Geometry',    cat: 'abstract'   },
  { page: 33, title: 'Fragments of Connection',  cat: 'abstract'   },
  { page: 34, title: 'Faces of Contrast',        cat: 'figurative' },
  { page: 35, title: 'Melody in Solitude',       cat: 'figurative' },
  { page: 36, title: 'The Infinite Within',      cat: 'spiritual'  },
  { page: 37, title: 'Layers of Identity',       cat: 'abstract'   },
  { page: 38, title: 'Eclipse of Form',          cat: 'abstract'   },
  { page: 39, title: 'Divided Harmony',          cat: 'abstract'   },
];

// Hero rotation — 4 strong covers
const heroRotation = [
  { page: 5,  title: 'Bent in Flame',          medium: 'Acrylic on canvas' },
  { page: 16, title: 'Lotus Flow',             medium: 'Mixed media' },
  { page: 31, title: 'Dance of Divine Union',  medium: 'Mixed media' },
  { page: 11, title: 'Moon Dreams',            medium: 'Acrylic on canvas' },
];

const PHONE = '+919867305756';
const EMAIL = 'pankhurig@hotmail.com';

const imgFor = (page) => `images/catalog/page_${String(page).padStart(2, '0')}.png`;

function buildEnquireLink(title) {
  const subject = encodeURIComponent(`Enquiry: ${title}`);
  const body = encodeURIComponent(
    `Hi Pankhuri,\n\nI'd love to know more about "${title}" — pricing, sizing, the artist, and how to make it mine.\n\nThanks!`
  );
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

// Make first word italic (a tiny editorial touch on titles)
function italicizeFirstWord(s) {
  const m = s.match(/^(\S+)(\s.*)?$/);
  if (!m) return s;
  return `<span class="it">${m[1]}</span>${m[2] || ''}`;
}

// ============================================================
// Hero rotation
// ============================================================
const heroFrame = document.getElementById('heroFrame');
const heroDots  = document.getElementById('heroDots');
const heroTagTitle  = document.getElementById('heroTagTitle');
const heroTagMedium = document.getElementById('heroTagMedium');

heroRotation.forEach((item, i) => {
  const im = document.createElement('img');
  im.src = imgFor(item.page);
  im.alt = item.title;
  im.loading = i === 0 ? 'eager' : 'lazy';
  if (i === 0) im.classList.add('is-active');
  heroFrame.appendChild(im);

  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Show ${item.title}`);
  if (i === 0) dot.classList.add('is-active');
  dot.addEventListener('click', () => setHero(i, true));
  heroDots.appendChild(dot);
});

let heroIdx = 0;
let heroTimer = null;
function setHero(i, manual) {
  heroIdx = (i + heroRotation.length) % heroRotation.length;
  const imgs = heroFrame.querySelectorAll('img');
  const dots = heroDots.querySelectorAll('button');
  imgs.forEach((el, k) => el.classList.toggle('is-active', k === heroIdx));
  dots.forEach((el, k) => el.classList.toggle('is-active', k === heroIdx));
  const it = heroRotation[heroIdx];
  heroTagTitle.textContent = it.title;
  heroTagMedium.textContent = it.medium + ' · Available';
  if (manual) restartHeroTimer();
}
function restartHeroTimer() {
  if (heroTimer) clearInterval(heroTimer);
  heroTimer = setInterval(() => setHero(heroIdx + 1, false), 5200);
}
setHero(0, false);
restartHeroTimer();

// ============================================================
// Catalog grid
// ============================================================
const grid = document.getElementById('catalogGrid');
const visibleEl = document.getElementById('visibleCount');
const totalEl   = document.getElementById('totalCount');

catalog.forEach((item, idx) => {
  const card = document.createElement('div');
  card.className = 'cat-card';
  card.dataset.index = idx;
  card.dataset.cat = item.cat;
  card.innerHTML = `
    <div class="cat-img">
      <img src="${imgFor(item.page)}" alt="${item.title}" loading="lazy"/>
      <div class="cat-img-overlay"><span class="view">View &nbsp; →</span></div>
    </div>
    <div class="cat-meta">
      <div>
        <h3 class="cat-title">${italicizeFirstWord(item.title)}</h3>
        <span class="cat-tag">${item.cat}</span>
      </div>
      <span class="cat-num">№ ${String(idx + 1).padStart(2, '0')}</span>
    </div>
    <a class="cat-enquire" href="${buildEnquireLink(item.title)}" onclick="event.stopPropagation()">Enquire →</a>
  `;
  card.addEventListener('click', () => openLightbox('catalog', idx));
  grid.appendChild(card);
});

totalEl.textContent = String(catalog.length);
visibleEl.textContent = String(catalog.length);

// ============================================================
// Filter chips
// ============================================================
const chips = document.querySelectorAll('.chip');
chips.forEach((c) => {
  c.addEventListener('click', () => {
    chips.forEach((x) => x.classList.remove('is-active'));
    c.classList.add('is-active');
    const f = c.dataset.filter;
    let visible = 0;
    grid.querySelectorAll('.cat-card').forEach((card) => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });
    visibleEl.textContent = String(visible);
  });
});

// ============================================================
// Sold cards → lightbox
// ============================================================
const soldCards = Array.from(document.querySelectorAll('.sold-card'));
const soldData = soldCards.map((c) => ({
  src: c.dataset.img,
  title: c.dataset.title,
  meta: c.dataset.meta,
}));
soldCards.forEach((c, i) => c.addEventListener('click', () => openLightbox('sold', i)));

// ============================================================
// Lightbox
// ============================================================
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbCap = document.getElementById('lightboxCaption');
const lbClose = lb.querySelector('.lightbox-close');
const lbPrev = lb.querySelector('.prev');
const lbNext = lb.querySelector('.next');

let currentSet = 'catalog';
let currentIdx = 0;

function openLightbox(set, idx) {
  currentSet = set;
  currentIdx = idx;
  renderLightbox();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function renderLightbox() {
  if (currentSet === 'catalog') {
    const item = catalog[currentIdx];
    lbImg.src = imgFor(item.page);
    lbImg.alt = item.title;
    lbCap.innerHTML = `${item.title}<span class="meta">№ ${String(currentIdx + 1).padStart(2,'0')} · ${item.cat} · Available · <a href="${buildEnquireLink(item.title)}">Enquire</a></span>`;
  } else {
    const item = soldData[currentIdx];
    lbImg.src = item.src;
    lbImg.alt = item.title;
    lbCap.innerHTML = `${item.title}<span class="meta">${item.meta} · Sold from private collection</span>`;
  }
}
function step(delta) {
  // step within the visible filtered set if we're in catalog mode
  if (currentSet === 'catalog') {
    const visible = Array.from(grid.querySelectorAll('.cat-card:not(.is-hidden)'));
    if (visible.length === 0) return;
    const visibleIndices = visible.map((el) => Number(el.dataset.index));
    let pos = visibleIndices.indexOf(currentIdx);
    if (pos < 0) pos = 0;
    pos = (pos + delta + visibleIndices.length) % visibleIndices.length;
    currentIdx = visibleIndices[pos];
  } else {
    currentIdx = (currentIdx + delta + soldData.length) % soldData.length;
  }
  renderLightbox();
}

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => step(-1));
lbNext.addEventListener('click', () => step(1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
});

// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();
