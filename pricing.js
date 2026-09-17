// ============================================================
// PRICING PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ========================================================
  // FAQ ACCORDION
  // ========================================================

  const faqItems = document.querySelectorAll(".pricing-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".pricing-faq-question");

    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close every FAQ
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      // Open clicked FAQ if it wasn't already open
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // ========================================================
  // PRICING BUTTONS -> EXISTING POPUP FORM
  // ========================================================

  const pricingButtons = document.querySelectorAll(
    ".pricing-page .popup-form-opener",
  );

  const formParentContainer = document.querySelector(".form-overlay-parent");

  pricingButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      if (formParentContainer) {
        formParentContainer.style.display = "block";
      }
    });
  });

  // ========================================================
  // BUTTON HOVER ARROW
  // ========================================================

  const pricingButtonsHover = document.querySelectorAll(
    ".pricing-button, .pricing-final-button",
  );

  pricingButtonsHover.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      const icon = button.querySelector("i");

      if (icon) {
        icon.style.transform = "translate(3px, -3px)";
      }
    });

    button.addEventListener("mouseleave", () => {
      const icon = button.querySelector("i");

      if (icon) {
        icon.style.transform = "";
      }
    });
  });
});

const pricingLabel = document.querySelectorAll(".pricing-plan-label");
const iconBg = document.querySelectorAll(".bi-check2");
const pricingCards = document.querySelectorAll(".pricing-plan-card");
const pricingButtons = document.querySelectorAll(".pricing-button");
const pricingAmounts = document.querySelectorAll(".pricing-amount");
const priceEyebrow = document.querySelectorAll(".pricing-eyebrow");

function colorManager(items) {
  items.forEach((item) => {
    item.style.background = item.dataset.bg;
    item.style.color = item.dataset.color;
    item.style.borderColor = item.dataset.border;
  });
}

colorManager(pricingLabel);
colorManager(iconBg);
colorManager(pricingCards);
colorManager(priceEyebrow);

pricingCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    pricingAmounts[index].style.color = pricingAmounts[index].dataset.color;
    pricingButtons[index].style.backgroundColor =
      pricingButtons[index].dataset.bg;
    pricingButtons[index].style.color = "#fff";
  });
  card.addEventListener("mouseleave", () => {
    pricingAmounts[index].style.color = "";
    pricingButtons[index].style.backgroundColor = "";
    pricingButtons[index].style.color = "";
  });
});
