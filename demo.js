// Hamburger

const mainNav = document.querySelector(".portfolio-menu");
const hamburgerWrapper = document.querySelector(".hamburger-wrapper");
const hamburgerOpen = document.querySelector(".hamburger-portfolio-btn");
const hamburgerClose = document.querySelector(".hamburger-close");

hamburgerOpen.addEventListener("click", () => {
  mainNav.style.transform = "translateY(-500px)";
  hamburgerWrapper.style.display = "block";
});

hamburgerClose.addEventListener("click", () => {
  setTimeout(() => {
    mainNav.style.transform = "";
    mainNav.style.transition = "all 0.5s ease";
  }, 1000);

  hamburgerWrapper.style.display = "none";
});

// Form Popup

const formOpenBtn = document.querySelector(".open-form-btn");
const formCloseBtn = document.querySelector(".form-close-btn");
const formParentContainer = document.querySelector(".form-overlay-parent");
const formOverlay = document.querySelector(".form-overlay");
const hamBtn = document.querySelector(".ham-btn");

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

if (hamBtn) {
  hamBtn.addEventListener("click", () => {
    formParentContainer.style.display = "block";
    hamburgerWrapper.style.display = "none";
    setTimeout(() => {
      mainNav.style.transform = "";
      mainNav.style.transition = "all 0.5s ease";
    }, 1000);
  });
}

// Unknown

document.addEventListener("DOMContentLoaded", () => {
  const demoButtons = document.querySelectorAll(".demo-view-btn");
  const demoPanels = document.querySelectorAll("[data-demo-panel]");

  // =====================================================
  // VIEW SWITCH
  // =====================================================

  demoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedView = button.dataset.demoView;

      // -----------------------------
      // Buttons
      // -----------------------------

      demoButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      // -----------------------------
      // Panels
      // -----------------------------

      demoPanels.forEach((panel) => {
        if (panel.dataset.demoPanel === selectedView) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  // =====================================================
  // ROUND BUTTON INTERACTION
  // =====================================================

  const demoButtonsRound = document.querySelectorAll(".demo-round-button");

  demoButtonsRound.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.08)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  // =====================================================
  // CARD IMAGE PARALLAX
  // =====================================================

  const imageCards = document.querySelectorAll(
    ".demo-image-card-small, .demo-office-card",
  );

  imageCards.forEach((card) => {
    const image = card.querySelector("img");

    if (!image) return;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      image.style.transform = `scale(1.05) translate(${x * 8}px, ${y * 8}px)`;
    });

    card.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });
  });

  // =====================================================
  // COLOR PICKER BUTTON
  // =====================================================

  const pickerButton = document.querySelector(".demo-picker-button");

  if (pickerButton) {
    pickerButton.addEventListener("click", () => {
      pickerButton.style.transform = "scale(.92)";

      setTimeout(() => {
        pickerButton.style.transform = "";
      }, 150);
    });
  }
});

const demoModeWrapper = document.querySelector(".demo-mode-wrapper");
const demoModeTrigger = document.querySelector(".demo-mode-trigger");
const demoModeOptions = document.querySelectorAll(".demo-mode-option");

if (demoModeWrapper && demoModeTrigger) {
  demoModeTrigger.addEventListener("click", () => {
    const isOpen = demoModeWrapper.classList.toggle("is-open");

    demoModeTrigger.setAttribute("aria-expanded", isOpen);
  });

  demoModeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      demoModeOptions.forEach((item) => {
        item.classList.remove("active");
      });

      option.classList.add("active");

      const icon = option.querySelector("i");
      const name = option.querySelector("span:last-of-type");

      if (icon && name) {
        demoModeTrigger.querySelector(".demo-mode-icon i").className =
          icon.className;

        demoModeTrigger.querySelector(".demo-mode-name").textContent =
          name.textContent;
      }

      demoModeWrapper.classList.remove("is-open");

      demoModeTrigger.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!demoModeWrapper.contains(event.target)) {
      demoModeWrapper.classList.remove("is-open");

      demoModeTrigger.setAttribute("aria-expanded", "false");
    }
  });
}

// const demoTime = document.querySelector(".demo-time-number");
const hourSpan = document.querySelector(".hour-span");
const minuteSpan = document.querySelector(".minute-span");

function timeFunc() {
  const date = new Date();

  const hours = String(date.getHours()).padStart("2", "0");

  const minutes = String(date.getMinutes()).padStart("2", "0");

  hourSpan.innerText = hours;
  minuteSpan.innerText = minutes;
}

timeFunc();

setInterval(timeFunc, 1000);

// Color Changer

let modeChanger = document.querySelectorAll(".demo-mode-option");

modeChanger.forEach((mode) => {
  mode.addEventListener("click", () => {
    if (mode.dataset.mode === "graviflux") {
      document.body.style.background =
        "radial-gradient(circle at 50% 20%, #4B5158 0%, #2E3137 50%, #141518 100%)";
    } else if (mode.dataset.mode === "auroflux") {
      document.body.style.background =
        "linear-gradient(180deg, #FDF1E7 0%, #F3E8DE 50%, #E7D8CB 100%)";
    } else {
      document.body.style.background = "#edf1f5";
    }
  });
});

// Popup

const myMenu = document.querySelector(".portfolio-menu");
const demoCloser = document.querySelector(".close-demo-popup");

let demoCards = document.querySelectorAll(".demo-card");

demoCards.forEach((card) => {
  card.addEventListener("click", () => {
    demoPopup.style.display = "flex";
    myMenu.style.transform = "translateY(-200px)";
    myMenu.style.transition = "translate 0.6s ease";
  });
});

demoCloser.addEventListener("click", () => {
  demoPopup.style.display = "none";
  myMenu.style.transform = "";
});

let demoPopup = document.querySelector(".demo-popup");
