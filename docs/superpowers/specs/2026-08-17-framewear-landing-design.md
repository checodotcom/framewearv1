# Framewear — Landing (fase 1) — Design Spec

Fecha: 2026-08-17
Estado: Aprobado (brainstorming) — listo para plan de implementación

## 1. Overview

Sitio de presentación (no ecommerce funcional) para el lanzamiento de una nueva marca de ropa, nombre temporal **Framewear**. Una sola página funcional (`home`) que muestra el primer producto de la marca. `products`, `about` y `contact` son items de navegación clickeables sin destino (fase siguiente).

Solo front-end: sin backend, sin carrito, sin checkout, sin CMS.

## 2. Stack técnico

- **HTML/CSS/JS vanilla estático.** Sin build step, sin framework, sin dependencias de paquetes.
- Fuentes auto-hospedadas (no CDN de terceros) para evitar dependencias externas y mantener el sitio rápido y privado.
- Sin backend, sin base de datos.

### Estructura de archivos

```
/index.html
/css/style.css
/js/main.js
/assets/
  images/
    producto-1.png        (foto recortada, fondo transparente — ver §5)
  fonts/
    panchang/...           (woff2, self-hosted)
    general-sans/...       (woff2, self-hosted)
  favicon.svg (o .ico)
```

## 3. Datos del producto (constantes editables)

Centralizados en `js/main.js` como un único objeto, para que reemplazar valores (incluido el nombre de marca cuando se registre) sea un cambio en un solo lugar:

```js
const BRAND_NAME = "Framewear";

const PRODUCT = {
  name: "1",
  description: "",           // vacío por ahora, se agrega cuando Guille lo defina
  price: 1000000,             // real, no placeholder
  currency: "$",
  sizes: ["S", "M", "L", "XL"], // reales
  image: "assets/images/producto-1.png",
};
```

`BRAND_NAME` puebla el wordmark del header vía `textContent` al cargar la página — es el único lugar que hay que tocar para renombrar la marca.

`PRODUCT.description` vacío significa que no se renderiza ningún bloque de descripción (no dejar un contenedor vacío visible). Cuando Guille la provea, se agrega el texto y el bloque aparece.

## 4. Layout — Desktop

Confirmado por mockup interactivo (ver captura en la conversación / `.superpowers/brainstorm/`).

- **Wordmark "Framewear"**: centrado, tipografía display (Panchang), en la parte superior de una columna central de contenido (max-width ~320px, centrada en la página).
- **Nav lateral izquierdo**: posicionado en la esquina superior izquierda, **alineado verticalmente con el top del wordmark** (no desplazado hacia abajo). Implementación: `position: absolute` dentro de un contenedor `position: relative`, para que no participe en el cálculo de centrado del contenido principal.
  - Items, en este orden: `home`, `products`, `about`, `contact`.
  - Cada item lleva un triángulo como bullet, implementado con el truco de CSS borders (no carácter de fuente): `border-top/bottom: transparent; border-left: color`.
  - Todos son anchors (`<a href="#">`) con `preventDefault()` en el click — sin scroll, sin navegación, sin acción visible más allá del propio estado hover/focus del link.
- **Columna central de contenido** (misma columna que el wordmark, para que todo quede centrado respecto al título):
  - Imagen del producto (recortada, fondo transparente).
  - Precio ($1,000,000) + botón **Buy** en la misma fila.
  - Debajo, botón **more** que despliega un dropdown con las tallas S/M/L/XL.

## 5. Imagen del producto

Se usa la versión **recortada con fondo transparente** (`producto-transparente.png` provista por el cliente), no el flat-lay original con fondo blanco. Sobre el fondo blanco del sitio el recorte se integra sin borde visible. El archivo original con fondo (`Producto.JPG`) se conserva en `Assets/` como referencia pero no se usa en el sitio.

## 6. Layout — Mobile (breakpoint sugerido: 768px)

