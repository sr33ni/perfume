// =====================
// Intersection Observer
// =====================
const boxes = document.querySelectorAll(
  '.box-to-observe-top, .box-to-observe-bottom'
);

if (boxes.length) {
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        entry.target.classList.toggle('active', entry.isIntersecting);
      }
    },
    {
      root: null,
      rootMargin: '0px 0px 20px 0px',
      threshold: 0
    }
  );

  boxes.forEach(box => observer.observe(box));
}

// =====================
// Carousel helpers
// =====================
function changeTab(carousel, index) {
  const tabs = carousel.querySelectorAll('.tab');
  const current = carousel.querySelector('.tab.active');

  if (current) current.classList.remove('active');
  if (tabs[index]) tabs[index].classList.add('active');
}

function next(id) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const tabs = carousel.querySelectorAll('.tab');
  const current = carousel.querySelector('.tab.active');

  let currentIndex = 0;
  if (current) currentIndex = [...tabs].indexOf(current);

  if (currentIndex < tabs.length - 1) {
    changeTab(carousel, currentIndex + 1);
  }
}

function prev(id) {
  const carousel = document.getElementById(id);
  if (!carousel) return;

  const tabs = carousel.querySelectorAll('.tab');
  const current = carousel.querySelector('.tab.active');

  let currentIndex = 0;
  if (current) currentIndex = [...tabs].indexOf(current);

  if (currentIndex > 0) {
    changeTab(carousel, currentIndex - 1);
  }
}

// =====================
// Hamburger menu
// =====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// =====================
// Search toggle
// =====================
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.querySelector('.search-text');
const shopNowBtn = document.querySelector('.btn');

if (searchBtn && searchBox && shopNowBtn) {
  searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('visible');
    shopNowBtn.classList.toggle('hidden');
  });
}

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
let panelsSection = document.querySelector("#panels"),
  panelsContainer = document.querySelector("#panels-container"),
  tween;
document.querySelectorAll(".anchor").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    console.log("click");
    e.preventDefault();
    let targetElem = document.querySelector(e.target.getAttribute("href")),
      y = targetElem;
    if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
      let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
        totalMovement = cont.scrollWidth - innerWidth;
      y = Math.round(
        tween.scrollTrigger.start +
          (targetElem.offsetLeft / totalMovement) * totalScroll
      );
    }
    gsap.to(window, {
      scrollTo: {
        y: y,
        autoKill: false
      },
      duration: 1
    });
  });
});

/* Panels */
const cont = document.querySelector("#panels-container");
const panels = gsap.utils.toArray("#panels-container .panel");

tween = gsap.to(panels, {
  x: () => -1 * (cont.scrollWidth - innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: "#panels-container",
    pin: true,
    start: "top top",
    scrub: 0.2,
     end: () => "+=" + (cont.scrollWidth - innerWidth) / 4,
    onUpdate: (self) => {
     console.log(self.progress)
    }
  }
});
