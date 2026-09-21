// ============================================
// CASE STUDIES
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    const caseStudyCards =
        document.querySelectorAll(".case-study-card");


    caseStudyCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("is-hovered");

        });


        card.addEventListener("mouseleave", () => {

            card.classList.remove("is-hovered");

        });

    });

});