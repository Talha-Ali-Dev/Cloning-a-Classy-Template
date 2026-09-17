// ==================================================
// LORO LABS PORTFOLIO
// INFINITE 2D CANVAS
// ==================================================


// ==================================================
// PORTFOLIO IMAGES
// ==================================================

const portfolioImages = [
  { src: "https://lorolabs.ai/portfolio/03.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/04.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/02.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/10.webp", alt: "" },

  {
    src: "https://lorolabs.ai/case-studies/verra-mariya/portfolio-hero.webp",
    alt: "Verra Mariya jewelry storefront",
  },

  { src: "https://lorolabs.ai/portfolio/16.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/22.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/28.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/34.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/40.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/25.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/41.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/33.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/05.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/08.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/23.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/21.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/07.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/06.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/15.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/13.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/29.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/35.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/42.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/12.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/17.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/38.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/20.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/31.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/30.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/14.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/18.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/36.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/39.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/24.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/43.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/19.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/27.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/32.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/37.webp", alt: "" },

  { src: "https://lorolabs.ai/portfolio/11.webp", alt: "" },
  { src: "https://lorolabs.ai/portfolio/26.webp", alt: "" },
];


// ==================================================
// GET ELEMENTS
// ==================================================

const portfolioGrid = document.querySelector("#portfolioGrid");

// .portfolio-wall is the fixed viewport box that clips
// the canvas and captures drag input. portfolioGrid
// itself is the "world" layer that gets translated.

const portfolioWall = document.querySelector(".portfolio-wall");


// ==================================================
// INFINITE 2D DRAGGABLE CANVAS
// ==================================================

