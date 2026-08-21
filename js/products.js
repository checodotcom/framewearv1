const PLACEHOLDER_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const PRODUCTS = [
  {
    name: "Exercise 1",
    details: [
      { label: "Material", text: "100% high-grade wool body." },
      {
        label: "Technical details",
        text: "Heavyweight, water-repellent green nylon utility pockets on the front.",
      },
      {
        label: "Fit & origin",
        text: "Re-engineered from a 1937 archival silhouette, refined for a contemporary fit.",
      },
    ],
    price: 1000000,
    currency: "$",
    sizes: ["REGULAR", "PLUS"],
    detailImage: "assets/images/ChatGPT Image Aug 20, 2026, 03_50_29 PM.png",
  },
  {
    name: "Exercise 2",
    description: PLACEHOLDER_DESCRIPTION,
    price: 850000,
    currency: "$",
    sizes: ["REGULAR", "PLUS"],
  },
  {
    name: "Exercise 3",
    description: PLACEHOLDER_DESCRIPTION,
    price: 975000,
    currency: "$",
    sizes: ["REGULAR", "PLUS"],
  },
];

let activeIndex = 0;

function renderCarouselPositions() {
  document.querySelectorAll(".carousel-item").forEach((item) => {
    const i = Number(item.dataset.index);
    const rel = (i - activeIndex + PRODUCTS.length) % PRODUCTS.length;
    item.classList.remove(
      "carousel-item--active",
      "carousel-item--next",
      "carousel-item--prev"
    );
    if (rel === 0) {
      item.classList.add("carousel-item--active");
    } else if (rel === 1) {
      item.classList.add("carousel-item--next");
    } else {
      item.classList.add("carousel-item--prev");
    }
  });
}

function renderActiveProduct() {
  const product = PRODUCTS[activeIndex];

  document.getElementById("product-price").textContent =
    product.currency + formatPrice(product.price);

  const dropdown = document.getElementById("size-dropdown");
  const toggle = document.getElementById("size-toggle");
  dropdown.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  dropdown.innerHTML = "";
  product.sizes.forEach((size) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "size-option";
    btn.textContent = size;
    btn.dataset.size = size;
    btn.setAttribute("aria-pressed", "false");
    li.appendChild(btn);
    dropdown.appendChild(li);
  });

  const infoDropdown = document.getElementById("info-dropdown");
  const infoToggle = document.getElementById("info-toggle");
  infoDropdown.classList.remove("is-open");
  infoToggle.setAttribute("aria-expanded", "false");
  document.getElementById("info-title").textContent = product.name;

  const infoDescription = document.getElementById("info-description");
  infoDescription.innerHTML = "";
  if (product.details) {
    product.details.forEach(({ label, text }) => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = `${label}: `;
      p.appendChild(strong);
      p.appendChild(document.createTextNode(text));
      infoDescription.appendChild(p);
    });
  } else {
    const p = document.createElement("p");
    p.textContent = product.description;
    infoDescription.appendChild(p);
  }

  const detailDropdown = document.getElementById("detail-dropdown");
  const detailToggle = document.getElementById("detail-toggle");
  detailDropdown.classList.remove("is-open");
  detailToggle.setAttribute("aria-expanded", "false");
  detailDropdown.innerHTML = "";
  if (product.detailImage) {
    const img = document.createElement("img");
    img.className = "detail-image";
    img.src = product.detailImage;
    img.alt = `${product.name} detail`;
    detailDropdown.appendChild(img);
  } else {
    const missing = document.createElement("p");
    missing.className = "detail-missing";
    missing.textContent = "missing images";
    detailDropdown.appendChild(missing);
  }
}

function goToProduct(index) {
  activeIndex = ((index % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length;
  renderCarouselPositions();
  renderActiveProduct();
}

function setupSoldOutButton() {
  const btn = document.getElementById("buy-btn");
  const label = document.getElementById("buy-btn-label");
  const REAPPEAR_DELAY = 500;
  let isAnimating = false;

  btn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    label.classList.add("is-hidden");
    setTimeout(() => {
      label.classList.remove("is-hidden");
      isAnimating = false;
    }, REAPPEAR_DELAY);
  });
}

function setupInfoDropdown() {
  const toggle = document.getElementById("info-toggle");
  const dropdown = document.getElementById("info-dropdown");

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      const sizeDropdown = document.getElementById("size-dropdown");
      const sizeToggle = document.getElementById("size-toggle");
      sizeDropdown.classList.remove("is-open");
      sizeToggle.setAttribute("aria-expanded", "false");

      const detailDropdown = document.getElementById("detail-dropdown");
      const detailToggle = document.getElementById("detail-toggle");
      detailDropdown.classList.remove("is-open");
      detailToggle.setAttribute("aria-expanded", "false");
    }
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
      !toggle.contains(event.target)
    ) {
      closeDropdown();
    }
  });
}

function setupDetailDropdown() {
  const toggle = document.getElementById("detail-toggle");
  const dropdown = document.getElementById("detail-dropdown");

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      const sizeDropdown = document.getElementById("size-dropdown");
      const sizeToggle = document.getElementById("size-toggle");
      sizeDropdown.classList.remove("is-open");
      sizeToggle.setAttribute("aria-expanded", "false");

      const infoDropdown = document.getElementById("info-dropdown");
      const infoToggle = document.getElementById("info-toggle");
      infoDropdown.classList.remove("is-open");
      infoToggle.setAttribute("aria-expanded", "false");
    }
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
      !toggle.contains(event.target)
    ) {
      closeDropdown();
    }
  });
}

function setupCarousel() {
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  prevBtn.addEventListener("click", () => goToProduct(activeIndex - 1));
  nextBtn.addEventListener("click", () => goToProduct(activeIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      goToProduct(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      goToProduct(activeIndex + 1);
    }
  });

  let touchStartX = null;

  track.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const SWIPE_THRESHOLD = 40;
      if (deltaX <= -SWIPE_THRESHOLD) {
        goToProduct(activeIndex + 1);
      } else if (deltaX >= SWIPE_THRESHOLD) {
        goToProduct(activeIndex - 1);
      }
      touchStartX = null;
    },
    { passive: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderBrand();
  renderCarouselPositions();
  renderActiveProduct();
  setupCarousel();
  setupSoldOutButton();
  setupInfoDropdown();
  setupDetailDropdown();
  setupNavLinks();
  setupNavDropdown("nav-toggle", "site-nav-dropdown");
  setupSizeDropdown();
});
