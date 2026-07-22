# Guía de Mantenimiento para el Cliente - Canito Construction LLC

Esta guía está diseñada para que puedas realizar modificaciones básicas en tu sitio web de forma sencilla, sin necesidad de conocimientos técnicos de programación.

---

## 1. Cómo Cambiar la Información de Contacto
Toda la información de contacto, textos y preguntas frecuentes se administran desde dos archivos centrales de traducción:
- **Inglés**: `messages/en.json`
- **Español**: `messages/es.json`

### Cambiar Teléfono, Correo o Dirección
1. Abre los archivos `messages/en.json` y `messages/es.json` con cualquier editor de texto básico (como el Bloc de Notas).
2. Busca la sección `"Contact"` y localiza el campo que deseas actualizar:
   - Para cambiar el correo: Modifica el valor en `"email"` o `"error"`.
   - Para cambiar el teléfono visible en los textos, actualiza las secciones correspondientes.
3. Para cambiar los enlaces directos de llamada en los botones:
   - Abre `src/app/[locale]/contact/page.tsx`, `src/components/MobileStickyCTA.tsx`, `src/sections/Footer.tsx`, etc.
   - Busca los textos que inician con `tel:+1512...` o `mailto:info@...` y reemplázalos con tu nuevo número o correo.

---

## 2. Cómo Reemplazar las Fotografías del Portafolio y Proyectos
Las imágenes de demostración se encuentran en la carpeta `public/images/`. Para sustituirlas por fotografías reales de tus obras, solo debes preparar las fotos nuevas y guardarlas con el mismo nombre y formato original en esa carpeta:
- **Cocina Antigua (Antes)**: Reemplazar el archivo `/public/images/before_kitchen.jpg`.
- **Cocina de Lujo (Después)**: Reemplazar el archivo `/public/images/project2.jpg`.
- **Proyecto Fachada Siding**: Reemplazar el archivo `/public/images/project1.jpg`.
- **Proyecto Baño de Lujo**: Reemplazar el archivo `/public/images/project3.jpg`.

*Nota: Te recomendamos optimizar las imágenes en formato **WebP** y con dimensiones máximas de 1200 píxeles de ancho para asegurar que la página web cargue de forma ultra rápida.*

---

## 3. Cómo Cambiar los Enlaces de Redes Sociales
Los enlaces a tus cuentas de Facebook, Instagram y LinkedIn se encuentran en el pie de página (Footer) y en los metadatos de Google.
1. Abre el archivo `src/components/SchemaOrg.tsx`.
2. Modifica las direcciones URL en la sección `"sameAs"` por tus enlaces reales.
3. Abre el archivo `src/sections/Footer.tsx`.
4. Reemplaza los enlaces `href="https://facebook.com/..."` por los tuyos.

---

## 4. Qué Archivos NO Debes Modificar
Para evitar desconfigurar el diseño visual, las animaciones o la estructura de idiomas, te recomendamos **no realizar cambios** en las siguientes carpetas a menos que cuentes con asistencia técnica:
- `src/design-system/` (Controla los colores dorados, negros y espaciados).
- `src/components/ui/` (Controla los botones, tarjetas y elementos de diseño base).
- `src/app/[locale]/layout.tsx` (Controla la estructura interna del sitio).
- `node_modules/` o `package.json` (Controlan el motor interno de la web).
