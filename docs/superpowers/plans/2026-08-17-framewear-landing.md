# Framewear Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single functional page (`home`) of the Framewear landing site: wordmark, placeholder nav (`home`/`products`/`about`/`contact`), the product ("1") with image, price, Buy button and a size dropdown (S/M/L/XL), responsive between a desktop sidebar nav and a mobile floating hamburger menu.

**Architecture:** Static vanilla HTML/CSS/JS, no build step, no framework, no npm dependencies. Self-hosted fonts (no third-party font CDN at runtime). One HTML page, one stylesheet, one script file, each with a single responsibility.

**Tech Stack:** HTML5, CSS3 (media queries, `:focus-visible`, `prefers-reduced-motion`), vanilla ES6 JS (`DOMContentLoaded`, no libraries).

## Global Constraints

- No build step, no framework, no npm/package dependencies — plain static files only.
- Fonts are self-hosted under `assets/fonts/` — do not load fonts from a third-party CDN at runtime.
- Brand name and product data are centralized as constants in `js/main.js` (`BRAND_NAME`, `PRODUCT`) — no hardcoded "Framewear" strings elsewhere.
- Palette is strictly monochrome: background `#ffffff`, primary text `#6b6b6b`, secondary/muted text `#a3a3a3`. No accent color anywhere in the UI (the only color on the page is the product photo itself).
- Typography: display = Panchang weight 600, body = General Sans weights 400/500.
- Nav item order is exactly: `home`, `products`, `about`, `contact`. All four are placeholder links (`preventDefault()`, no destination).
- Mobile breakpoint: `max-width: 768px`.
- Accessibility floor: visible `:focus-visible` outline on every interactive element, `aria-expanded` on the hamburger button and the "more" (size) button, `prefers-reduced-motion` respected for any transition, descriptive `alt` text on the product image.
- Out of scope: checkout/payments, backend, functional `products`/`about`/`contact` pages, CMS, deployment/hosting.
- **No automated test framework** — this is a zero-dependency static site by design (see spec §11), so "tests" in this plan are concrete manual verification steps run through the browser preview tool, not a unit test suite. Do not introduce a test runner/npm to satisfy this.
- **Do not run `git commit` after each task.** The user asked to batch commits and only commit when explicitly told to. Track progress via the plan's checkboxes instead; skip every "Commit" step this plan would otherwise imply.

Spec reference: `docs/superpowers/specs/2026-08-17-framewear-landing-design.md`

---

## File Structure

```
/index.html                              — page markup (Task 2)
/css/style.css                           — all styling (Task 3)
/js/main.js                              — brand/product constants + behavior (Task 4)
/favicon.svg                             — browser tab icon (Task 1)
/.claude/launch.json                     — local static server config for preview (Task 1)
/assets/
  images/producto-1.png                  — cropped, transparent-background product photo (Task 1)
  fonts/panchang/panchang-semibold.woff2 — self-hosted display font (Task 1)
  fonts/general-sans/general-sans-regular.woff2 — self-hosted body font, weight 400 (Task 1)
  fonts/general-sans/general-sans-medium.woff2  — self-hosted body font, weight 500 (Task 1)
```

---

### Task 1: Project scaffold — fonts, product image, favicon, preview config

**Files:**
- Create: `assets/fonts/panchang/panchang-semibold.woff2`
- Create: `assets/fonts/general-sans/general-sans-regular.woff2`
- Create: `assets/fonts/general-sans/general-sans-medium.woff2`
- Create: `assets/images/producto-1.png`
- Create: `favicon.svg`
- Create: `.claude/launch.json`
- Create: `css/style.css` (empty placeholder, filled in Task 3)
- Create: `js/main.js` (empty placeholder, filled in Task 4)

