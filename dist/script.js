(() => {
  "use strict";

  document.documentElement.classList.add("js");
  const body = document.body;
  const intro = document.getElementById("intro");
  const progress = document.getElementById("intro-progress-bar");
  const introStatus = document.getElementById("intro-status");
  const skipIntro = document.getElementById("skip-intro");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let introClosed = false;

  const closeIntro = () => {
    if (introClosed) return;
    introClosed = true;
    body.classList.remove("intro-locked");
    intro.classList.add("is-complete");
    window.setTimeout(() => intro.remove(), 1000);
  };

  body.classList.add("intro-locked");
  skipIntro?.addEventListener("click", closeIntro);

  if (reducedMotion) {
    progress.style.width = "100%";
    introStatus.textContent = "LINK READY";
    window.setTimeout(closeIntro, 550);
  } else {
    const stages = [
      ["CALIBRATING ORBITAL SIGNAL", 18],
      ["SYNCING STUDENT NETWORK", 48],
      ["OPENING INDUSTRY CHANNEL", 77],
      ["LINK READY", 100],
    ];
    stages.forEach(([label, percent], index) => {
      window.setTimeout(() => {
        introStatus.textContent = label;
        progress.style.width = `${percent}%`;
      }, index * 720 + 220);
    });
    window.setTimeout(closeIntro, 3300);
  }

  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const cursorOrb = document.getElementById("cursor-orb");
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    const visual = document.querySelector(".hero-visual");
    if (visual && window.innerWidth > 900) {
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.setProperty("--tilt-x", `${x * 4}deg`);
      visual.style.setProperty("--tilt-y", `${y * -4}deg`);
    }
  }, { passive: true });

  const canvas = document.getElementById("starfield");
  const context = canvas?.getContext("2d");
  if (canvas && context) {
    let width = 0;
    let height = 0;
    let stars = [];
    const starCount = Math.min(145, Math.max(70, Math.round(window.innerWidth / 10)));
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2 + 0.25,
        alpha: Math.random() * 0.6 + 0.12,
        twinkle: Math.random() * 0.014 + 0.003,
        drift: Math.random() * 0.08 + 0.015,
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.y += star.drift;
        if (star.y > height + 3) { star.y = -3; star.x = Math.random() * width; }
        if (!reducedMotion) star.alpha += Math.sin(performance.now() * star.twinkle) * 0.002;
        context.beginPath();
        context.fillStyle = `rgba(243, 226, 197, ${Math.max(0.04, star.alpha)})`;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      });
      if (!reducedMotion) window.requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    draw();
  }
})();

