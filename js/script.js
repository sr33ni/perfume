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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const video = document.querySelector("video");
  if (!video) return;

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    // Desktop: scroll-controlled video
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
      }
    });

    video.onloadedmetadata = () => {
      tl.to(video, {
        currentTime: video.duration,
        ease: "none"
      });
    };
  } else {
    // 📱 Mobile: lightweight looping video
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    // iOS-safe autoplay
    document.addEventListener("touchstart", playVideo, { once: true });
    document.addEventListener("click", playVideo, { once: true });
  }
});