if (portfolioGrid && portfolioWall && portfolioImages.length) {

  // Buffer of extra rings of cells rendered just
  // outside the viewport, so nothing pops in/out
  // right at the visible edge.

  const BUFFER = 1;

  // Current pan offset (world -> screen).

  let tx = 0;
  let ty = 0;

  // Rendered cells, keyed "col:row" -> element.

  const rendered = new Map();


  // ==================================================
  // READ CELL SIZE / GAP FROM CSS
  // ==================================================

  let cellSize = 320;
  let gap = 18;

  // Landscape image ratio.
  // 16:9 = width / height.

  let itemHeight = cellSize * (9 / 16);

  // Horizontal and vertical movement steps.

  let stepX = cellSize + gap;
  let stepY = itemHeight + gap;


  function readMetrics() {

    const styles = getComputedStyle(portfolioWall);

    const rawCellSize =
      styles.getPropertyValue("--cell-size").trim();

    const parsedCell = rawCellSize.includes("calc")
      ? (portfolioWall.clientWidth - 68) / 3.2
      : parseFloat(rawCellSize);

    const parsedGap =
      parseInt(styles.getPropertyValue("--gap"));

    cellSize = Number.isFinite(parsedCell)
      ? parsedCell
      : cellSize;

    gap = Number.isFinite(parsedGap)
      ? parsedGap
      : gap;


    // ==================================================
    // LANDSCAPE ITEM HEIGHT
    // 16:9 aspect ratio
    // ==================================================

    itemHeight = cellSize * (9 / 16);


    // ==================================================
    // GRID STEPS
    // ==================================================

    stepX = cellSize + gap;
    stepY = itemHeight + gap;

  }


  // ==================================================
  // DETERMINISTIC IMAGE PER CELL
  // (stable hash so the same coordinate always shows
  // the same image, without storing an ever-growing list)
  // ==================================================

  function imageForCell(col, row) {

    let h =
      Math.imul(col, 374761393) ^
      Math.imul(row, 668265263);

    h = (h ^ (h >>> 13)) >>> 0;

    return portfolioImages[h % portfolioImages.length];

  }


  // ==================================================
  // CREATE ITEM
  // ==================================================

  function createPortfolioItem(col, row) {

    const image = imageForCell(col, row);

    const item = document.createElement("div");

    item.className = "portfolio-item";


    // ==================================================
    // LANDSCAPE SIZE
    // ==================================================

    item.style.width = `${cellSize}px`;

    item.style.height = `${itemHeight}px`;


    // ==================================================
    // POSITION
    // ==================================================

    item.style.transform =
      `translate3d(${col * stepX}px, ${row * stepY}px, 0)`;


    const img = document.createElement("img");

    img.src = image.src;

    img.alt = image.alt;

    img.loading = "lazy";

    img.decoding = "async";

    img.draggable = false;


    // ==================================================
    // IMAGE FIT
    // ==================================================

    img.style.width = "100%";

    img.style.height = "100%";

    img.style.objectFit = "cover";


    item.appendChild(img);

    return item;

  }


  // ==================================================
  // VIRTUALIZED RENDER
  // (only cells overlapping the viewport + buffer
  // stay in the DOM)
  // ==================================================

  function render() {

    const w = portfolioWall.clientWidth;

    const h = portfolioWall.clientHeight;


    const firstCol =
      Math.floor(-tx / stepX) - BUFFER;

    const lastCol =
      Math.ceil((-tx + w) / stepX) + BUFFER;


    const firstRow =
      Math.floor(-ty / stepY) - BUFFER;

    const lastRow =
      Math.ceil((-ty + h) / stepY) + BUFFER;


    const needed = new Set();


    for (
      let row = firstRow;
      row <= lastRow;
      row++
    ) {

      for (
        let col = firstCol;
        col <= lastCol;
        col++
      ) {

        const key = col + ":" + row;

        needed.add(key);


        if (!rendered.has(key)) {

          const item =
            createPortfolioItem(col, row);

          portfolioGrid.appendChild(item);

          rendered.set(key, item);

        }

      }

    }


    // Remove cells that fell outside the needed set.

    rendered.forEach((item, key) => {

      if (!needed.has(key)) {

        item.remove();

        rendered.delete(key);

      }

    });

  }


  function applyTransform() {

    portfolioGrid.style.transform =
      `translate3d(${tx}px, ${ty}px, 0)`;

  }


  // ==================================================
  // DRAG / PAN
  // (pointer events cover mouse, touch, and pen)
  // ==================================================

  let isDragging = false;

  let startX = 0;
  let startY = 0;

  let startTx = 0;
  let startTy = 0;

  let lastX = 0;
  let lastY = 0;
  let lastT = 0;

  let vx = 0;
  let vy = 0;

  let momentumRAF = null;


  function cancelMomentum() {

    if (momentumRAF) {

      cancelAnimationFrame(momentumRAF);

      momentumRAF = null;

    }

  }


  function startMomentum() {

    const FRICTION = 0.94;

    const MIN_V = 0.02;


    function step() {

      vx *= FRICTION;

      vy *= FRICTION;


      if (
        Math.abs(vx) < MIN_V &&
        Math.abs(vy) < MIN_V
      ) {

        momentumRAF = null;

        return;

      }


      tx += vx * 16;

      ty += vy * 16;


      applyTransform();

      render();


      momentumRAF =
        requestAnimationFrame(step);

    }


    cancelMomentum();

    momentumRAF =
      requestAnimationFrame(step);

  }


  function onPointerDown(event) {

    cancelMomentum();

    isDragging = true;

    portfolioWall.classList.add("is-dragging");


    startX = lastX = event.clientX;

    startY = lastY = event.clientY;


    startTx = tx;

    startTy = ty;


    lastT = performance.now();


    portfolioWall.setPointerCapture(
      event.pointerId
    );

  }


  function onPointerMove(event) {

    if (!isDragging) {
      return;
    }


    tx =
      startTx +
      (event.clientX - startX);


    ty =
      startTy +
      (event.clientY - startY);


    applyTransform();

    render();


    const now = performance.now();

    const dt =
      Math.max(now - lastT, 1);


    vx =
      (event.clientX - lastX) / dt;

    vy =
      (event.clientY - lastY) / dt;


    lastX = event.clientX;

    lastY = event.clientY;

    lastT = now;

  }


  function onPointerUp() {

    if (!isDragging) {
      return;
    }


    isDragging = false;

    portfolioWall.classList.remove(
      "is-dragging"
    );


    startMomentum();

  }


  portfolioWall.addEventListener(
    "pointerdown",
    onPointerDown
  );

  portfolioWall.addEventListener(
    "pointermove",
    onPointerMove
  );

  portfolioWall.addEventListener(
    "pointerup",
    onPointerUp
  );

  portfolioWall.addEventListener(
    "pointercancel",
    onPointerUp
  );


  // ==================================================
  // WHEEL / TRACKPAD PAN
  // ==================================================

  portfolioWall.addEventListener(
    "wheel",
    (event) => {

      event.preventDefault();

      cancelMomentum();


      tx -= event.deltaX;

      ty -= event.deltaY;


      applyTransform();

      render();

    },
    { passive: false }
  );


  // ==================================================
  // RESIZE
  // ==================================================

  window.addEventListener(
    "resize",
    () => {

      readMetrics();

      render();

    }
  );


  // ==================================================
  // INITIAL RENDER
  // ==================================================

  readMetrics();

  applyTransform();

  render();

}


