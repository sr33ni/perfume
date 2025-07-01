
function next(id) {
  const carousel = document.getElementById(id);
  const tabs = carousel.querySelectorAll(".tab");
  const current = carousel.querySelector(".tab.active");
  const currentIndex = Array.from(tabs).indexOf(current);
  if (currentIndex < tabs.length - 1) {
    changeTab(carousel, currentIndex + 1);
  }
}

function prev(id) {
  const carousel = document.getElementById(id);
  const tabs = carousel.querySelectorAll(".tab");
  const current = carousel.querySelector(".tab.active");
  const currentIndex = Array.from(tabs).indexOf(current);
  if (currentIndex > 0) {
    changeTab(carousel, currentIndex - 1);
  }
}

function goToTab(id, index) {
  const carousel = document.getElementById(id);
  changeTab(carousel, index);
}

function changeTab(carousel, index) {
  const tabs = carousel.querySelectorAll(".tab");
  const dots = carousel.querySelectorAll(".dot");
  tabs.forEach(tab => tab.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));
  if (tabs[index]) tabs[index].classList.add("active");
  if (dots[index]) dots[index].classList.add("active");
}


    document.querySelectorAll("details").forEach((detail) => {
    detail.addEventListener("toggle", function () {
      if (this.open) {
        document.querySelectorAll("details").forEach((otherDetail) => {
          if (otherDetail !== this) {
            otherDetail.removeAttribute("open");
          }
        });
      }
    });
  });


  function animatePercentages(selector = '.progress-value', duration = 2000) {
  const elements = document.querySelectorAll(selector);
  const intervalTime = 20;

  elements.forEach(el => {
    if (el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    let current = 0;
    const step = target / (duration / intervalTime);

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current) + "%";
    }, intervalTime);
  });
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animatePercentages('#' + entry.target.id + ' .progress-value');
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.5
});
const progressSection = document.querySelector('#progress-section');
if (progressSection) {
  observer.observe(progressSection);
}

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navMenu').classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchBox = document.querySelector('.search-text');
  const shopNowBtn = document.querySelector('.btn');
  const isVisible = searchBox.style.display === 'block';
  searchBox.style.display = isVisible ? 'none' : 'block';
  shopNowBtn.style.display = isVisible ? 'inline-block' : 'none';
});