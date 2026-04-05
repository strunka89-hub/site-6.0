/**
 * Electric Border — адаптация react-bits (canvas + шум), без React.
 * Вдохновлено Balint Ferenczy / CodePen.
 */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fract(n) {
    return n - Math.floor(n);
  }

  function random(x) {
    return fract(Math.sin(x * 12.9898) * 43758.5453);
  }

  function noise2D(x, y) {
    var i = Math.floor(x);
    var j = Math.floor(y);
    var fx = x - i;
    var fy = y - j;
    var a = random(i + j * 57);
    var b = random(i + 1 + j * 57);
    var c = random(i + (j + 1) * 57);
    var d = random(i + 1 + (j + 1) * 57);
    var ux = fx * fx * (3.0 - 2.0 * fx);
    var uy = fy * fy * (3.0 - 2.0 * fy);
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
  }

  function octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness, noise2Dfn) {
    var y = 0;
    var amplitude = baseAmplitude;
    var frequency = baseFrequency;
    for (var i = 0; i < octaves; i++) {
      var octaveAmplitude = amplitude;
      if (i === 0) {
        octaveAmplitude *= baseFlatness;
      }
      y += octaveAmplitude * noise2Dfn(frequency * x + seed * 100, time * frequency * 0.3);
      frequency *= lacunarity;
      amplitude *= gain;
    }
    return y;
  }

  function getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
    var angle = startAngle + progress * arcLength;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  }

  function getRoundedRectPoint(t, left, top, width, height, radius) {
    var straightWidth = width - 2 * radius;
    var straightHeight = height - 2 * radius;
    var cornerArc = (Math.PI * radius) / 2;
    var totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
    var distance = t * totalPerimeter;
    var accumulated = 0;

    if (distance <= accumulated + straightWidth) {
      var progress = (distance - accumulated) / straightWidth;
      return { x: left + radius + progress * straightWidth, y: top };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      progress = (distance - accumulated) / straightHeight;
      return { x: left + width, y: top + radius + progress * straightHeight };
    }
    accumulated += straightHeight;

    if (distance <= accumulated + cornerArc) {
      progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightWidth) {
      progress = (distance - accumulated) / straightWidth;
      return { x: left + width - radius - progress * straightWidth, y: top + height };
    }
    accumulated += straightWidth;

    if (distance <= accumulated + cornerArc) {
      progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress);
    }
    accumulated += cornerArc;

    if (distance <= accumulated + straightHeight) {
      progress = (distance - accumulated) / straightHeight;
      return { x: left, y: top + height - radius - progress * straightHeight };
    }
    accumulated += straightHeight;

    progress = (distance - accumulated) / cornerArc;
    return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
  }

  function parseColor(hex) {
    if (!hex || hex[0] !== "#") return { r: 125, g: 249, b: 255 };
    var h = hex.slice(1);
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16)
    };
  }

  function initElectricBorder(el) {
    if (!el || el.getAttribute("data-eb-init") === "1") return;
    el.setAttribute("data-eb-init", "1");

    var canvas = el.querySelector(".eb-canvas");
    var content = el.querySelector(".eb-content");
    if (!canvas || !content) return;

    var color = el.getAttribute("data-eb-color") || "#7df9ff";
    var speed = parseFloat(el.getAttribute("data-eb-speed") || "1", 10) || 1;
    var chaos = parseFloat(el.getAttribute("data-eb-chaos") || "0.12", 10) || 0.12;
    var borderRadius = parseFloat(el.getAttribute("data-eb-radius") || "16", 10) || 16;

    var rgb = parseColor(color);
    var strokeStyle = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

    el.style.setProperty("--electric-border-color", color);
    el.style.setProperty("--eb-radius", borderRadius + "px");

    if (reduced) {
      el.classList.add("electric-border--static");
      return;
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var octaves = 10;
    var lacunarity = 1.6;
    var gain = 0.7;
    var amplitude = chaos;
    var frequency = 10;
    var baseFlatness = 0;
    var displacement = 60;
    var borderOffset = 60;

    var timeRef = 0;
    var lastFrameTime = 0;
    var animationRef = null;
    var width = 0;
    var height = 0;

    function noise2Dbind(x, y) {
      return noise2D(x, y);
    }

    function octBind(x, t, seed) {
      return octavedNoise(
        x,
        octaves,
        lacunarity,
        gain,
        amplitude,
        frequency,
        t,
        seed,
        baseFlatness,
        noise2Dbind
      );
    }

    function updateSize() {
      var rect = el.getBoundingClientRect();
      var w = rect.width + borderOffset * 2;
      var h = rect.height + borderOffset * 2;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      width = w;
      height = h;
      return { width: w, height: h };
    }

    updateSize();

    function drawElectricBorder(currentTime) {
      if (!canvas || !ctx) return;

      var deltaTime = (currentTime - lastFrameTime) / 1000;
      if (lastFrameTime === 0) deltaTime = 0;
      lastFrameTime = currentTime;
      timeRef += deltaTime * speed;

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = parseFloat(el.getAttribute("data-eb-thickness") || "2", 10) || 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      var scale = displacement;
      var left = borderOffset;
      var top = borderOffset;
      var borderWidth = width - 2 * borderOffset;
      var borderHeight = height - 2 * borderOffset;
      var maxRadius = Math.min(borderWidth, borderHeight) / 2;
      var radius = Math.min(borderRadius, maxRadius);

      var approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      var sampleCount = Math.max(32, Math.floor(approximatePerimeter / 2));

      ctx.beginPath();

      for (var i = 0; i <= sampleCount; i++) {
        var progress = i / sampleCount;
        var point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
        var xNoise = octBind(progress * 8, timeRef, 0);
        var yNoise = octBind(progress * 8, timeRef, 1);
        var displacedX = point.x + xNoise * scale;
        var displacedY = point.y + yNoise * scale;
        if (i === 0) {
          ctx.moveTo(displacedX, displacedY);
        } else {
          ctx.lineTo(displacedX, displacedY);
        }
      }

      ctx.closePath();
      ctx.stroke();

      animationRef = requestAnimationFrame(drawElectricBorder);
    }

    var ro = new ResizeObserver(function () {
      updateSize();
    });
    ro.observe(el);

    requestAnimationFrame(function () {
      updateSize();
    });

    animationRef = requestAnimationFrame(drawElectricBorder);

    window.addEventListener(
      "beforeunload",
      function () {
        if (animationRef) cancelAnimationFrame(animationRef);
        ro.disconnect();
      },
      { once: true }
    );
  }

  function boot() {
    document.querySelectorAll("[data-electric-border]").forEach(initElectricBorder);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
