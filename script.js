/* =============================================
   TASTE PARADISE — JavaScript
   ============================================= */

// ── Navbar Scroll Effect ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ── Mobile Menu Toggle ──
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ── Reservation Popup ──
const reservationOverlay = document.getElementById('reservationOverlay');

function openReservation() {
  reservationOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReservation() {
  reservationOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close popup when clicking outside
reservationOverlay.addEventListener('click', (e) => {
  if (e.target === reservationOverlay) {
    closeReservation();
  }
});

// ── WeChat QR Popup ──
function openWeChatQR() {
  const overlay = document.getElementById('wechatQrOverlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeWeChatQR(e) {
  if (e && e.target !== document.getElementById('wechatQrOverlay')) return;
  closeWeChatQRDirect();
}

function closeWeChatQRDirect() {
  const overlay = document.getElementById('wechatQrOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close any active popup with Escape key — handled globally below

// ── Scroll Reveal Animation ──
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── Parallax Effect ──
const parallaxDivider = document.querySelector('.parallax-divider img');

window.addEventListener('scroll', () => {
  if (parallaxDivider) {
    const scrolled = window.scrollY;
    const rect = parallaxDivider.parentElement.getBoundingClientRect();
    const speed = 0.3;

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const yPos = (rect.top * speed);
      parallaxDivider.style.transform = `translateY(${yPos}px)`;
    }
  }
});

// ── Stat Counter Animation ──
const statNumbers = document.querySelectorAll('.stat-number');
let statAnimated = false;

function animateStats() {
  if (statAnimated) return;

  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent);
    const suffix = stat.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + suffix;
    }, 25);
  });

  statAnimated = true;
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}

// ── Smooth Scroll for Anchor Links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ── WhatsApp Float Show/Hide based on Scroll ──
const whatsappFloat = document.getElementById('whatsappFloat');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    whatsappFloat.style.opacity = '1';
    whatsappFloat.style.transform = 'scale(1)';
  } else {
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.transform = 'scale(0)';
  }
});

// Initial state
whatsappFloat.style.opacity = '0';
whatsappFloat.style.transform = 'scale(0)';
whatsappFloat.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';

// ── Add stagger delay for brand cards ──
document.querySelectorAll('.brand-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.15}s`;
});

