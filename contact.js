// ============================================================
// CONTACT PAGE
// ============================================================


// ============================================================
// FAQ ACCORDION
// ============================================================

const faqItems = document.querySelectorAll(".contact-faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".contact-faq-question");

    question.addEventListener("click", () => {

        const isAlreadyOpen = item.classList.contains("active");


        // Close all other FAQ items
        faqItems.forEach((faq) => {
            faq.classList.remove("active");
        });


        // Open clicked item
        if (!isAlreadyOpen) {
            item.classList.add("active");
        }

    });

});


// ============================================================
// CONTACT FORM
// ============================================================

const contactForm = document.querySelector("#contactInquiryForm");

if (contactForm) {

    const nameInput = document.querySelector("#contactName");
    const emailInput = document.querySelector("#contactEmail");
    const consentInput = document.querySelector("#contactConsent");

    const submitButton = contactForm.querySelector(".contact-submit-btn");


    // --------------------------------------------------------
    // REMOVE ERROR WHEN USER STARTS TYPING
    // --------------------------------------------------------

    nameInput.addEventListener("input", () => {

        nameInput
            .closest(".contact-field")
            .classList.remove("invalid");

    });


    emailInput.addEventListener("input", () => {

        emailInput
            .closest(".contact-field")
            .classList.remove("invalid");

    });


    // --------------------------------------------------------
    // EMAIL VALIDATION
    // --------------------------------------------------------

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    // --------------------------------------------------------
    // FORM SUBMIT
    // --------------------------------------------------------

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        let isValid = true;


        // ----------------------------------------------------
        // NAME
        // ----------------------------------------------------

        if (nameInput.value.trim() === "") {

            nameInput
                .closest(".contact-field")
                .classList.add("invalid");

            isValid = false;

        }


        // ----------------------------------------------------
        // EMAIL
        // ----------------------------------------------------

        if (
            emailInput.value.trim() === "" ||
            !isValidEmail(emailInput.value.trim())
        ) {

            emailInput
                .closest(".contact-field")
                .classList.add("invalid");

            isValid = false;

        }


        // ----------------------------------------------------
        // CONSENT
        // ----------------------------------------------------

        if (!consentInput.checked) {

            consentInput
                .closest(".contact-consent")
                .classList.add("invalid");

            isValid = false;

        } else {

            consentInput
                .closest(".contact-consent")
                .classList.remove("invalid");

        }


        // ----------------------------------------------------
        // STOP IF INVALID
        // ----------------------------------------------------

        if (!isValid) {
            return;
        }

        // LOADING STATE


        submitButton.classList.add("loading");

        submitButton.querySelector("span").textContent = "SENDING...";


        // DEMO SUCCESS STATE
   

        setTimeout(() => {

            submitButton.classList.remove("loading");

            submitButton.querySelector("span").textContent =
                "INQUIRY SENT";

            submitButton.querySelector("i").className =
                "bi bi-check2";


            contactForm.reset();


            setTimeout(() => {

                submitButton.querySelector("span").textContent =
                    "SEND INQUIRY";

                submitButton.querySelector("i").className =
                    "bi bi-send";

            }, 3000);

        }, 1000);

    });

}