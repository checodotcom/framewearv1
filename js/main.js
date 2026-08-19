function renderHomeWord() {
  const word = document.getElementById("home-word");
  if (word) word.textContent = BRAND_NAME;
}

document.addEventListener("DOMContentLoaded", () => {
  renderBrand();
  renderHomeWord();
  setupNavLinks();
  setupMobileMenu();
});
