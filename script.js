// ============================================
// REUSABLE COMPONENTS
// ============================================

function initializeAnimations() {

    const animatedElements = document.querySelectorAll(".animate");

    animatedElements.forEach((element) => {

        const rect = element.getBoundingClientRect();

        const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (isVisible) {
            element.classList.add("show");
        }

    });

}

window.addEventListener("scroll", initializeAnimations);

function loadComponent(selector, file) {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
    });
}

Promise.all([
  loadComponent("#header", "components/header.html"),
  loadComponent("#footer", "components/footer.html"),
]).then(() => {
  
   initializeAnimations();
  // ============================================
  // POPUP FORM
  // ============================================

  const formOpenBtn = document.querySelector(".popup-form-opener");
  const formCloseBtn = document.querySelector(".form-close-btn");
  const formParentContainer = document.querySelector(".form-overlay-parent");
  const formOverlay = document.querySelector(".form-overlay");
  const footerBtn = document.querySelector(".footer-btn");

  if (formOpenBtn) {
    formOpenBtn.addEventListener("click", () => {
      formParentContainer.style.display = "block";
    });
  }

  if (formCloseBtn) {
    formCloseBtn.addEventListener("click", () => {
      formParentContainer.style.display = "none";
    });
  }

  if (footerBtn) {
    footerBtn.addEventListener("click", () => {
      formParentContainer.style.display = "block";
    });
  }

  // ============================================
  // HAMBURGER BLOCK
  // ============================================

  const mainNav = document.querySelector("nav");
  const hamburgerWrapper = document.querySelector(".hamburger-wrapper");
  const hamburgerBlock = document.querySelector(".hamburger-block");
  const hamburgerOpen = document.querySelector(".navigation-hamburger");
  const hamburgerClose = document.querySelector(".hamburger-close");
  const hamBtn = document.querySelector(".ham-btn");

  if (hamburgerOpen) {
    hamburgerOpen.addEventListener("click", () => {
      mainNav.style.transform = "translateY(-500px)";
      hamburgerWrapper.style.display = "block";
    });
  }

  if (hamburgerClose) {
    hamburgerClose.addEventListener("click", () => {
      setTimeout(() => {
        mainNav.style.transform = "translateY(0)";
        mainNav.style.transition = "all 0.5s ease";
      }, 1000);

      hamburgerWrapper.style.display = "none";
    });
  }

  if (hamBtn) {
    hamBtn.addEventListener("click", () => {
      setTimeout(() => {
        mainNav.style.transform = "translateY(0)";
        mainNav.style.transition = "all 0.5s ease";
      }, 1000);

      formParentContainer.style.display = "block";
      hamburgerWrapper.style.display = "none";
    });
  }

  // ============================================
  // HAMBURGER MENU NAVIGATION
  // ============================================

  const hamMenuHome = document.querySelector(".hamburger-menu-home");

  const hamMenuAbout = document.querySelector(".hamburger-menu-about");

  const hamMenuPortfolio = document.querySelector(".hamburger-menu-portfolio");

  const hamMenuCaseStudy = document.querySelector(
    ".hamburger-menu-case-studies",
  );

  const hamMenuDemo = document.querySelector(".hamburger-menu-demo");

  const hamMenuContact = document.querySelector(".hamburger-menu-contact");

  // ============================================
  // HAMBURGER MENU IMAGES
  // ============================================

  const hamHomeImage = document.querySelector(".hamburger-menu-home-img");

  const hamAboutImage = document.querySelector(".hamburger-menu-about-img");

  const hamPortfolioImage = document.querySelector(
    ".hamburger-menu-portfolio-img",
  );

  const hamCaseImage = document.querySelector(
    ".hamburger-menu-case-studies-img",
  );

  const hamDemoImage = document.querySelector(".hamburger-menu-demo-img");

  const hamContactImage = document.querySelector(".hamburger-menu-contact-img");

  // ============================================
  // HAMBURGER HOME NAVIGATION
  // ============================================

  if (hamMenuHome) {
    hamMenuHome.addEventListener("mouseover", () => {
      hamHomeImage.style.display = "block";
    });

    hamMenuHome.addEventListener("mouseleave", () => {
      hamHomeImage.style.display = "none";
    });
  }

  // ============================================
  // HAMBURGER ABOUT NAVIGATION
  // ============================================

  if (hamMenuAbout) {
    hamMenuAbout.addEventListener("mouseover", () => {
      hamAboutImage.style.display = "block";
    });

    hamMenuAbout.addEventListener("mouseleave", () => {
      hamAboutImage.style.display = "none";
    });
  }

  // ============================================
  // HAMBURGER PORTFOLIO NAVIGATION
  // ============================================

  if (hamMenuPortfolio) {
    hamMenuPortfolio.addEventListener("mouseover", () => {
      hamPortfolioImage.style.display = "block";
    });

    hamMenuPortfolio.addEventListener("mouseleave", () => {
      hamPortfolioImage.style.display = "none";
    });
  }

  // ============================================
  // HAMBURGER CASE STUDY NAVIGATION
  // ============================================

  if (hamMenuCaseStudy) {
    hamMenuCaseStudy.addEventListener("mouseover", () => {
      hamCaseImage.style.display = "block";
    });

    hamMenuCaseStudy.addEventListener("mouseleave", () => {
      hamCaseImage.style.display = "none";
    });
  }

  // ============================================
  // HAMBURGER DEMO NAVIGATION
  // ============================================

  if (hamMenuDemo) {
    hamMenuDemo.addEventListener("mouseover", () => {
      hamDemoImage.style.display = "block";
    });

    hamMenuDemo.addEventListener("mouseleave", () => {
      hamDemoImage.style.display = "none";
    });
  }

  // ============================================
  // HAMBURGER CONTACT NAVIGATION
  // ============================================

  if (hamMenuContact) {
    hamMenuContact.addEventListener("mouseover", () => {
      hamContactImage.style.display = "block";
    });

    hamMenuContact.addEventListener("mouseleave", () => {
      hamContactImage.style.display = "none";
    });
  }

  // ============================================
  // FOOTER NAVIGATION LINKS
  // ============================================

  const footerNavLinks2 = document.querySelectorAll(".footer-nav-links");

  footerNavLinks2.forEach((link) => {
    link.addEventListener("mouseover", () => {
      link.style.color = link.dataset.color;
    });

    link.addEventListener("mouseleave", () => {
      link.style.color = "";
    });
  });
});

