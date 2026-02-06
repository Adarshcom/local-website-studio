/* =========================
   PREMIUM TEXT REVEAL ENGINE
   (ONE-TIME, NO LAG)
========================= */

const textItems = document.querySelectorAll(
  ".hero-eyebrow, .hero-title, .hero-sub, h2, p, li"
);

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("text-visible");
      textObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -60px 0px"
  }
);

textItems.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.filter = "blur(6px)";
  el.style.transition = `
    opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s,
    transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s,
    filter 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s
  `;
  textObserver.observe(el);
});

/* =========================
   APPLY FINAL STATE
========================= */
const textMutationObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.target.classList.contains("text-visible")) {
      m.target.style.opacity = "1";
      m.target.style.transform = "translateY(0)";
      m.target.style.filter = "blur(0)";
    }
  });
});

textItems.forEach(el => {
  textMutationObserver.observe(el, { attributes: true });
});