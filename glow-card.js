/**
 * GlowCard — следование «прожектора» за курсором (адаптация React-компонента).
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setVars(el, x, y, w, h) {
    el.style.setProperty("--x", x.toFixed(2));
    el.style.setProperty("--y", y.toFixed(2));
    el.style.setProperty("--xp", (x / w).toFixed(4));
    el.style.setProperty("--yp", (y / h).toFixed(4));
  }

  function initCenter() {
    var w = window.innerWidth || 1;
    var h = window.innerHeight || 1;
    document.querySelectorAll(".glow-card").forEach(function (el) {
      setVars(el, w / 2, h / 2, w, h);
    });
  }

  function onPointer(e) {
    if (reduced) return;
    var w = window.innerWidth || 1;
    var h = window.innerHeight || 1;
    var x = e.clientX;
    var y = e.clientY;
    document.querySelectorAll(".glow-card").forEach(function (el) {
      setVars(el, x, y, w, h);
    });
  }

  initCenter();
  window.addEventListener("resize", initCenter, { passive: true });
  if (!reduced) {
    document.addEventListener("pointermove", onPointer, { passive: true });
  }
})();
