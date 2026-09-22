// ==================================================
// LORO LABS PORTFOLIO
// INFINITE 2D CANVAS
// ==================================================


// ==================================================
// PORTFOLIO IMAGES
// ==================================================

const portfolioImages = [
  { src: "https://w0.peakpx.com/wallpaper/552/380/HD-wallpaper-dark-woods-aesthetic-ultra-nature-forests-dark-landscape-scenery-trees-morning-forest-cloud-mist-foggy-woods-scenic-wilderness-yosemite-gloomy-unitedstates.jpg", alt: "" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZpalP2w5rInoPx5OadGe4j32HN4hkqodjF3nkOXSbQ&s=10", alt: "" },
  { src: "https://w0.peakpx.com/wallpaper/694/487/HD-wallpaper-beautiful-sunset-sunset-nature-sky-dark.jpg", alt: "" },
  { src: "https://static.vecteezy.com/system/resources/thumbnails/068/788/899/small/a-moonlit-mountain-meadow-photo.jpeg", alt: "" },

  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5DsUoDyx0z39ktcqqjJJ7dmICeR8hWIC5zoLBkpRRo4CWBiicom_TtUMq&s=10",
    alt: "Verra Mariya jewelry storefront",
  },

  { src: "https://wallpaperaccess.com/full/432525.jpg", alt: "" },
  { src: "https://static.vecteezy.com/system/resources/previews/075/471/892/non_2x/nature-wallpaper-nature-landscape-moonlit-ocean-night-scene-over-calm-dark-water-free-photo.jpg", alt: "" },
  { src: "https://images.pexels.com/photos/20337722/pexels-photo-20337722/free-photo-of-footpath-in-dark-green-forest.jpeg", alt: "" },
  { src: "https://static.vecteezy.com/system/resources/thumbnails/077/778/518/small/mysterious-forest-path-with-tall-trees-misty-atmosphere-and-shadows-on-the-ground-at-dawn-or-dusk-pinnacle-scene-serene-pinn-photo.jpg", alt: "" },
  { src: "https://t3.ftcdn.net/jpg/01/82/41/10/360_F_182411045_y60gNV2cJ9BnQe6Ipi4uAWufZAywT6sH.jpg", alt: "" },

  { src: "https://img.magnific.com/free-photo/los-angeles-downtown-buildings-night_649448-298.jpg?semt=ais_hybrid&w=740&q=80", alt: "" },
  { src: "https://media.istockphoto.com/id/635811232/photo/hong-kong-aerial-by-night.jpg?s=612x612&w=0&k=20&c=ze8gWAmRjIHKT4lcDlTYpfmbHTsIX2VpfSQ7g2AvEIA=", alt: "" },
  { src: "https://media.istockphoto.com/id/497900492/photo/brisbane-at-night.jpg?s=612x612&w=0&k=20&c=5wg9-Au4kCA2SpymXQ7DbD9MKT-p0-AcvIe5Vn6-LKk=", alt: "" },
  { src: "https://img.magnific.com/free-photo/night-view-victoria-harbor-hong-kong_53876-146261.jpg?semt=ais_hybrid&w=740&q=80", alt: "" },
  { src: "https://images.unsplash.com/photo-1732984420521-ab1a2dca618b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "" },

  { src: "https://images.unsplash.com/photo-1714722804938-18717a9dc6dc?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "" },
  { src: "https://i.pinimg.com/736x/e9/09/79/e909795ea45014bd84fa34290dda7f42.jpg", alt: "" },
  { src: "https://i0.pickpik.com/photos/82/423/677/city-building-night-view-night-972312bce4a5e3faeb779be4a44b1c76.jpg", alt: "" },
  { src: "https://static.vecteezy.com/system/resources/thumbnails/056/162/843/small/a-city-at-night-with-tall-buildings-lit-up-free-photo.jpg", alt: "" },
  { src: "https://media.istockphoto.com/id/1127251935/photo/glass-window-with-glowing-crowded-city.jpg?s=612x612&w=0&k=20&c=uDLHiogKBY0KrxnbvfQQBMxBAR0llu4CxfF6_9QAYWI=", alt: "" },

  { src: "https://img.magnific.com/free-photo/skyline-night-view-city-urban-building_1150-2360.jpg?semt=ais_hybrid&w=740&q=80", alt: "" },
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