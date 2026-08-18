# Framewear — Project Brief

> Nombre de marca temporal. "Framewear" se usa mientras Guille registra el nombre real de la marca de ropa. Todo el código, clases, variables y contenido debe tratarse como fácilmente reemplazable (evitar hardcodear el nombre en muchos lugares; centralizarlo en una constante/variable si el stack lo permite).

## 1. Overview

- **Cliente:** Guille, quien está lanzando una marca de ropa nueva.
- **Objetivo del sitio:** Presentar la marca en formato ecommerce, mostrando el primer (y único, por ahora) producto. Es una landing de presentación, no una tienda funcional.
- **Alcance de esta fase:** Solo **front-end**. No hay backend, no hay carrito, no hay checkout, no hay CMS.
- **Página funcional:** Únicamente **home**. `products`, `about` y `contact` existen como items de navegación clickeables pero sin destino/acción (placeholders para la siguiente fase).
- **Producto actual:** 1 producto (prenda — ver sketch adjunto: parece un tipo de suéter/chamarra). *Falta definir: nombre del producto, descripción corta, y si Guille proveerá fotografía real o se usa un placeholder mientras tanto.*

## 2. Estructura de navegación

Nav items (minúsculas, tal cual):
- `products`
- `about`
- `contact`

Todos son clickeables pero sin funcionalidad por ahora (placeholder — no rutas rotas, simplemente sin acción o apuntando a un ancla vacía / página en blanco mínima, a definir por Claude Code según el stack).

## 3. Diseño — Desktop

Referencia: sketch adjunto (`ReferenciaVisual.jpg`). Las líneas rojas/verdes del sketch son solo guías de estructura, **no deben existir en el resultado final**.

**Layout (de arriba hacia abajo / izquierda a derecha):**

- **Header:** "Framewear" centrado arriba, como wordmark/logo de texto.
- **Nav lateral izquierdo:** sin líneas ni contenedor visible, alineado a la izquierda de la página, debajo del header. Cada item del nav lleva un **triángulo** como bullet (▸ o equivalente vectorial/CSS, no un carácter de fuente poco confiable entre navegadores):
  - ▸ products
  - ▸ about
  - ▸ contact
- **Zona central (contenido principal):**
  - Imagen del producto, centrada.
  - Debajo de la imagen: precio — **$1,000,000** — junto a un botón **Buy**.
  - Debajo de eso: botón **more**, que despliega un **dropdown de tallas**: S, M, L, XL.

**Estilo visual:**
- Fondo: blanco.
- Tipografía: color gris (no negro puro).
- Estética: minimalista, editorial, mucho espacio en blanco, nada decorativo de sobra.
- Tipografía (familia): a proponer por Claude Code aplicando dirección editorial/minimalista — pairing deliberado de display + body, evitando defaults genéricos (evitar look "IA genérica": nada de fondo crema + serif de alto contraste + acento terracota, nada de fondo negro + acento ácido, nada de broadsheet denso por defecto — solo si se justifica con una decisión real para esta marca).

## 4. Diseño — Mobile

- El nav lateral **no existe** como tal en mobile. En su lugar:
  - Ícono de **menú hamburguesa**, ubicado **arriba a la derecha**.
  - Al abrir, no se despliega una barra de ancho completo — aparece como un **menú flotante**, tipo caja, del tamaño de las opciones (no full width), con **esquinas curvas** (border-radius visible).
- El resto del contenido (producto, precio, Buy, more) se reordena de forma responsive manteniendo la jerarquía vertical: producto → precio + Buy → more (tallas).

## 5. Interacciones y estados

| Elemento | Comportamiento actual |
|---|---|
| Botón **Buy** | Solo visual. Sin funcionalidad (no link, no acción, no alert). Debe verse y sentirse como un botón real (estados hover/focus incluidos), simplemente no hace nada todavía. |
| Botón **more** | Abre un **dropdown** con tallas: S, M, L, XL. Selección visual únicamente (no hay lógica de inventario ni de compra). |
| Nav items (`products`, `about`, `contact`) | Clickeables, sin destino funcional por ahora. |
| Menú hamburguesa (mobile) | Abre/cierra el menú flotante de esquinas curvas con los 3 nav items. |

## 6. Stack técnico

*A definir/confirmar — este proyecto es independiente del stack de Private Club (Eleventy/Nunjucks/Decap CMS). Sugerido para discutir con Claude Code:*
- Sitio estático simple (HTML/CSS/JS vanilla, o Eleventy si se quiere consistencia con el otro proyecto de Sergio) — a decidir según preferencia de Guille/Sergio.
- Sin backend, sin base de datos, sin CMS en esta fase.
- Responsive: mobile-first o desktop-first, a criterio de implementación, pero debe funcionar impecable en ambos breakpoints descritos arriba.

## 7. Design direction / skills a aplicar

- Aplicar principios de diseño intencional y distintivo (evitar defaults genéricos de IA: nada de paletas o layouts "de plantilla").
- Tipografía como elemento central de personalidad de marca — pairing deliberado, no defaults.
- Restraint: la propuesta es minimalista, así que la elegancia está en la precisión del espaciado, alineación y detalle tipográfico, no en agregar elementos.
- Accesibilidad base: focus visible en elementos interactivos (botones, dropdown, menú hamburguesa), respeto a `prefers-reduced-motion` si se usa cualquier transición/animación.

## 8. Fuera de alcance (explícito)

- Checkout / pagos.
- Backend / base de datos / inventario real.
- Páginas `products`, `about`, `contact` funcionales (quedan para una fase posterior).
- CMS de ningún tipo.

## 9. Pendientes / información que falta antes o durante el desarrollo

- Nombre y descripción corta del producto.
- Fotografía real del producto (o si se usa placeholder temporal mientras Guille la produce).
- Nombre final de la marca (cuando se registre, reemplaza "Framewear" en todo el sitio).
- Confirmar si el precio y las tallas son reales o también placeholder.
