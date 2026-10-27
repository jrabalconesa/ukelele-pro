# Ukelele PRO · Primera edición

Aplicación web responsive para aprender ukelele en español, con los **últimos logotipo y favicon elegidos**. Estilo cobre/caoba propio, independiente de Guitarra PRO y Flauta PRO. No muestra ninguna marca comercial en el instrumento dibujado.

## Empezar

1. Descomprime el ZIP completo.
2. Abre `index.html` en un navegador moderno. Las secciones, diagramas, ejemplos sonoros y progreso local funcionan sin servidor.
3. Para activar el **afinador con micrófono**, es necesario usar HTTPS o `localhost` (los permisos de micrófono no están disponibles abriendo archivos con `file://`). Una opción sencilla si tienes Python es ejecutar en esta carpeta `python -m http.server 8000`, abrir `http://localhost:8000` y autorizar el micrófono.
4. Puedes instalarla como aplicación desde el navegador cuando esté servida con HTTPS o localhost gracias a su manifiesto PWA.

## Funciones incluidas

- Práctica guiada con nueve ejercicios: fundamentos, primeros acordes, rasgueos y arpegios. Ejemplos sonoros generados con Web Audio; no son grabaciones instrumentales.
- **AIA · Aprendizaje Interactivo Adaptativo**, con una recomendación reproducible según historial, autoevaluación y preferencias. No usa un modelo IA remoto ni evalúa automáticamente el audio.
- Biblioteca de dieciséis acordes gCEA con diagramas SVG y reproducción; mástil interactivo de 12 trastes.
- Seis ritmos con símbolos hacia abajo, hacia arriba, silencios y apagados. Ejemplos y metrónomo con BPM ajustable.
- Seis canciones **originales de estudio** con acordes, versos breves y progresión de audio.
- Biblioteca local: subir, abrir, descargar y borrar PDF, PNG, JPG, WEBP o TXT hasta 12 MB por fichero; archivos en IndexedDB del navegador. No extrae automáticamente contenido de PDF/imagen.
- Seguimiento y autoevaluación, perfil, exportación e importación JSON del historial, letra grande y afinador con referencia de cuerdas y detección aproximada por micrófono.
- Interfaz adaptativa para ordenador, tableta y móvil, con navegación lateral/escritorio e inferior/móvil.
- Modo PWA con recursos precargados para uso sin conexión después de la primera visita.

## Datos personales

El historial y configuración se guardan en `localStorage`; los materiales subidos se guardan en `IndexedDB`. No hay servidor, cuenta, copia de seguridad en nube ni sincronización multidispositivo. La exportación JSON **no contiene los documentos** de la Biblioteca. Borrar los datos de sitio del navegador elimina el progreso y los archivos guardados. Debes conservar tus originales.

## Identidad visual

Archivos usados, derivados exclusivamente de las últimas imágenes aprobadas en el proyecto:

- `assets/logo-ukelele-pro.png`: logotipo horizontal Ukelele PRO y subtítulo.
- `assets/favicon-512.png` / `192.png` / `64.png` / `32.png`: favicon marrón/cobre de cuatro cuerdas.

## Publicación

Aplicación preparada para ChatGPT Sites y GitHub Pages. La versión de Sites se publica desde este repositorio fuente; GitHub Pages publica el contenido de `dist/` mediante GitHub Actions. El enrutamiento por hash funciona sin reglas adicionales.

Los cambios de la aplicación deben copiarse a `dist/` antes de publicar. El progreso y los materiales se almacenan por separado en cada navegador y dominio.

## Recursos didácticos consultados

- Kala: https://kalabrand.com/pages/ukulele-tuning
- Kala: https://kalabrand.com/blogs/home/ukulele-tuning-decoded
- Lanikai (tabla de acordes GCEA): https://lanikaiukuleles.com/wp-content/uploads/2024/07/Lanikai-Chord-Chart.pdf

La afinación inicial es **gCEA** con Sol agudo, habitual en el soprano. El modelo exacto de ukelele no se presume confirmado a partir de la imagen.

## Alcance y siguientes ampliaciones

No incluye reconocimiento fiable de acordes tocados, evaluación automática de rasgueos, OCR de partituras, sincronización en la nube, catálogos de canciones con licencias comerciales ni integración nativa con ChatGPT Sites. Estas funciones requieren implementaciones y servicios adicionales.
