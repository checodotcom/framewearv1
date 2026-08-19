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

  const siteTitle = document.getElementById("site-title");
  if (siteTitle) siteTitle.textContent = BRAND_NAME;

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

function setupNavDropdown(toggleId, dropdownId) {
  const toggle = document.getElementById(toggleId);
  const dropdown = document.getElementById(dropdownId);
  if (!toggle || !dropdown) return;

  function closeMenu({ returnFocus = true } = {}) {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener("click", (event) => {
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    // event.detail is 0 for a keyboard-triggered click (Enter/Space) and
    // >=1 for a real mouse click. Only move focus for the keyboard case,
    // so mouse users don't get a focus-visible ring they didn't ask for.
    const isKeyboardActivated = event.detail === 0;
    if (isOpen) {
      if (isKeyboardActivated) {
        const firstLink = dropdown.querySelector(".nav-link");
        if (firstLink) firstLink.focus();
      } else {
        toggle.blur();
      }
    } else if (isKeyboardActivated) {
      toggle.focus();
    } else {
      toggle.blur();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.classList.contains("is-open")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      dropdown.classList.contains("is-open") &&
      !dropdown.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      closeMenu({ returnFocus: false });
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