// ============================================
// SMOOTH SCROLL + GSAP SCROLLTRIGGER
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.4,
    smoothWheel: true,
    smoothTouch: false,

    wheelMultiplier: 0.85,
    touchMultiplier: 1,

    infinite: false,

    easing: (t) => 1 - Math.pow(1 - t, 4),
  });

  // Lenis → ScrollTrigger

  lenis.on("scroll", ScrollTrigger.update);

  // GSAP → Lenis

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Prevent GSAP from interfering with Lenis timing

  gsap.ticker.lagSmoothing(0);

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

// ============================================
// ABOUT US CARDS
// ============================================

const cards = document.querySelectorAll(".about-us-card-image-sep");

cards.forEach((card) => {
  card.style.background = `url("${card.dataset.bg}") center center / cover no-repeat`;
});

const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach((i) => {
  i.style.background = `url("${i.dataset.bg}") center center / cover no-repeat`;
});

// Logo Marquee
const myLogoMarquee = document.querySelectorAll(".logo-boxes");
myLogoMarquee.forEach((logoBox) => {
  logoBox.addEventListener("mouseover", () => {
    logoBox.style.color = logoBox.dataset.color;
  });

  logoBox.addEventListener("mouseleave", () => {
    logoBox.style.color = "";
  });
});

// Section with background image
const backgroundImageSections = document.querySelectorAll(".bg-image");
backgroundImageSections.forEach((section) => {
  section.style.background = `url("${section.dataset.bg}") center center / cover no-repeat`;
});
gsap.registerPlugin(ScrollTrigger);

function initParallax() {
  document.querySelectorAll(".bg-image[data-bg]").forEach((section) => {
    // build the inner transformable layer once
    const layer = document.createElement("div");
    layer.className = "bg-image__layer";
    layer.style.backgroundImage = `url('${section.dataset.bg}')`;
    section.prepend(layer);

    gsap.to(layer, {
      yPercent: 15, // how far the image drifts — tweak per taste, 10–20 is typical
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom", // as section enters viewport
        end: "bottom top", // until it fully exits
        scrub: true, // ties movement directly to scroll position
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", initParallax);

// Background Video Sections

const videoBlocks = document.querySelectorAll(".video-block");

videoBlocks.forEach((videoBlock) => {
  // Get video path from data-video attribute
  const videoSource = videoBlock.dataset.video;

  // Create video element
  const video = document.createElement("video");

  // Video settings
  video.src = videoSource;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = "metadata";

  // Add class for styling
  video.classList.add("background-video");

  // Add video inside the block as the first element
  videoBlock.prepend(video);

  // Play video on hover
  videoBlock.addEventListener("mouseenter", () => {
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser prevented autoplay
      });
    }
  });

  // Pause video when mouse leaves
  videoBlock.addEventListener("mouseleave", () => {
    video.pause();
  });
});

// For Tilted Images

const portfolioCards = document.querySelectorAll(".portfolio-card");

let portfolioTime = 0;

function animatePortfolio() {
  portfolioTime += 0.015;

  portfolioCards.forEach((card, index) => {
    // Don't animate on mobile
    if (window.innerWidth <= 768) {
      return;
    }

    const originalTransform = card.dataset.transform;

    if (!originalTransform) {
      card.dataset.transform = getComputedStyle(card).transform;
    }

    const movement = Math.sin(portfolioTime + index * 0.7) * 2;

    card.style.marginTop = `${movement}px`;
  });

  requestAnimationFrame(animatePortfolio);
}

animatePortfolio();

function initScaleParallax() {
  document.querySelectorAll(".scale-image[data-bg]").forEach((section) => {
    const layer = document.createElement("div");

    layer.className = "scale-image__layer";

    layer.style.backgroundImage = `url('${section.dataset.bg}')`;

    section.prepend(layer);

    gsap.fromTo(
      layer,

      {
        scale: 0.6,
      },

      {
        scale: 1.25,

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top bottom",

          end: "bottom top",

          scrub: true,
        },
      },
    );
  });
}

document.addEventListener("DOMContentLoaded", initScaleParallax);

// Icon box

const iconBox = document.querySelectorAll(".icon-box");
const iconBlock = document.querySelectorAll(".colored-icon");
const icon = document.querySelectorAll(".icon-box i");
