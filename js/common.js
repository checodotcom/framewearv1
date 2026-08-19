const BRAND_NAME = "panoramica";
const COPYRIGHT_YEAR = 2026;
const DEVELOPER_CREDIT = "checodotcom";

function formatPrice(amount) {
  return amount.toLocaleString("en-US");
}

function renderBrand() {
  document.title = BRAND_NAME;
  const logo = document.getElementById("brand-logo");
  if (logo) logo.alt = BRAND_NAME;

  const footerText = document.getElementById("footer-text");
  if (footerText) {
    footerText.textContent = `${BRAND_NAME} © ${COPYRIGHT_YEAR}. developed by ${DEVELOPER_CREDIT}`;
  }
}

function setupNavLinks() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  function closeMenu() {
    nav.classList.remove("nav--open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      const firstLink = nav.querySelector(".nav-link");
      if (firstLink) firstLink.focus();
    } else {
      toggle.focus();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("nav--open")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("nav--open") &&
      !nav.contains(event.target) &&
      event.target !== toggle
    ) {
      closeMenu();
    }
  });
}

function setupSizeDropdown() {
  const toggle = document.getElementById("size-toggle");
  const dropdown = document.getElementById("size-dropdown");

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      const infoDropdown = document.getElementById("info-dropdown");
      const infoToggle = document.getElementById("info-toggle");
      if (infoDropdown && infoToggle) {
        infoDropdown.classList.remove("is-open");
        infoToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  dropdown.addEventListener("click", (event) => {
    const button = event.target.closest(".size-option");
    if (!button) return;
    dropdown.querySelectorAll(".size-option").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.classList.contains("is-open")) {
      closeDropdown();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      dropdown.classList.contains("is-open") &&
      !dropdown.contains(event.target) &&
      event.target !== toggle
    ) {
      closeDropdown();
    }
  });
}
