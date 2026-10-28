/*
 * main.js
 * Renders project cards and contact links, and handles the mobile menu.
 * You normally don't need to edit this file: change js/projects.js and
 * js/profile.js instead.
 */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */

  // A link counts as "real" only if it is an http(s) URL.
  function isRealUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url.trim());
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function externalLink(href, className, text) {
    const a = el("a", className, text);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  /* ---------- Project cards ---------- */

  function createProjectCard(project, index) {
    const card = el("article", "project-card reveal");
    // Stagger cards that sit side by side in the same row
    card.style.setProperty("--delay", (index % 3) * 0.1 + "s");

    const figure = el("div", "project-media");
    const img = document.createElement("img");
    img.alt = project.alt || project.title;
    img.decoding = "async";
    // The first two cards may be visible on load; lazy-load the rest.
    if (index > 1) img.loading = "lazy";
    // Fade the image in once it has loaded (or failed, so alt text shows)
    function markLoaded() { img.classList.add("is-loaded"); }
    img.addEventListener("load", markLoaded);
    img.addEventListener("error", markLoaded);
    img.src = project.image;
    if (img.complete) markLoaded();
    figure.appendChild(img);

    const body = el("div", "project-body");
    if (project.category) body.appendChild(el("p", "project-category", project.category));
    body.appendChild(el("h3", "project-title", project.title));
    if (project.client) body.appendChild(el("p", "project-client", project.client));

    if (isRealUrl(project.driveUrl)) {
      const link = externalLink(project.driveUrl, "project-link", "See More ");
      link.appendChild(el("span", "arrow", "→"));
      link.setAttribute("aria-label", "See more of " + project.title + " on Google Drive (opens in a new tab)");
      body.appendChild(link);
    } else {
      const pending = el("span", "project-link is-disabled", "Link coming soon");
      pending.setAttribute("aria-disabled", "true");
      body.appendChild(pending);
    }

    card.append(figure, body);
    return card;
  }

  function renderProjects() {
    const grid = document.getElementById("project-grid");
    if (!grid || typeof projects === "undefined") return;

    const fragment = document.createDocumentFragment();
    projects.forEach(function (project, i) {
      fragment.appendChild(createProjectCard(project, i));
    });
    grid.appendChild(fragment);

    const count = document.getElementById("project-count");
    if (count) {
      count.textContent = projects.length;
      count.dataset.count = projects.length;
    }

    // "View full portfolio" button under the grid
    const more = document.getElementById("portfolio-more");
    if (more && typeof PORTFOLIO_DRIVE_URL !== "undefined" && isRealUrl(PORTFOLIO_DRIVE_URL)) {
      more.appendChild(externalLink(PORTFOLIO_DRIVE_URL, "btn btn-outline", "View Full Portfolio on Google Drive"));
    }
  }

  /* ---------- Contact & social ---------- */

  function renderContact() {
    if (typeof profile === "undefined") return;

    const actions = document.getElementById("contact-actions");
    if (actions) {
      if (profile.email) {
        const mail = el("a", "btn btn-primary", "Email Me");
        mail.href = "mailto:" + profile.email;
        actions.appendChild(mail);
        actions.appendChild(el("p", "contact-detail", profile.email));
      } else {
        actions.appendChild(el("p", "contact-detail placeholder", "Email: coming soon"));
      }
      if (profile.phone) {
        const tel = el("a", "contact-detail", profile.phone);
        tel.href = "tel:" + profile.phone.replace(/\s+/g, "");
        actions.appendChild(tel);
      }
    }

    ["contact-social", "footer-social"].forEach(function (id) {
      const list = document.getElementById(id);
      if (!list) return;
      (profile.social || []).forEach(function (item) {
        const li = el("li");
        if (isRealUrl(item.url)) {
          li.appendChild(externalLink(item.url, "social-link", item.label));
        } else {
          const span = el("span", "social-link is-disabled", item.label);
          span.title = item.label + " link coming soon";
          li.appendChild(span);
        }
        list.appendChild(li);
      });
    });
  }

  /* ---------- Mobile navigation ---------- */

  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu after picking a link
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    // Reset when resizing up to desktop
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- Animations ---------- */

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Counts a number up from 0, e.g. "4+" in the About stats
  function countUp(node) {
    const target = parseInt(node.dataset.count, 10);
    const suffix = node.dataset.suffix || "";
    if (isNaN(target) || reduceMotion) return;

    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Fades elements with class "reveal" up as they scroll into view
  function initReveal() {
    const items = document.querySelectorAll(".reveal");

    function show(node) {
      node.classList.add("is-visible");
      node.querySelectorAll("[data-count]").forEach(countUp);
    }

    if (!("IntersectionObserver" in window)) {
      items.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (item) { observer.observe(item); });
  }

  // Adds a soft shadow to the header once the page is scrolled
  function initHeaderShadow() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- Init ---------- */

  document.getElementById("year").textContent = new Date().getFullYear();
  renderProjects();
  renderContact();
  initNav();
  initReveal();
  initHeaderShadow();
})();