// ── Add stagger delay for country pills ──
document.querySelectorAll('.country-pill').forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 0.05}s`;
  pill.style.opacity = '0';
  pill.style.transform = 'translateY(10px)';
});

const countriesGrid = document.querySelector('.countries-grid');
if (countriesGrid) {
  const countriesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.country-pill').forEach((pill, i) => {
          setTimeout(() => {
            pill.style.opacity = '1';
            pill.style.transform = 'translateY(0)';
            pill.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          }, i * 60);
        });
        countriesObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  countriesObserver.observe(countriesGrid);
}

console.log('🏮 Taste Paradise Landing Page initialized');


// ══════════════════════════════════════════════
// GALLERY — Tab Switching
// ══════════════════════════════════════════════
function switchGalleryTab(tab) {
  document.querySelectorAll('.gallery-tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.gallery-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`.gallery-tab[onclick="switchGalleryTab('${tab}')"]`).classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
  
  // Re-apply current language translations to newly visible content
  if (typeof currentLang !== 'undefined') setLanguage(currentLang);
  
  // Scroll to gallery section
  const gallerySection = document.getElementById('gallery');
  if (gallerySection) {
    const navbar = document.getElementById('navbar');
    const navHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = gallerySection.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// ══════════════════════════════════════════════
// GALLERY MODAL — Open/Close Full Gallery
// ══════════════════════════════════════════════
function openFullGallery(category) {
  currentCategory = category || 'interiors';
  currentIndex = 0;
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderLightbox();
}

function closeFullGallery(e) {
  if (e && e.target !== document.getElementById('lightboxOverlay')) return;
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}


// ══════════════════════════════════════════════
// LIGHTBOX
// ══════════════════════════════════════════════
const galleryData = {
  interiors: {
    label: 'Interiors',
    desc: 'Inspired by the elegance of contemporary Chinese design, features sophisticated interiors with refined architectural details and tranquil atmosphere.',
    images: [
      'assets/Gallery/Interiors/Taste Paradise Interiors 1.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 2.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 3.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 4.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 5.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 6.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 7.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 8.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 9.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 10.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 11.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 12.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 13.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 14.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 15.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 16.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 17.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 18.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 19.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 20.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 21.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 22.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 23.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 24.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 25.webp',
      'assets/Gallery/Interiors/Taste Paradise Interiors 27.webp'
    ]
  },
  wedding: {
    label: 'Weddings',
    desc: 'Celebrate meaningful moments with refined dining, elegant spaces, and warm hospitality curated for weddings and intimate engagement celebrations.',
    images: [
      'assets/Gallery/Weddings/Taste Paradise Weddings 1.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 2.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 3.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 4.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 5.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 6.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 7.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 8.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 9.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 10.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 11.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 12.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 13.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 14.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 15.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 16.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 17.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 18.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 19.webp',
      'assets/Gallery/Weddings/Taste Paradise Weddings 20.webp'
    ]
  },
  birthday: {
    label: 'Celebrations',
    desc: 'From birthdays to family gatherings, enjoy memorable occasions complemented by exceptional cuisine and a welcoming atmosphere.',
    images: [
      'assets/Gallery/Celebrations/Taste Paradise Celebrations 1.webp',
      'assets/Gallery/Celebrations/Taste Paradise Celebrations 2.webp',
      'assets/Gallery/Celebrations/Taste Paradise Celebrations 3.webp',
      'assets/Gallery/Celebrations/Taste Paradise Celebrations 4.webp',
      'assets/Gallery/Celebrations/Taste Paradise Celebrations 5.webp',
      'assets/Gallery/Celebrations/Taste Paradise Celebrations 6.webp'
    ]
  },
  gathering: {
    label: 'Events',
    desc: 'Host social and corporate occasions with curated dining experiences, attentive service, and comfortable spaces designed for every gathering.',
    images: [
      'assets/Gallery/Events/Taste Paradise Events 1.webp',
      'assets/Gallery/Events/Taste Paradise Events 2.webp',
      'assets/Gallery/Events/Taste Paradise Events 3.webp',
      'assets/Gallery/Events/Taste Paradise Events 4.webp',
      'assets/Gallery/Events/Taste Paradise Events 5.webp',
      'assets/Gallery/Events/Taste Paradise Events 6.webp',
      'assets/Gallery/Events/Taste Paradise Events 7.webp',
      'assets/Gallery/Events/Taste Paradise Events 8.webp',
      'assets/Gallery/Events/Taste Paradise Events 9.webp',
      'assets/Gallery/Events/Taste Paradise Events 10.webp',
      'assets/Gallery/Events/Taste Paradise Events 11.webp',
      'assets/Gallery/Events/Taste Paradise Events 12.webp',
      'assets/Gallery/Events/Taste Paradise Events 13.webp',
      'assets/Gallery/Events/Taste Paradise Events 14.webp',
      'assets/Gallery/Events/Taste Paradise Events 15.webp',
      'assets/Gallery/Events/Taste Paradise Events 16.webp',
      'assets/Gallery/Events/Taste Paradise Events 17.webp',
      'assets/Gallery/Events/Taste Paradise Events 18.webp',
      'assets/Gallery/Events/Taste Paradise Events 19.webp',
      'assets/Gallery/Events/Taste Paradise Events 20.webp',
      'assets/Gallery/Events/Taste Paradise Events 21.webp',
      'assets/Gallery/Events/Taste Paradise Events 22.webp'
    ]
  }
};

// Detect if we're in /en/ subfolder and prefix paths accordingly
const isEnPage = window.location.pathname.includes('/en');
function imgPath(p) {
  return isEnPage ? '../' + p : p;
}

let currentCategory = 'interiors';
let currentIndex = 0;

function openLightbox(category, index) {
  currentCategory = category;
  currentIndex = index;
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderLightbox();
}

function renderLightbox() {
  const data = galleryData[currentCategory];
  const img = document.getElementById('lightboxImg');
  const label = document.getElementById('lightboxCategoryLabel');
  const desc = document.getElementById('lightboxDesc');
  const thumbs = document.getElementById('lightboxThumbnails');

  label.textContent = data.label;
  desc.textContent = data.desc;
  img.src = imgPath(data.images[currentIndex]);
  img.alt = data.label;

  thumbs.innerHTML = '';
  data.images.forEach((src, i) => {
    const t = document.createElement('img');
    t.src = imgPath(src);
    t.alt = data.label;
    t.className = 'lightbox-thumb' + (i === currentIndex ? ' active' : '');
    t.onclick = () => { currentIndex = i; renderLightbox(); };
    thumbs.appendChild(t);
  });
}

function lightboxNav(dir) {
  const total = galleryData[currentCategory].images.length;
  currentIndex = (currentIndex + dir + total) % total;
  renderLightbox();
}

function closeLightbox() {
  document.getElementById('lightboxOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeLightboxOnBg(e) {
  if (e.target === document.getElementById('lightboxOverlay')) closeLightbox();
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('lightboxOverlay').classList.contains('active')) { closeLightbox(); return; }
  if (document.getElementById('menuPdfOverlay').classList.contains('active')) { closeMenuPdf(); return; }
  if (document.getElementById('wechatQrOverlay') && document.getElementById('wechatQrOverlay').classList.contains('active')) { closeWeChatQRDirect(); return; }
  if (reservationOverlay.classList.contains('active')) { closeReservation(); return; }
});


// ══════════════════════════════════════════════
// MENU PDF POPUP
// ══════════════════════════════════════════════
function openMenuPdf(url) {
  const overlay = document.getElementById('menuPdfOverlay');
  document.getElementById('menuPdfFrame').src = url;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenuPdf(e) {
  if (e && e.target !== document.getElementById('menuPdfOverlay') && e.type === 'click') {
    if (!e.target.classList.contains('close-btn') && e.target.closest('.menu-pdf-popup')) return;
  }
  const overlay = document.getElementById('menuPdfOverlay');
  overlay.classList.remove('active');
  document.getElementById('menuPdfFrame').src = '';
  document.body.style.overflow = '';
}

// Arrow key navigation for lightbox
document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft') lightboxNav(-1);
});


// ══════════════════════════════════════════════
// LANGUAGE DROPDOWN TOGGLE
// ══════════════════════════════════════════════
const langDropdown = document.getElementById('langDropdown');
const langDropdownBtn = document.getElementById('langDropdownBtn');

if (langDropdownBtn) {
  langDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
    langDropdownBtn.setAttribute('aria-expanded', langDropdown.classList.contains('open'));
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
    langDropdownBtn.setAttribute('aria-expanded', 'false');
  });
}


// ══════════════════════════════════════════════
// LANGUAGE SWITCHER — Translations
// ══════════════════════════════════════════════
const translations = {
  en: {
    nav_about: 'About', nav_gallery: 'Gallery', nav_menu: 'Menu', nav_location: 'Location', nav_reserve: 'Reserve',
    gallery_subtitle: '', gallery_title: 'Gallery',
    gallery_tab_interiors: 'Interiors', gallery_tab_wedding: 'Weddings',
    gallery_tab_birthday: 'Celebrations', gallery_tab_gathering: 'Events',
    gallery_see_more: 'SEE MORE PHOTOS',
    gallery_desc_interiors: 'Inspired by the elegance of contemporary Chinese design, features sophisticated interiors with refined architectural details and tranquil atmosphere. Every element is thoughtfully designed to create a comfortable and elevated dining experience for every occasion.',
    gallery_desc_wedding: 'Celebrate life\'s most meaningful moments with an elegant Chinese dining experience, complemented by warm hospitality and atmosphere, designed to honor tradition while creating memorable experiences with family and loved ones.',
    gallery_desc_birthday: 'Celebrate unforgettable birthday moments with exceptional dishes, joyful gatherings, elegant ambiance, and attentive service to make birthdays feel truly special.',
    gallery_desc_gathering: 'From intimate family gatherings to professional corporate events, enjoy comfortable spaces, curated menus, attentive service, and a sophisticated atmosphere designed to bring people together over exceptional dining experiences.',
    menu_subtitle: 'TASTE PARADISE MENU', menu_title: 'Menu',
    menu_chef_title: "Chef's Recommendation Menu", menu_chef_tagline: 'Exquisitely prepared creations with a touch of sophistication',
    menu_chef_desc: 'Discover signature creations personally selected by our chefs, highlighting seasonal ingredients, distinctive flavors, and the artistry behind every dish.',
    menu_alacarte_title: 'Selected À la Carte Menu', menu_alacarte_tagline: 'Curated selections from our finest dishes',
    menu_alacarte_desc: 'Explore a refined selection of individually crafted specialties, from premium seafood to classic Chinese favorites, thoughtfully prepared with balanced flavors and elegant presentation.',
    menu_set_title: 'Set Menu', menu_set_tagline: 'Complete dining experience for every occasion',
    menu_set_desc: 'Carefully curated selections designed for sharing, featuring a harmonious combination of signature dishes ideal for family gatherings and special celebrations.',
    menu_dimsum_title: 'Dim Sum Menu', menu_dimsum_tagline: 'Traditional Cantonese Dim Sum delicately handcrafted to perfection',
    menu_dimsum_desc: 'Delight in an exquisite variety of handcrafted dim sum, delicately prepared and steamed to perfection for an authentic Cantonese dining experience.',
    menu_see_btn: 'SEE MENU',
    menu_chef_btn: 'SEE MENU',
    menu_alacarte_btn: 'SEE MENU',
    menu_set_btn: 'SEE MENU',
    menu_dimsum_btn: 'SEE MENU',
    hero_badge: 'Taste Paradise Plaza Indonesia, Jakarta',
    chinese_title: 'Plaza Indonesia, Jakarta',
    hero_title: 'Taste Paradise',
    hero_p: 'Enjoy the essence of authentic Cantonese cuisine in an elegant and serene atmosphere, featuring the finest ingredients and attentive service. We offer a unique dining experience for every precious moment, from business dinners and family gatherings to your special celebrations.',
    btn_reserve: '🥂 Reserve Now', btn_explore: 'Explore More ↓',
    about_subtitle: 'About Us',
    about_title: 'Taste Paradise Jakarta',
    about_tagline: 'Exquisitely prepared creations with a touch of sophistication',
    about_p1: 'Taste Paradise Jakarta is an award-winning contemporary Chinese dining destination that has been serving guests for over a decade, blending refined traditional cuisine with modern sophistication. Inspired by the elegance of classic Chinese culture and landscape artistry, Taste Paradise Jakarta offers a serene dining atmosphere with luxurious interiors, graceful architectural details, and warm hospitality.',
    about_p2: 'Known for its exquisitely crafted creations, Taste Paradise Jakarta presents authentic Chinese flavors reimagined with a contemporary touch by our experienced chefs. Every dish is thoughtfully prepared to deliver not only exceptional taste, but also a complete sensory dining experience.',
    about_p3: 'Here, dining is more than a meal — it is a journey of tradition, artistry, and modern elegance in every detail.',
    brands_subtitle: 'Paradise Group Premium Brands',
    brands_title: 'Premium Culinary Portfolio — Taste Paradise, Beauty in The Pot & Paradise Dynasty',
    location_subtitle: '', location_title: 'Visit Us',
    addr_label: 'Location',
    addr_full: 'Plaza Indonesia, South Gate, Level 4, Jl. M.H. Thamrin Kav. 28-30, Menteng, Jakarta Pusat 10350', hours_label: 'Opening Hours', hours_weekday: 'Monday - Friday', hours_weekday_val: 'Lunch: 11 AM - 3 PM | Dinner: 6 PM - 10 PM', hours_weekend: 'Saturday - Sunday & Public Holiday', hours_weekend_val: 'Lunch: 10 AM - 3 PM | Dinner: 6 PM - 10 PM',
    reserve_label: 'Reservation', reserve_phone_label: 'Reservation by Phone Call', reserve_wa_label: 'Reservation by WhatsApp', reserve_wechat_label: 'Reservation by WeChat',
    ig_label: 'Instagram',
    reserve_wa_btn: '🥢 Reserve via WhatsApp',
    wechat_popup_title: 'Scan to Add WeChat',
    wechat_popup_instruction: 'Open WeChat → Scan QR Code to connect with us',
    footer_desc: '<strong>Taste Paradise Jakarta</strong> — a symbol of elegance in Chinese fine dining. A luxurious and sophisticated Chinese culinary experience at Plaza Indonesia, Jakarta.',
    footer_brands: 'Brands', footer_menus: 'Menus', footer_info: 'Information',
    footer_visit: 'Visit Us', footer_open_maps: 'Open Google Maps', footer_hours: 'Opening Hours',
    footer_hours_weekday_short: '11 AM - 3 PM<br>6 PM - 10 PM', footer_hours_weekend_short: '10 AM - 3 PM<br>6 PM - 10 PM',
    footer_links: 'Explore', footer_reserve_kicker: 'Reservations', footer_reserve_title: 'Plan your next dining moment at Taste Paradise',
    footer_call: 'Call', footer_whatsapp: 'WhatsApp', footer_rights: '© 2026 Taste Paradise Jakarta. All rights reserved.', footer_group: 'Part of Paradise Group Indonesia',
    popup_title: 'Reserve a Table at Taste Paradise Jakarta',
    popup_addr_name: 'Location',
    popup_addr_street: 'Plaza Indonesia  |  South Gate, Level 4<br>Jl. M.H. Thamrin Kav. 28-30, Menteng, Jakarta Pusat 10350',
    popup_subtitle: 'Book your table at <strong>Taste Paradise Plaza Indonesia</strong> for an unforgettable Chinese fine dining experience in Jakarta.',
    popup_hours: 'Daily 11:00 AM - 10:00 PM (WIB)',
    popup_btn: 'Reserve via WhatsApp',
    popup_note: '*Reservation message template will be auto-filled'
  },
  id: {
    nav_about: 'Tentang', nav_gallery: 'Galeri', nav_menu: 'Menu', nav_location: 'Lokasi', nav_reserve: 'Reservasi',
    gallery_subtitle: '', gallery_title: 'Gallery',
    gallery_tab_interiors: 'Interior', gallery_tab_wedding: 'Pernikahan',
    gallery_tab_birthday: 'Perayaan', gallery_tab_gathering: 'Acara',
    gallery_see_more: 'LIHAT LEBIH BANYAK FOTO',
    gallery_desc_interiors: 'Terinspirasi dari keanggunan desain Tiongkok kontemporer, menampilkan interior yang canggih dengan detail arsitektur yang halus dan suasana yang tenang. Setiap elemen dirancang dengan cermat untuk menciptakan pengalaman bersantap yang nyaman dan elegan untuk setiap kesempatan.',
    gallery_desc_wedding: 'Rayakan momen paling bermakna dalam hidup dengan pengalaman Chinese dining yang elegan, dilengkapi dengan keramahan dan suasana yang hangat, dirancang untuk menghormati tradisi sambil menciptakan kenangan indah bersama keluarga dan orang-orang terkasih.',
    gallery_desc_birthday: 'Rayakan momen ulang tahun yang tak terlupakan dengan hidangan istimewa, suasana yang penuh keceriaan, dan pelayanan yang penuh perhatian untuk membuat hari spesial terasa benar-benar istimewa.',
    gallery_desc_gathering: 'Dari pertemuan keluarga yang intim hingga acara korporat profesional, nikmati ruangan yang nyaman, menu yang dikurasi, pelayanan penuh perhatian, dan suasana yang elegan untuk menyatukan semua orang dalam pengalaman bersantap yang luar biasa.',
    menu_subtitle: 'MENU TASTE PARADISE', menu_title: 'Menu',
    menu_chef_title: 'Menu Rekomendasi Chef', menu_chef_tagline: 'Kreasi yang disiapkan dengan keanggunan dan kecanggihan',
    menu_chef_desc: 'Temukan kreasi signature yang dipilih langsung oleh chef kami, menonjolkan bahan-bahan musiman, cita rasa khas, dan keahlian di balik setiap hidangan.',
    menu_alacarte_title: 'Menu À la Carte Pilihan', menu_alacarte_tagline: 'Pilihan terkurasi dari hidangan terbaik kami',
    menu_alacarte_desc: 'Jelajahi pilihan spesialitas yang dibuat secara individual, dari seafood premium hingga favorit Tiongkok klasik, disiapkan dengan cita rasa seimbang dan penyajian elegan.',
    menu_set_title: 'Set Menu', menu_set_tagline: 'Pengalaman bersantap lengkap untuk setiap kesempatan',
    menu_set_desc: 'Pilihan yang dikurasi dengan cermat untuk berbagi, menampilkan kombinasi harmonis hidangan signature yang ideal untuk pertemuan keluarga dan perayaan spesial.',
    menu_dimsum_title: 'Dim Sum Menu', menu_dimsum_tagline: 'Dim sum Cantonese tradisional yang dibuat dengan tangan dan dikukus hingga sempurna',
    menu_dimsum_desc: 'Nikmati berbagai dim sum buatan tangan yang lezat, disiapkan dengan teliti dan dikukus hingga sempurna untuk pengalaman bersantap Cantonese yang autentik.',
    menu_see_btn: 'LIHAT MENU',
    menu_chef_btn: 'LIHAT MENU',
    menu_alacarte_btn: 'LIHAT MENU',
    menu_set_btn: 'LIHAT MENU',
    menu_dimsum_btn: 'LIHAT MENU',
    hero_badge: 'Taste Paradise Plaza Indonesia, Jakarta',
    chinese_title: 'Plaza Indonesia, Jakarta',
    hero_title: 'Taste Paradise',
    hero_p: 'Nikmati esensi masakan autentik Kanton dalam suasana yang elegan dan tenang, dengan bahan-bahan pilihan terbaik dan layanan penuh perhatian. Kami menghadirkan pengalaman bersantap istimewa untuk setiap momen berharga, jamuan bisnis, kumpul keluarga, hingga perayaan spesial Anda.',
    btn_reserve: '🥂 Reservasi Sekarang', btn_explore: 'Jelajahi Lebih Lanjut ↓',
    about_subtitle: 'Tentang Kami',
    about_title: 'Taste Paradise Jakarta',
    about_tagline: 'Kreasi yang disiapkan dengan keanggunan dan kecanggihan',
    about_p1: 'Taste Paradise Jakarta adalah destinasi Chinese dining kontemporer pemenang penghargaan yang telah melayani tamu selama lebih dari satu dekade, memadukan masakan tradisional yang halus dengan kecanggihan modern. Terinspirasi dari keanggunan budaya Tiongkok klasik dan seni lanskap, Taste Paradise menawarkan suasana bersantap yang tenang dengan interior mewah, detail arsitektur yang anggun, dan keramahan yang hangat.',
    about_p2: 'Dikenal dengan kreasi yang dibuat dengan indah, Taste Paradise menyajikan cita rasa Tiongkok autentik yang diimajinasikan ulang dengan sentuhan kontemporer oleh chef berpengalaman kami. Setiap hidangan disiapkan dengan penuh perhatian untuk memberikan tidak hanya rasa yang luar biasa, tetapi juga pengalaman bersantap sensorik yang lengkap.',
    about_p3: 'Di sini, bersantap lebih dari sekadar makan — ini adalah perjalanan tradisi, seni, dan keanggunan modern dalam setiap detail.',
    brands_subtitle: 'Brand Unggulan Paradise Group',
    brands_title: 'Portofolio Kuliner Premium — Taste Paradise, Beauty in The Pot & Paradise Dynasty',
    location_subtitle: '', location_title: 'Visit Us',
    addr_label: 'Lokasi',
    addr_full: 'Plaza Indonesia, South Gate, Level 4, Jl. M.H. Thamrin Kav. 28-30, Menteng, Jakarta Pusat 10350', hours_label: 'Jam Operasional', hours_weekday: 'Senin - Jumat', hours_weekday_val: 'Makan Siang: 11.00 - 15.00 | Makan Malam: 18.00 - 22.00', hours_weekend: 'Sabtu - Minggu & Public Holiday', hours_weekend_val: 'Makan Siang: 10.00 - 15.00 | Makan Malam: 18.00 - 22.00',
    reserve_label: 'Reservasi Taste Paradise', reserve_phone_label: 'Reservasi via Telepon', reserve_wa_label: 'Reservasi via WhatsApp', reserve_wechat_label: 'Reservasi via WeChat',
    ig_label: 'Instagram',
    reserve_wa_btn: '🥢 Reservasi via WhatsApp',
    wechat_popup_title: 'Scan untuk Tambah WeChat',
    wechat_popup_instruction: 'Buka WeChat → Scan QR Code untuk terhubung dengan kami',
    footer_desc: '<strong>Taste Paradise Jakarta</strong> hadir sebagai simbol keanggunan dalam Chinese fine dining. Pengalaman kuliner Tiongkok yang mewah dan berkelas di Plaza Indonesia, Jakarta.',
    footer_brands: 'Brand', footer_menus: 'Menu', footer_info: 'Info',
    footer_visit: 'Kunjungi Kami', footer_open_maps: 'Buka Google Maps', footer_hours: 'Jam Buka',
    footer_hours_weekday_short: '11.00 - 15.00<br>18.00 - 22.00', footer_hours_weekend_short: '10.00 - 15.00<br>18.00 - 22.00',
    footer_links: 'Jelajahi', footer_reserve_kicker: 'Reservasi', footer_reserve_title: 'Siapkan momen bersantap berikutnya di Taste Paradise',
    footer_call: 'Telepon', footer_whatsapp: 'WhatsApp', footer_rights: '© 2026 Taste Paradise Jakarta. Seluruh hak cipta dilindungi.', footer_group: 'Bagian dari Paradise Group Indonesia',
    popup_title: 'Reservasi Meja Taste Paradise Jakarta',
    popup_addr_name: 'Lokasi',
    popup_addr_street: 'Plaza Indonesia  |  South Gate, Level 4<br>Jl. M.H. Thamrin Kav. 28-30, Menteng, Jakarta Pusat 10350',
    popup_subtitle: 'Pesan meja Anda di <strong>Taste Paradise Plaza Indonesia</strong> untuk pengalaman Chinese fine dining yang tak terlupakan di Jakarta.',
    popup_hours: 'Setiap Hari 11:00 - 22:00 WIB',
    popup_btn: 'Reservasi via WhatsApp',
    popup_note: '*Template pesan reservasi akan otomatis terisi'
  },
  zh: {
    nav_about: '关于', nav_gallery: '图库', nav_menu: '菜单', nav_location: '位置', nav_reserve: '预订',
    gallery_subtitle: '', gallery_title: '图库',
    gallery_tab_interiors: '雅致空间', gallery_tab_wedding: '婚宴',
    gallery_tab_birthday: '寿宴庆典', gallery_tab_gathering: '商务宴会',
    gallery_see_more: '查看更多图片',
    gallery_desc_interiors: '现代东方美学与从容雅致的空间格调，在金属、木饰与柔和光影之间相互映衬。无论开放用餐区或私密包厢，每一处细节皆为商务宴请、亲友雅聚与重要时刻而悉心营造。',
    gallery_desc_wedding: '以精致粤馔、典雅空间与细致服务，成就庄重而温馨的婚宴体验。从订婚宴、婚前家宴至婚礼庆典，我们悉心照料每一处细节，让人生的重要仪式更显圆满难忘。',
    gallery_desc_birthday: '为人生的重要时刻隆重庆贺。无论寿宴、生日、纪念日或亲友喜宴，味之楼·雅加达以精致粤馔、典雅空间与细致服务，为每一场欢聚呈献体面而难忘的庆典体验。',
    gallery_desc_gathering: '从董事宴请、商务招待与公司聚餐，到品牌发布及企业活动，我们以灵活的宴会安排、考究菜品与专业服务，协助企业从容款待宾客，彰显品牌格调。',
    menu_subtitle: '味之楼菜单', menu_title: '菜单',
    menu_chef_title: '厨师推荐', menu_chef_tagline: '演绎经典粤馔精髓',
    menu_chef_desc: '由资深粤菜厨师团队匠心主理，严选上乘食材，恪守传统技艺，于火候、刀工与调味之间精益求精，呈献味之楼·雅加达的经典风味。',
    menu_alacarte_title: '精选招牌菜', menu_alacarte_tagline: '匠心呈献经典粤菜',
    menu_alacarte_desc: '汇聚味之楼·雅加达历久弥新的招牌佳肴，以优质食材结合精湛粤式烹饪技艺，细致呈现粤菜清、鲜、嫩、雅的独特风韵。',
    menu_set_title: '席间臻选', menu_set_tagline: '一席荟萃，粤味相映',
    menu_set_desc: '依时令考量菜式组合，兼顾浓淡、荤素与烹调节奏，让各味彼此衬托，于一席之间展现粤菜层次分明、和谐有致的风韵。',
    menu_dimsum_title: '点心菜单', menu_dimsum_tagline: '传统港式点心，每日手工匠制',
    menu_dimsum_desc: '承袭传统港式点心工艺，从经典蒸点、精巧炸点到特色小吃，坚持每日新鲜制作。一笼一味，细致呈现广式点心的玲珑滋味。',
    menu_see_btn: '探索菜单',
    menu_chef_btn: '了解更多',
    menu_alacarte_btn: '探索菜单',
    menu_set_btn: '探索套餐',
    menu_dimsum_btn: '探索菜单',
    hero_badge: '味之楼 · 印尼广场，雅加达',
    chinese_title: '印尼广场·雅加达',
    hero_title: '味之楼 · 雅加达',
    hero_p: '欢迎莅临味之楼·雅加达，于典雅从容的空间中，品鉴粤菜的精髓与时代风华。我们甄选上乘食材，恪守粤菜技艺，并以细致周到的服务，为商务宴请、亲友雅聚及重要庆典，呈献独具格调的餐饮体验。',
    btn_reserve: '🥂 立即预订', btn_explore: '探索更多 ↓',
    about_subtitle: '关于我们',
    about_title: '味之楼 · 雅加达',
    about_tagline: '高端粤式中餐体验',
    about_p1: '味之楼是一家致力于提供高端粤式餐饮体验的餐厅。十多年来，我们不断追求卓越，以精致的菜品和典雅的用餐环境，为每位顾客带来难忘的美食体验。',
    about_p2: '我们的厨师团队精选优质食材，结合粤菜传统烹饪技巧与现代创意，呈现出色香味俱全的佳肴。无论是商务宴请、家庭聚会，还是特别节日庆祝，我们都希望为您提供最真诚的服务与最精致的料理。',
    about_p3: '在味之楼，每一个细节都经过精心设计，只为让每一位宾客感受到宾至如归的温暖。',
    brands_title: '高端餐饮组合 — 品味天堂、美丽在锅中 & 天堂王朝',
    location_subtitle: '', location_title: '联系我们',
    addr_label: '地址',
    addr_full: '印度尼西亚广场, 南门, 4楼, Jl. M.H. Thamrin Kav. 28-30, Menteng, 雅加达中部 10350', hours_label: '营业时间', hours_weekday: '周一至周五', hours_weekday_val: '午餐：上午11:00 - 下午3:00 | 晚餐：下午5:00 - 晚上10:00', hours_weekend: '周六至周日', hours_weekend_val: '午餐：上午11:00 - 下午3:00 | 晚餐：下午5:00 - 晚上10:00',
    reserve_label: '预订', reserve_phone_label: '通过电话预订', reserve_wa_label: '通过WhatsApp预约', reserve_wechat_label: '通过微信预约',
    ig_label: 'Instagram',
    reserve_wa_btn: '🥢 通过WhatsApp预订',
    wechat_popup_title: '扫码添加微信',
    wechat_popup_instruction: '打开微信 → 扫描二维码与我们联系',
    footer_desc: '<strong>味之楼·雅加达</strong><br>高端粤式中餐体验<br><br>我们致力于为顾客提供高品质、优雅且难忘的粤式美食体验。',
    footer_brands: '品牌', footer_menus: '菜单', footer_info: '信息',
    footer_visit: '联系我们', footer_open_maps: '打开 Google Maps', footer_hours: '营业时间',
    footer_hours_weekday_short: '上午11:00 - 下午3:00<br>下午5:00 - 晚上10:00', footer_hours_weekend_short: '上午11:00 - 下午3:00<br>下午5:00 - 晚上10:00',
    footer_links: '关于', footer_reserve_kicker: '预订', footer_reserve_title: '在味之楼规划您的下一次用餐时刻',
    footer_call: '电话', footer_whatsapp: 'WhatsApp', footer_rights: '© 2026 Taste Paradise Jakarta. 版权所有。', footer_group: '隶属于 Paradise Group Indonesia',
    popup_title: '预订味之楼 · 雅加达餐桌',
    popup_addr_name: '地点',
    popup_addr_street: '印度尼西亚广场  |  南门, 4楼<br>Jl. M.H. Thamrin Kav. 28-30, Menteng, 雅加达中部 10350',
    popup_subtitle: '在<strong>味之楼印尼广场</strong>预订您的餐桌，享受难忘的粤式中餐体验。',
    popup_hours: '每日上午11:00 - 晚上10:00（西印尼时间）',
    popup_btn: '通过WhatsApp预约',
    popup_note: '*预订消息模板将自动填写'
  },
  ja: {
    nav_about: '概要', nav_gallery: 'ギャラリー', nav_menu: 'メニュー', nav_location: '場所', nav_reserve: '予約',
    gallery_subtitle: '', gallery_title: 'Gallery',
    gallery_tab_interiors: 'インテリア', gallery_tab_wedding: 'プライベート',
    gallery_tab_birthday: '美食', gallery_tab_gathering: 'イベント',
    gallery_see_more: '写真をもっと見る',
    gallery_desc_interiors: 'Taste Paradise Jakartaの室内デザインは、モダン・オリエンタル・ラグジュアリーをテーマとし、ゴールドメタル、ダークウッドの装飾、そして温かみのある照明効果を融合させ、高品質で典雅な雰囲気を醸し出しております。空間レイアウトは対称性と奥行きを重視し、入口は格調ある佇まいを持ち、ダイニングエリアは丸テーブルを中心として中国式の団欒文化を体現しております。個室とソファ席はプライベートで快適な設計となっており、全体的なスタイルは国際的かつ洗練されており、ハイエンドなビジネス接待や社交宴会に最適な場所です。',
    gallery_desc_wedding: '温かいおもてなしと雰囲気に彩られた優雅な中国料理体験で、人生の最も大切な瞬間を祝いましょう。伝統を重んじながら、家族や大切な方々と忘れられない思い出を作ります。',
    gallery_desc_birthday: '特別な料理、喜びあふれる集い、エレガントな雰囲気、そして心のこもったサービスで、忘れられない特別な瞬間をお祝いします。',
    gallery_desc_gathering: '親密な家族の集いからプロフェッショナルな企業イベントまで、快適な空間、厳選されたメニュー、細やかなサービス、そして洗練された雰囲気で、Taste Paradise Jakartaの素晴らしい食事体験をお楽しみください。',
    menu_subtitle: 'Taste Paradise Jakarta メニュー', menu_title: 'Menu',
    menu_chef_title: '広東焼き盛り合わせ', menu_chef_tagline: '定番広東料理の看板メニュー',
    menu_chef_desc: '厳選された数種類の広東焼き物の組み合わせに、新鮮な付け合わせと特製ソースを添え、豊かな層をなす味わいをお楽しみいただけます。',
    menu_alacarte_title: '厳選看板料理', menu_alacarte_tagline: 'シェフ推薦の広東クラシック料理',
    menu_alacarte_desc: '優質な食材と伝統的な広東式調理技法を用い、芳醇な香りと柔らかく絶妙な口当たりの看板料理をご提供いたします。',
    menu_set_title: 'やわらか食', menu_set_tagline: 'ご高齢の方やお子様に適した健康的なお食事',
    menu_set_desc: 'ご高齢の方やお子様のために特別に設計された栄養豊かなお食事で、口当たりが柔らかく噛みやすい仕上がりながら、豊かな風味をそのままお楽しみいただけます。',
    menu_dimsum_title: '点心メニュー', menu_dimsum_tagline: '伝統的な香港式点心、豊富な種類',
    menu_dimsum_desc: '蒸し点心、揚げ点心、特色小吃など多彩なメニューを毎日新鮮にご用意しており、ご家族のお食事やご友人との集いに最適です。',
    menu_see_btn: '詳しく見る',
    menu_chef_btn: '詳しく見る',
    menu_alacarte_btn: '詳しく見る',
    menu_set_btn: '詳しく見る',
    menu_dimsum_btn: '詳しく見る',
    hero_badge: 'Taste Paradise Jakarta　プラザ・インドネシア、ジャカルタ',
    chinese_title: 'プラザ・インドネシア、ジャカルタ',
    hero_title: 'Taste Paradise',
    hero_p: '「厳選された最高級の食材と行き届いたサービスのもと、エレガントで落ち着いた雰囲気の中で、本格的な広東料理の真髄をお楽しみください。大切なひととき、ビジネスでの会食、ご家族との集まり、そして特別な記念日まで、あらゆる場面で特別なダイニング体験をご提供いたします。」',

    btn_reserve: '🥂 今すぐ予約', btn_explore: 'もっと探る ↓',
    about_subtitle: '私たちについて',
    about_title: 'Taste Paradise Jakarta ・ ジャカルタ',
    about_tagline: '洗練されたタッチで精巧に準備された創作料理',
    about_p1: 'Taste Paradise Jakartaは、高品質な広東式ダイニング体験の提供に専念するレストランです。10年以上にわたり、私たちは卓越性を追い求め続け、精緻な料理と品格ある食事環境を通じて、すべてのお客様に忘れがたい美食体験をお届けしてまいりました。',
    about_p2: '私たちのシェフチームは厳選された優質な食材を使用し、広東料理の伝統的な調理技法と現代的な創意を融合させ、色・香・味が三位一体となった逸品をご提供いたします。ビジネスの接待、ご家族のお集まり、特別な記念日のお祝いなど、あらゆる場面でご利用いただけます。',
    about_p3: 'Taste Paradise Jakartaでは、すべてのお客様がまるで我が家にいるような温かさを感じていただけるよう、あらゆる細部に至るまで丁寧に設計されております。',
    brands_subtitle: 'パラダイス・グループ プレミアムブランド',
    brands_title: 'プレミアム料理ポートフォリオ — テイスト・パラダイス、ビューティー・イン・ザ・ポット & パラダイス・ダイナスティ',
    location_subtitle: '', location_title: 'Visit Us',
    addr_label: '住所',
    addr_full: 'プラザ・インドネシア, サウスゲート, 4階, Jl. M.H. Thamrin Kav. 28-30, Menteng, 中央ジャカルタ 10350', hours_label: '営業時間', hours_weekday: '月曜日～金曜日', hours_weekday_val: '午前11:00 - 午後3:00　午後6:00 - 午後10:00', hours_weekend: '土曜日・日曜日', hours_weekend_val: '午前11:00 - 午後3:00　午後6:00 - 午後10:00',
    reserve_label: '予約', reserve_phone_label: '電話で予約', reserve_wa_label: 'WhatsAppでご予約ください', reserve_wechat_label: 'WeChatで予約',
    ig_label: 'Instagram',
    reserve_wa_btn: '🥢 WhatsAppで予約',
    wechat_popup_title: 'スキャンしてWeChat追加',
    wechat_popup_instruction: 'WeChatを開く → QRコードをスキャンしてご連絡ください',
    footer_desc: '<strong>Taste Paradise Jakarta . ジャカルタ</strong>　高品質な広東式中国料理体験。私たちは、お客様に高品質で優雅かつ忘れがたい広東式美食体験をお届けすることに専念しております。',
    footer_brands: 'ブランド', footer_menus: 'メニュー', footer_info: '情報',
    footer_visit: 'お問い合わせ', footer_open_maps: 'Google Maps を開く', footer_hours: '営業時間',
    footer_hours_weekday_short: '午前11:00 - 午後3:00<br>午後6:00 - 午後10:00', footer_hours_weekend_short: '午前11:00 - 午後3:00<br>午後6:00 - 午後10:00',
    footer_links: 'ギャラリー', footer_reserve_kicker: 'ご予約', footer_reserve_title: 'Taste Paradise Jakartaで次のお食事を計画しましょう',
    footer_call: '電話', footer_whatsapp: 'WhatsApp', footer_rights: '© 2026 Taste Paradise Jakarta. All rights reserved.', footer_group: 'Paradise Group Indonesia の一員',
    popup_title: 'Taste Paradise Jakartaのテーブルをご予約',
    popup_addr_name: 'アクセス',
    popup_addr_street: 'プラザ・インドネシア  |  サウスゲート, 4階<br>Jl. M.H. Thamrin Kav. 28-30, Menteng, 中央ジャカルタ 10350',
    popup_subtitle: 'ジャカルタで忘れられない広東式ダイニング体験のために<strong>Taste Paradise Jakarta</strong>のテーブルをご予約ください。',
    popup_hours: '毎日午前11:00〜午後10:00（西インドネシア時間）',
    popup_btn: 'WhatsAppで予約',
    popup_note: '*予約メッセージテンプレートが自動入力されます'
  }
};


// ── Apply translations to DOM ──
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  if (!t) return;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      // Special handling for hero_title to preserve sr-only span
      if (key === 'hero_title') {
        const srSpan = el.querySelector('.sr-only');
        el.childNodes.forEach(node => { if (node.nodeType === Node.TEXT_NODE) node.remove(); });
        el.prepend(document.createTextNode(t[key] + ' '));
        return;
      }
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
      // Hide element if translation is empty string
      if (t[key] === '') {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
    }
  });

  // Update lang dropdown label
  const flags = { en: '🇬🇧', id: '🇮🇩', zh: '🇨🇳', ja: '🇯🇵' };
  const labels = { en: 'EN', id: 'ID', zh: '中文', ja: '日本語' };
  const flagEl = document.getElementById('currentLangFlag');
  const labelEl = document.getElementById('currentLangLabel');
  if (flagEl) flagEl.textContent = flags[lang];
  if (labelEl) labelEl.textContent = labels[lang];

  // Update active state on options
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Close dropdown
  const dd = document.getElementById('langDropdown');
  if (dd) {
    dd.classList.remove('open');
    const btn = document.getElementById('langDropdownBtn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  // Update gallery data labels for lightbox
  if (translations[lang]) {
    galleryData.interiors.label = t.gallery_tab_interiors || galleryData.interiors.label;
    galleryData.interiors.desc = t.gallery_desc_interiors || galleryData.interiors.desc;
    galleryData.wedding.label = t.gallery_tab_wedding || galleryData.wedding.label;
    galleryData.wedding.desc = t.gallery_desc_wedding || galleryData.wedding.desc;
    galleryData.birthday.label = t.gallery_tab_birthday || galleryData.birthday.label;
    galleryData.birthday.desc = t.gallery_desc_birthday || galleryData.birthday.desc;
    galleryData.gathering.label = t.gallery_tab_gathering || galleryData.gathering.label;
    galleryData.gathering.desc = t.gallery_desc_gathering || galleryData.gathering.desc;
  }

  // Save preference
  localStorage.setItem('tp_lang', lang);
}

// ── Init language on load ──
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('tp_lang') || 'en';
  setLanguage(saved);
});

console.log('🏮 Taste Paradise — fully initialized');


// ══════════════════════════════════════════════
// CONTENT PROTECTION — Disable download & copy
// ══════════════════════════════════════════════
(function() {

  // 1. Protect all images
  function protectImages() {
    document.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      img.style.pointerEvents = 'none';
    });
    // Re-enable pointer events on clickable containers
    document.querySelectorAll(
      '.gallery-item, .gallery-item-large, .gallery-item-small, .gallery-preview-item, .lightbox-thumb, a, button'
    ).forEach(el => { el.style.pointerEvents = 'auto'; });
  }

  // 2. Block right-click everywhere
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // 3. Block drag on images
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // 4. Block Ctrl/Cmd+S (save), Ctrl/Cmd+U (source), Ctrl/Cmd+P (print)
  document.addEventListener('keydown', function(e) {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && (key === 's' || key === 'u' || key === 'p')) {
      e.preventDefault();
      return false;
    }
  });

  // 5. Block print
  window.addEventListener('beforeprint', function(e) {
    e.preventDefault();
    return false;
  });

  // 6. Run protectImages on load + after dynamic content loads
  document.addEventListener('DOMContentLoaded', protectImages);
  setTimeout(protectImages, 500);
  setTimeout(protectImages, 2000);

  // 7. Observe DOM changes (e.g. lightbox opening)
  const observer = new MutationObserver(protectImages);
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });

})();
