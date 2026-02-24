const header = document.querySelector("[data-header]");
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");
const scrollTopBtn = document.querySelector("#scroll-top");

const toggleNav = () => {
  if (!navbar || !overlay) {
    return;
  }

  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

navTogglers.forEach((btn) => {
  btn.addEventListener("click", toggleNav);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navbar || !overlay) {
      return;
    }

    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  });
});

const handleScroll = () => {
  if (header) {
    header.classList.toggle("active", window.scrollY > 60);
  }

  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("active", window.scrollY > 420);
  }
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

const sectionLinks = document.querySelectorAll(".navbar-link[data-nav-link]");
const sections = Array.from(document.querySelectorAll("section[id]"));

const highlightNav = () => {
  const scrollPosition = window.scrollY + 140;
  let currentSection = sections[0];

  for (const section of sections) {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section;
    }
  }

  if (!currentSection) {
    return;
  }

  sectionLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection.id}`,
    );
  });
};

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

const smoothAnchors = document.querySelectorAll('a[href^="#"]');

smoothAnchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

revealDelayElements.forEach((element) => {
  element.style.transitionDelay = element.dataset.revealDelay || "0s";
});

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("revealed"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("revealed"));
}

const baseTitle = document.title;

document.addEventListener("visibilitychange", () => {
  document.title = baseTitle;
});
