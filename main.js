/**
 * Дарьяна Ушакова — интерактив: колода отзывов, кастомный курсор, рябь на кнопках
 */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Рябь (ripple) для .btn--ripple ---------- */
  function initRipple() {
    document.querySelectorAll(".btn--ripple").forEach(function (btn) {
      btn.addEventListener(
        "click",
        function (e) {
          if (prefersReducedMotion) return;
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          var ripple = document.createElement("span");
          ripple.className = "btn-ripple-fx";
          ripple.style.left = x + "px";
          ripple.style.top = y + "px";
          btn.appendChild(ripple);
          ripple.addEventListener("animationend", function () {
            ripple.remove();
          });
        },
        { passive: true }
      );
    });
  }

  /* ---------- Колодa отзывов (как стек карт) ---------- */
  function initTestimonialDeck() {
    var deck = document.getElementById("testimonial-deck");
    if (!deck) return;

    var cards = Array.prototype.slice.call(deck.querySelectorAll(".testimonial-card"));
    var order = cards.map(function (_, i) {
      return i;
    });

    function applyPositions() {
      var n = order.length;
      for (var i = 0; i < n; i++) {
        var card = cards[order[i]];
        card.classList.remove("testimonial-card--front", "testimonial-card--middle", "testimonial-card--back");
        if (i === 0) card.classList.add("testimonial-card--front");
        else if (i === 1) card.classList.add("testimonial-card--middle");
        else card.classList.add("testimonial-card--back");
      }
    }

    function shuffle() {
      order.push(order.shift());
      applyPositions();
    }

    applyPositions();

    var frontEl = function () {
      return cards[order[0]];
    };

    var startX = 0;
    var dragging = false;

    deck.addEventListener(
      "pointerdown",
      function (e) {
        var f = frontEl();
        if (!f || !f.contains(e.target)) return;
        if (e.button !== 0) return;
        dragging = true;
        startX = e.clientX;
        f.classList.add("testimonial-card--dragging");
        try {
          f.setPointerCapture(e.pointerId);
        } catch (err) {}
      },
      true
    );

    deck.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var f = frontEl();
      if (!f) return;
      var dx = e.clientX - startX;
      f.style.setProperty("--drag-x", dx + "px");
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      var f = frontEl();
      if (!f) return;
      f.classList.remove("testimonial-card--dragging");
      var dx = e.clientX - startX;
      f.style.removeProperty("--drag-x");
      if (dx < -120) {
        shuffle();
      }
      startX = 0;
    }

    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    var nextBtn = deck.querySelector(".testimonial-deck__next");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        shuffle();
      });
    }
  }

  /* ---------- Target cursor (без GSAP) ---------- */
  function initTargetCursor() {
    var root = document.getElementById("target-cursor");
    if (!root) return;

    var selector = ".cursor-target";
    var mobile =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (mobile || prefersReducedMotion) {
      root.setAttribute("hidden", "");
      return;
    }

    document.body.classList.add("has-custom-cursor");
    root.removeAttribute("hidden");

    var dot = root.querySelector(".target-cursor__dot");
    var corners = root.querySelectorAll(".target-cursor__corner");
    var mx = window.innerWidth / 2;
    var my = window.innerHeight / 2;
    var cx = mx;
    var cy = my;
    var activeEl = null;
    var strength = 0;

    var borderW = 3;
    var cornerSize = 12;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function findTarget(el) {
      while (el && el !== document.body) {
        if (el.matches && el.matches(selector)) return el;
        el = el.parentElement;
      }
      return null;
    }

    window.addEventListener(
      "mousemove",
      function (e) {
        mx = e.clientX;
        my = e.clientY;
        activeEl = findTarget(e.target);
      },
      { passive: true }
    );

    root.style.setProperty("--cursor-scale", "1");

    function tick() {
      cx = lerp(cx, mx, 0.22);
      cy = lerp(cy, my, 0.22);
      var sc = parseFloat(root.style.getPropertyValue("--cursor-scale"));
      if (isNaN(sc)) sc = 1;
      root.style.left = cx + "px";
      root.style.top = cy + "px";
      root.style.transform = "translate(-50%, -50%) scale(" + sc + ")";

      strength = lerp(strength, activeEl ? 1 : 0, 0.18);
      if (strength > 0.85) {
        root.classList.add("target-cursor--lock");
      } else {
        root.classList.remove("target-cursor--lock");
      }

      if (activeEl && strength > 0.05) {
        var rect = activeEl.getBoundingClientRect();
        var positions = [
          { x: rect.left - borderW - cx, y: rect.top - borderW - cy },
          { x: rect.right + borderW - cornerSize - cx, y: rect.top - borderW - cy },
          { x: rect.right + borderW - cornerSize - cx, y: rect.bottom + borderW - cornerSize - cy },
          { x: rect.left - borderW - cx, y: rect.bottom + borderW - cornerSize - cy }
        ];
        for (var i = 0; i < 4; i++) {
          var base = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ][i];
          var tx = lerp(base.x, positions[i].x, strength);
          var ty = lerp(base.y, positions[i].y, strength);
          corners[i].style.transform = "translate(" + tx + "px, " + ty + "px)";
        }
      } else {
        for (var j = 0; j < 4; j++) {
          var b = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ][j];
          corners[j].style.transform = "translate(" + b.x + "px, " + b.y + "px)";
        }
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);

    window.addEventListener(
      "mousedown",
      function () {
        if (dot) dot.style.transform = "translate(-50%, -50%) scale(0.75)";
        root.style.setProperty("--cursor-scale", "0.92");
      },
      { passive: true }
    );
    window.addEventListener(
      "mouseup",
      function () {
        if (dot) dot.style.transform = "translate(-50%, -50%) scale(1)";
        root.style.setProperty("--cursor-scale", "1");
      },
      { passive: true }
    );
  }

  initRipple();
  initTestimonialDeck();
  initTargetCursor();
})();