// ==================================================
// FORM ELEMENTS
// ==================================================

const openFormBtn =
  document.querySelector(".open-form-btn");

const formCloseBtn =
  document.querySelector(".form-close-btn");

const formParentContainer =
  document.querySelector(".form-overlay-parent");

const formOverlay =
  document.querySelector(".form-overlay");

const footerBtn =
  document.querySelector(".footer-btn");


// ==================================================
// PORTFOLIO GET QUOTE BUTTONS
// ==================================================

const popupFormOpeners =
  document.querySelectorAll(
    ".popup-form-opener"
  );


// ==================================================
// OPEN FORM
// ==================================================

function openPortfolioForm() {

  if (!formParentContainer) {

    console.warn(
      "Form container .form-overlay-parent was not found.",
    );

    return;

  }

  formParentContainer.style.display =
    "block";

}


// ==================================================
// CLOSE FORM
// ==================================================

function closePortfolioForm() {

  if (!formParentContainer) {
    return;
  }

  formParentContainer.style.display =
    "none";

}


// ==================================================
// NORMAL FORM BUTTON
// ==================================================

if (openFormBtn) {

  openFormBtn.addEventListener(
    "click",
    openPortfolioForm,
  );

}


// ==================================================
// PORTFOLIO GET QUOTE
// ==================================================

popupFormOpeners.forEach((button) => {

  button.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();

      openPortfolioForm();

    }
  );

});


// ==================================================
// CLOSE FORM BUTTON
// ==================================================

if (formCloseBtn) {

  formCloseBtn.addEventListener(
    "click",
    closePortfolioForm,
  );

}


// ==================================================
// FOOTER FORM BUTTON
// ==================================================

if (footerBtn) {

  footerBtn.addEventListener(
    "click",
    openPortfolioForm,
  );

}


// ==================================================
// CLOSE FORM BY CLICKING OVERLAY
// ==================================================

if (formOverlay) {

  formOverlay.addEventListener(
    "click",
    (event) => {

      if (event.target === formOverlay) {

        closePortfolioForm();

      }

    }
  );

}


// ==================================================
// HAMBURGER ELEMENTS
// ==================================================

// Your portfolio HTML uses:
//
// .portfolio-hamburger
//
// Therefore this is the correct opener.

const hamPortfolioOpener =
  document.querySelector(
    ".portfolio-hamburger"
  );


// Your hamburger component's close button.

const hamPortfolioClose =
  document.querySelector(
    ".hamburger-close"
  );


// Main hamburger wrapper.

const hamburgerWrapper =
  document.querySelector(
    ".hamburger-wrapper"
  );


// Main navigation.

const mainNav =
  document.querySelector("nav");


// ==================================================
// OPEN HAMBURGER
// ==================================================

if (
  hamPortfolioOpener &&
  hamburgerWrapper
) {

  hamPortfolioOpener.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      event.stopPropagation();


      // Show hamburger menu.

      hamburgerWrapper.style.display =
        "block";


      // Hide/move the main navigation if it exists.

      if (mainNav) {

        mainNav.style.transform =
          "translateY(-500px)";

      }

    }
  );

}


// ==================================================
// CLOSE HAMBURGER
// ==================================================

if (
  hamPortfolioClose &&
  hamburgerWrapper
) {

  hamPortfolioClose.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      hamburgerWrapper.style.display =
        "none";


      if (mainNav) {

        setTimeout(
          () => {

            mainNav.style.transform =
              "translateY(0)";

            mainNav.style.transition =
              "all 0.5s ease";

          },
          1000
        );

      }

    }
  );

}


// ==================================================
// HAMBURGER → FORM BUTTON
// ==================================================

const hamBtn =
  document.querySelector(".ham-btn");


if (
  hamBtn &&
  hamburgerWrapper
) {

  hamBtn.addEventListener(
    "click",
    (event) => {

      event.preventDefault();


      hamburgerWrapper.style.display =
        "none";


      openPortfolioForm();

    }
  );

}