**Interfaces:**
- Produces: `assets/images/producto-1.png` (path referenced by `PRODUCT.image` in Task 4), the three `.woff2` files (referenced by `@font-face` `src` in Task 3), `.claude/launch.json` config named `framewear-static` (used by every later task's verification step).

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p "/Users/sergioherrasti/Desktop/Framewear/assets/fonts/panchang" \
         "/Users/sergioherrasti/Desktop/Framewear/assets/fonts/general-sans" \
         "/Users/sergioherrasti/Desktop/Framewear/assets/images" \
         "/Users/sergioherrasti/Desktop/Framewear/css" \
         "/Users/sergioherrasti/Desktop/Framewear/js" \
         "/Users/sergioherrasti/Desktop/Framewear/.claude"
```

- [ ] **Step 2: Download the self-hosted font files**

These are the exact, stable direct CDN file URLs resolved from Fontshare's API for Panchang/600 and General Sans/400+500 (verified reachable during planning):

```bash
curl -sL "https://cdn.fontshare.com/wf/VFK4WJ2ASLGVJIGPTOYHEAIT3DW643RW/6EOQ664MDO34ATBE2MF2I4O67G7EU7JM/5CZKGRVOJ2H4RNXBVGN3P4FD5ZWCYM54.woff2" \
  -o "/Users/sergioherrasti/Desktop/Framewear/assets/fonts/panchang/panchang-semibold.woff2"

curl -sL "https://cdn.fontshare.com/wf/MFQT7HFGCR2L5ULQTW6YXYZXXHMPKLJ3/YWQ244D6TACUX5JBKATPOW5I5MGJ3G73/7YY3ZAAE3TRV2LANYOLXNHTPHLXVWTKH.woff2" \
  -o "/Users/sergioherrasti/Desktop/Framewear/assets/fonts/general-sans/general-sans-regular.woff2"

curl -sL "https://cdn.fontshare.com/wf/3RZHWSNONLLWJK3RLPEKUZOMM56GO4LJ/BPDRY7AHVI3MCDXXVXTQQ76H3UXA63S3/SB2OEB6IKZPRR6JT4GFJ2TFT6HBB6AZN.woff2" \
  -o "/Users/sergioherrasti/Desktop/Framewear/assets/fonts/general-sans/general-sans-medium.woff2"
```

- [ ] **Step 3: Verify the font files downloaded correctly**

Run: `file /Users/sergioherrasti/Desktop/Framewear/assets/fonts/panchang/*.woff2 /Users/sergioherrasti/Desktop/Framewear/assets/fonts/general-sans/*.woff2`
Expected: all three report `Web Open Font Format (Version 2)` — not `HTML document` or `ASCII text` (which would mean the download failed and saved an error page instead).

- [ ] **Step 4: Copy the transparent product photo**

```bash
cp "/Users/sergioherrasti/Desktop/Framewear/Assets/ChatGPT Image Aug 17, 2026, 09_02_39 PM.png" \
   "/Users/sergioherrasti/Desktop/Framewear/assets/images/producto-1.png"
```

- [ ] **Step 5: Create the favicon**

Write to `/Users/sergioherrasti/Desktop/Framewear/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#ffffff"/>
  <text x="16" y="23" font-family="Georgia, 'Times New Roman', serif" font-size="21" font-weight="600" fill="#6b6b6b" text-anchor="middle">F</text>
</svg>
```

(Uses a system serif rather than Panchang — browser tab favicons don't reliably load web fonts, so this keeps the monogram legible everywhere.)

- [ ] **Step 6: Create the static preview server config**

Write to `/Users/sergioherrasti/Desktop/Framewear/.claude/launch.json`:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "framewear-static",
      "runtimeExecutable": "python3",
      "runtimeArgs": ["-m", "http.server", "4173"],
      "port": 4173
    }
  ]
}
```

- [ ] **Step 7: Create placeholder stylesheet and script files**

Write to `/Users/sergioherrasti/Desktop/Framewear/css/style.css`:

```css
/* Framewear styles — filled in Task 3 */
```

Write to `/Users/sergioherrasti/Desktop/Framewear/js/main.js`:

```js
// Framewear behavior — filled in Task 4
```

- [ ] **Step 8: Verify the full scaffold**

Run: `find /Users/sergioherrasti/Desktop/Framewear -maxdepth 4 \( -path "*/assets/*" -o -path "*/css/*" -o -path "*/js/*" -o -name "favicon.svg" -o -path "*/.claude/*" \) -type f`
Expected output includes exactly these 8 files: the 3 `.woff2` files, `producto-1.png`, `favicon.svg`, `.claude/launch.json`, `css/style.css`, `js/main.js`.

---

### Task 2: HTML structure

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: `css/style.css` (linked), `js/main.js` (linked, `defer`), `favicon.svg` (linked) — all created in Task 1.
- Produces: DOM element IDs/classes that Task 3 (CSS) and Task 4 (JS) depend on: `.page`, `.site-header`, `.wordmark[data-brand-name]`, `#menu-toggle` (with `.hamburger`, `.hamburger-line` children), `#site-nav` (with `.nav-link` children), `.product-main`, `#product-image`, `#product-price`, `.buy-btn`, `#size-toggle` (`.more-btn`), `#size-dropdown` (`.size-select` wrapper), `.sr-only`.

- [ ] **Step 1: Write `index.html`**

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Framewear</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="page">
    <header class="site-header">
      <h1 class="wordmark" data-brand-name></h1>
      <button class="hamburger" id="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="sr-only">Menú</span>
      </button>
    </header>

    <nav class="site-nav" id="site-nav">
      <a href="#" class="nav-link">home</a>
      <a href="#" class="nav-link">products</a>
      <a href="#" class="nav-link">about</a>
      <a href="#" class="nav-link">contact</a>
    </nav>

    <main class="product-main">
      <img class="product-image" id="product-image" src="" alt="">
      <div class="price-row">
        <span class="price" id="product-price"></span>
        <button class="buy-btn" type="button">Buy</button>
      </div>
      <div class="size-select">
        <button class="more-btn" id="size-toggle" type="button" aria-expanded="false" aria-controls="size-dropdown">more</button>
        <ul class="size-dropdown" id="size-dropdown" hidden></ul>
      </div>
    </main>
  </div>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Verify the structure renders**

Start the preview server and load the page:

```
preview_start({ name: "framewear-static" })
```

Then use `get_page_text` and `read_page` (filter: "all") on the served page. Expected:
- `read_page` shows the DOM tree with all elements listed in "Produces" above present, in the order: header (wordmark, hamburger) → nav (4 links: home, products, about, contact) → main (image, price row with Buy button, size-select with "more" button and empty `<ul>`).
- `read_console_messages` shows no errors (the page references `css/style.css` and `js/main.js`, both of which now exist from Task 1, so there should be no 404s).
- The page is visibly unstyled (no CSS rules applied yet) — that's expected at this point, not a bug.

---

### Task 3: Full styling — layout, typography, palette, responsive behavior

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: the exact class/ID names produced by Task 2's `index.html`, and the font file paths produced by Task 1.
- Produces: `.nav--open` class (toggled by Task 4's JS to show the mobile floating menu), `.size-dropdown[hidden]` visibility rule (toggled via the native `hidden` attribute by Task 4's JS), `.is-selected` class on `.size-option` (toggled by Task 4's JS).

- [ ] **Step 1: Write `css/style.css`**

```css
@font-face {
  font-family: 'Panchang';
  src: url('../assets/fonts/panchang/panchang-semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'General Sans';
  src: url('../assets/fonts/general-sans/general-sans-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'General Sans';
  src: url('../assets/fonts/general-sans/general-sans-medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  background: #ffffff;
  color: #6b6b6b;
  font-family: 'General Sans', sans-serif;
  font-weight: 400;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

a, button {
  font-family: inherit;
  color: inherit;
}

:focus-visible {
  outline: 2px solid #6b6b6b;
  outline-offset: 3px;
}

.page {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 40px 64px;
}

.site-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.wordmark {
  font-family: 'Panchang', serif;
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 0.02em;
  margin: 0;
}

.hamburger {
  display: none;
}

.site-nav {
  position: absolute;
  top: 48px;
  left: 40px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  text-decoration: none;
}

.nav-link::before {
  content: "";
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid #6b6b6b;
  flex-shrink: 0;
}

.product-main {
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  width: 260px;
  height: auto;
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 18px;
  font-size: 16px;
  margin-bottom: 18px;
}

.buy-btn {
  border: 1px solid #6b6b6b;
  background: transparent;
  padding: 8px 26px;
  font-size: 13px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.buy-btn:hover {
  background: #6b6b6b;
  color: #ffffff;
}

.size-select {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.more-btn {
  border: none;
  background: none;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #a3a3a3;
  cursor: pointer;
  padding: 4px 8px;
}

.more-btn:hover {
  color: #6b6b6b;
}

.size-dropdown {
  position: absolute;
  top: 100%;
  margin-top: 8px;
  list-style: none;
  padding: 8px 0;
  border: 1px solid #e5e5e5;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  min-width: 100px;
}

.size-dropdown[hidden] {
  display: none;
}

.size-option {
  border: none;
  background: none;
  padding: 8px 16px;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.size-option:hover {
  background: #f5f5f5;
}

.size-option.is-selected {
  color: #ffffff;
  background: #6b6b6b;
}

@media (max-width: 768px) {
  .page {
    padding: 24px 20px 40px;
  }

  .site-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wordmark {
    font-size: 22px;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    right: 0;
    top: 2px;
    border: none;
    background: none;
    padding: 4px;
    cursor: pointer;
  }

  .hamburger-line {
    width: 20px;
    height: 2px;
    background: #6b6b6b;
    display: block;
  }

  .site-nav {
    display: none;
    position: absolute;
    top: 34px;
    right: 20px;
    left: auto;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 14px;
    padding: 14px 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    z-index: 10;
  }

  .site-nav.nav--open {
    display: flex;
  }

  .product-image {
    width: 190px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .buy-btn {
    transition: none;
  }
}
```

- [ ] **Step 2: Verify desktop layout (1280×800)**

```
preview_start({ name: "framewear-static" })
navigate to the served URL, then:
computer({ action: "screenshot" })
```

Expected, matching the approved mockup:
- White background, grey (`#6b6b6b`) wordmark "Framewear" in a serif display face, centered near the top.
- Nav (`home`, `products`, `about`, `contact`, each with a small left-pointing triangle) positioned at the top-left, its top edge level with the top of the wordmark — not shifted downward.
- Product image, price "$..." + "Buy" button, and "more" all centered directly under the wordmark (not shifted right by the nav column).
- Hamburger icon not visible.

Also run `read_network_requests` filtered to `.woff2` and confirm all three font requests return status 200 (not 404) — confirms self-hosted `@font-face` paths resolve correctly.

- [ ] **Step 3: Verify mobile layout (375×812)**

```
resize_window({ preset: "mobile" })
```

then reload and screenshot again. Expected:
- Nav is not visible by default (no `.nav--open` class yet — Task 4 will add the toggle).
- Hamburger icon visible top-right.
- Wordmark centered, smaller (22px), product content centered below at the narrower image width (190px).

---

### Task 4: Behavior — brand/product rendering, nav placeholders, mobile menu, size dropdown

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: `BRAND_NAME`, `PRODUCT` (defined in this same file — this task both defines and consumes them), the DOM structure from Task 2, the `.nav--open` / `[hidden]` / `.is-selected` CSS hooks from Task 3.
- Produces: populated `document.title`, populated `.wordmark` text, populated `#product-image` / `#product-price` / `#size-dropdown` content — nothing later in this plan depends on these beyond final verification.

- [ ] **Step 1: Write `js/main.js`**

```js
const BRAND_NAME = "Framewear";

const PRODUCT = {
  name: "1",
  description: "",
  price: 1000000,
  currency: "$",
  sizes: ["S", "M", "L", "XL"],
  image: "assets/images/producto-1.png",
};

function formatPrice(amount) {
  return amount.toLocaleString("en-US");
}

function renderBrand() {
  document.title = BRAND_NAME;
  document.querySelectorAll("[data-brand-name]").forEach((el) => {
    el.textContent = BRAND_NAME;
  });
}

function renderProduct() {
  const img = document.getElementById("product-image");
  img.src = PRODUCT.image;
  img.alt = PRODUCT.name;

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
    btn.setAttribute("aria-selected", "false");
    li.appendChild(btn);
    dropdown.appendChild(li);
  });
}

function setupNavLinks() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

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
}

function setupSizeDropdown() {
  const toggle = document.getElementById("size-toggle");
  const dropdown = document.getElementById("size-dropdown");

  toggle.addEventListener("click", () => {
    const isHidden = dropdown.hasAttribute("hidden");
    if (isHidden) {
      dropdown.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
    } else {
      dropdown.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  dropdown.addEventListener("click", (event) => {
    const button = event.target.closest(".size-option");
    if (!button) return;
    dropdown.querySelectorAll(".size-option").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-selected", String(selected));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderBrand();
  renderProduct();
  setupNavLinks();
  setupMobileMenu();
  setupSizeDropdown();
});
```

- [ ] **Step 2: Verify brand/product rendering**

Reload the page in the preview and run `get_page_text`. Expected:
- Page title (browser tab) is "Framewear".
- Wordmark text reads "Framewear".
- Price reads "$1,000,000".
- `read_page` shows the `#size-dropdown` now contains 4 buttons with text `S`, `M`, `L`, `XL`.
- Product image has a non-empty `src` ending in `assets/images/producto-1.png` and `alt="1"`.
- `read_console_messages` shows no errors.

- [ ] **Step 3: Verify nav placeholders do nothing**

At desktop size, use `computer({ action: "left_click", ... })` on the "products" nav link (get its coordinates from `read_page`/`find` first). Expected: the page does not navigate or scroll, the URL stays the same, no console error.

- [ ] **Step 4: Verify the mobile hamburger menu**

`resize_window({ preset: "mobile" })`, reload, then:
1. `find` the hamburger button, click it.
2. `read_page` on `#site-nav` — expected `class` includes `nav--open`, and the hamburger button's `aria-expanded` attribute is `"true"`.
3. Screenshot — expected the floating rounded-corner box with the 4 nav items appears top-right, not full width.
4. Click the hamburger again — expected `nav--open` is removed, `aria-expanded` is `"false"`, and (per `read_page`) focus has returned to the hamburger button.

- [ ] **Step 5: Verify the size dropdown**

At either viewport size:
1. `find`/click the "more" button. Expected: `#size-dropdown` no longer has the `hidden` attribute, `#size-toggle`'s `aria-expanded` is `"true"`, screenshot shows S/M/L/XL listed.
2. Click "M". Expected: the "M" button now has class `is-selected` and `aria-selected="true"`; the other three have `aria-selected="false"`. Screenshot shows "M" visually highlighted (grey background, white text).
3. Click "more" again to close. Expected: `#size-dropdown` has `hidden` back, `aria-expanded` is `"false"`.
4. Reopen and click "L". Expected: selection moves to "L" only (previous "M" selection is cleared) — confirms only one size is ever marked selected.

- [ ] **Step 6: Verify focus-visible outlines**

At desktop size, click on empty page background first (to clear any existing focus), then use `computer({ action: "key", text: "Tab" })` repeatedly to step through the "home" nav link, the "Buy" button, and the "more" button. After each `Tab`, screenshot or use `javascript_tool` to read `getComputedStyle(document.activeElement).outlineStyle` — expected `"solid"` (not `"none"`) on every stop, confirming the `:focus-visible` rule from Task 3 applies to links and buttons alike.

- [ ] **Step 7: Verify `prefers-reduced-motion` is wired correctly**

This can't be live-emulated with the current browser tooling, so verify it at the source instead:

Run: `grep -A 3 "prefers-reduced-motion" /Users/sergioherrasti/Desktop/Framewear/css/style.css`
Expected: the media query is present and sets `transition: none` on `.buy-btn` — the only element in the stylesheet with a `transition` declared, so this rule fully neutralizes motion when the user prefers it.

- [ ] **Step 8: Full final walkthrough — both breakpoints, zero console errors**

Reload fresh at desktop (1280×800) and screenshot; reload fresh at mobile (375×812) and screenshot. In both, run `read_console_messages({ onlyErrors: true })` and confirm it's empty. This is the final acceptance check for the whole plan — both screenshots should visually match the approved mockup (desktop: nav top-aligned with wordmark, centered content; mobile: hamburger + floating rounded menu).

---