- El nav lateral desaparece. En su lugar:
  - **Ícono de hamburguesa** arriba a la derecha.
  - Al hacer click, abre un **menú flotante tipo caja** (no full-width, ancho de contenido) con **esquinas curvas** (`border-radius`), conteniendo los mismos 4 items (`home`, `products`, `about`, `contact`) con el mismo bullet triangular.
  - Toggle implementado en **JS vanilla** (no CSS-only checkbox hack), manejando `aria-expanded` en el botón de hamburguesa y moviendo el foco al abrir/cerrar, para cumplir el requisito de accesibilidad del brief.
- Contenido reordenado verticalmente manteniendo jerarquía: wordmark → imagen del producto → precio + Buy → more (tallas).

## 7. Estilo visual

- **Fondo:** blanco (`#ffffff`) en todo el sitio.
- **Color de texto:** gris, no negro puro. Dos tonos, validados en el mockup interactivo: gris principal `#6b6b6b` para texto/nav/precio, gris claro `#a3a3a3` para elementos secundarios como "more".
- **Sin color de acento.** Confirmado explícitamente: el verde neón del producto NO se replica en botones, hovers ni links — el sitio es estrictamente monocromático (blanco/gris). El único momento de color en toda la página es la foto del producto.
- **Tipografía:**
  - Display (wordmark, "more"/labels si aplica): **Panchang**, weight 600 (semibold), self-hosted vía Fontshare.
  - Body (nav, precio, botones, cualquier texto de párrafo futuro): **General Sans**, weights 400/500, self-hosted vía Fontshare.
  - Ambas elegidas y validadas visualmente contra 2 alternativas (Cabinet Grotesk + Switzer; IBM Plex Mono + Archivo) durante brainstorming — Panchang + General Sans fue la preferida por su carácter editorial sin caer en defaults genéricos.
- **Estética:** minimalista, editorial, mucho espacio en blanco. Sin bordes decorativos, sin sombras salvo la sutil en el menú flotante mobile.

## 8. Interacciones y estados

| Elemento | Comportamiento |
|---|---|
| Botón **Buy** | Solo visual. Estados hover/focus reales (cambio de color/borde). Sin `href`, sin `onclick` funcional, sin alert. |
| Botón **more** | Abre/cierra un dropdown con S/M/L/XL. Click en una talla la marca como seleccionada visualmente (sin lógica de inventario/compra). Un solo dropdown abierto a la vez. |
| Nav items (`home`, `products`, `about`, `contact`) | Clickeables, `preventDefault()`, sin destino. |
| Hamburguesa (mobile) | Abre/cierra el menú flotante. `aria-expanded` sincronizado, foco gestionado. |

## 9. Accesibilidad

- Focus visible (`:focus-visible`) en todos los elementos interactivos: nav items, botón Buy, botón more, opciones de talla, hamburguesa.
- `aria-expanded` en botón de hamburguesa y en botón "more".
- Respetar `prefers-reduced-motion` para cualquier transición (apertura de dropdown/menú flotante) — sin animación si el usuario lo prefiere.
- Texto alternativo (`alt`) descriptivo en la imagen del producto.

## 10. Fuera de alcance (explícito)

- Checkout, pagos, carrito real.
- Backend, base de datos, inventario real.
- Páginas `products`, `about`, `contact` funcionales.
- CMS.
- Deploy/hosting (se resuelve como paso separado una vez validado el sitio localmente).

## 11. Verificación

Sitio estático sin lógica de negocio — no requiere suite de tests automatizados. Verificación manual en navegador cubre:

- Render correcto en desktop y mobile (breakpoint 768px), incluyendo el menú flotante y su posición/curvatura.
- Nav alineado arriba con el wordmark en desktop (regla validada en el mockup interactivo tras una iteración).
- Contenido central (imagen, precio, Buy, more) centrado respecto al wordmark, no desplazado por el nav.
- Estados hover/focus visibles en todos los elementos interactivos.
- Sin errores en consola del navegador.
- `prefers-reduced-motion` respetado (verificar con emulación en devtools).

## 12. Pendientes conocidos (no bloquean esta fase)

- Nombre final de marca (reemplaza `BRAND_NAME` cuando se registre).
- Descripción corta del producto (se agrega cuando Guille la provea).
- Deploy/hosting del sitio.
