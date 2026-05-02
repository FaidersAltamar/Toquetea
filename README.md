# Toquetea

Sitio web de la marca **Toquetea**: landing para créditos digitales, cuentas privadas de herramientas de IA y accesos API. Incluye interfaz en español e inglés.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)

## Instalación y uso

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`).

### Producción

```bash
npm run build
```

Los archivos estáticos quedan en `dist/`.

### Vista previa del build

```bash
npm run preview
```

## Personalizar contenido

La mayor parte del texto, precios, paquetes, servicios y datos de contacto vive en:

- `src/siteData.js` — marca, WhatsApp, email, paquetes de créditos, listas de servicios y APIs, y copias en `es` / `en`.
- Para **ocultar** temporalmente un servicio o una API, pon `available: false` en el objeto correspondiente.

Los estilos globales están en `src/styles.css`.

## Estructura del proyecto

| Ruta | Descripción |
|------|-------------|
| `index.html` | Entrada HTML, meta y título |
| `src/main.jsx` | Punto de montaje de React |
| `src/App.jsx` | Layout y secciones de la landing |
| `src/siteData.js` | Datos y traducciones |
| `public/` | Recursos estáticos (p. ej. favicon) |

## Licencia

Proyecto privado (`private: true` en `package.json`).
