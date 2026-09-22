(function () {
  'use strict';

  function initHorizontalScroll() {
    const viewport = document.getElementById('hscrollViewport');
    const track = document.getElementById('track');
    const prevBtn = document.getElementById('hscrollPrev');
    const nextBtn = document.getElementById('hscrollNext');
    const nav = document.querySelector('.hscroll-nav');

    if (!viewport || !track || !prevBtn || !nextBtn) return; // guard: section not on this page

    const cards = Array.from(track.children);
    if (!cards.length) return;

    let index = 0;
    let maxIndex = 0;
    let step = 0;
    let maxTranslate = 0;
    let isAnimating = false;
    let animLock = null;

    function currentGap() {
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap);
      return Number.isNaN(gap) ? 0 : gap;
    }

    function measure() {
      const gap = currentGap();
      const cardWidth = cards[0].getBoundingClientRect().width;
      step = cardWidth + gap;

      const trackWidth = track.scrollWidth;
      const viewportWidth = viewport.clientWidth;
      maxTranslate = Math.min(0, viewportWidth - trackWidth);
      maxIndex = step > 0 ? Math.max(0, Math.ceil(Math.abs(maxTranslate) / step)) : 0;

      index = Math.min(index, maxIndex);

      if (nav) nav.style.display = maxIndex <= 0 ? 'none' : 'flex';

      applyPosition(false);
    }

    function targetX() {
      return Math.max(maxTranslate, -index * step);
    }

    function applyPosition(animate) {
      if (!animate) {
        const prevTransition = track.style.transition;
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + targetX() + 'px)';
        void track.offsetWidth; // force reflow before restoring transition
        track.style.transition = prevTransition || '';
      } else {
        track.style.transform = 'translateX(' + targetX() + 'px)';
      }
      updateActiveCard();
      updateButtons();
    }

    function updateActiveCard() {
      cards.forEach(function (card, i) {
        card.classList.toggle('is-active', i === index);
      });
    }

    function updateButtons() {
      const x = targetX();
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = x <= maxTranslate + 0.5;
    }

    function go(delta) {
      if (isAnimating || maxIndex <= 0) return;
      const next = Math.max(0, Math.min(maxIndex, index + delta));
      if (next === index) return;

      index = next;
      isAnimating = true;
      applyPosition(true);

      clearTimeout(animLock);
      animLock = setTimeout(function () {
        isAnimating = false;
      }, 650); // safety net in case transitionend doesn't fire (e.g. reduced-motion users)
    }

    function onTransitionEnd(e) {
      if (e.target === track && e.propertyName === 'transform') {
        isAnimating = false;
        clearTimeout(animLock);
      }
    }

    prevBtn.addEventListener('click', function () { go(-1); });
    nextBtn.addEventListener('click', function () { go(1); });
    track.addEventListener('transitionend', onTransitionEnd);

    // keyboard support when the carousel region is focused
    viewport.setAttribute('tabindex', '0');
    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });

    // debounced resize handling so orientation changes / DevTools resizing don't break bounds
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    });

    measure();
    // re-measure after full load in case webfonts/images shift layout slightly
    window.addEventListener('load', measure);
  }

  document.addEventListener('DOMContentLoaded', initHorizontalScroll);
})();