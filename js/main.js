const PRODUCT = {
  name: "1",
  description: "",
  price: 1000000,
  currency: "$",
  sizes: ["S", "M", "L", "XL"],
  image: "assets/images/producto-1.png",
  altText: `${BRAND_NAME} Jacket Reflective`,
};

function renderProduct() {
  const img = document.getElementById("product-image");
  img.src = PRODUCT.image;
  img.alt = PRODUCT.altText;

  document.getElementById("product-price").textContent =
    PRODUCT.currency + formatPrice(PRODUCT.price);

  const dropdown = document.getElementById("size-dropdown");
  dropdown.innerHTML = "";
  PRODUCT.sizes.forEach((size) => {
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
}

document.addEventListener("DOMContentLoaded", () => {
  renderBrand();
  renderProduct();
  setupNavLinks();
  setupMobileMenu();
  setupSizeDropdown();
});
