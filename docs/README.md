# Tramontina Store

![version](https://badgen.net/static/version/0.0.1/blue)

## Descripción

## Estructura del Proyecto

- **assets/**: Imágenes, íconos, banners y fuentes utilizadas en el tema.
- **docs/**: Documentación del proyecto.
- **messages/**: Archivos de internacionalización (i18n).
- **pixel/**: Scripts y píxeles personalizados.
- **react/**: Componentes React personalizados y tipos.
- **store/**: Configuraciones de rutas, interfaces y bloques de la tienda.
- **styles/**: Configuraciones y archivos CSS del tema.

## Builders Utilizados

| Builder      | Versión |
| ------------ | ------- |
| styles       | 2.x     |
| store        | 0.x     |
| assets       | 0.x     |
| docs         | 0.x     |
| messages     | 1.x     |
| react        | 3.x     |
| pixel        | 0.x     |

## Scripts

- **postreleasy:** `vtex publish --verbose && vtex deploy --force`

## Dependencias Principales

| Dependencia                    | Versión |
| ------------------------------ | ------- |
| vtex.add-to-cart-button        | 0.x     |
| vtex.breadcrumb                | 1.x     |
| vtex.carousel                  | 2.x     |
| vtex.flex-layout               | 0.x     |
| vtex.login                     | 2.x     |
| vtex.menu                      | 2.x     |
| vtex.minicart                  | 2.x     |
| vtex.my-account                | 1.x     |
| vtex.order-placed              | 2.x     |
| vtex.product-details           | 1.x     |
| vtex.product-summary           | 2.x     |
| vtex.responsive-layout         | 0.x     |
| vtex.search-result             | 3.x     |
| vtex.shelf                     | 1.x     |
| vtex.slider-layout             | 0.x     |
| vtex.store-components          | 3.x     |
| vtex.store-footer              | 2.x     |
| vtex.store-header              | 2.x     |
| vtex.styleguide                | 9.x     |

## Cómo ejecutar el proyecto

1. Instale el [Toolbelt de VTEX IO](https://developers.vtex.com/docs/vtex-io-documentation-vtex-io-cli-installation).
2. Inicie sesión en su cuenta VTEX:
   `vtex login {account}`
3. En el directorio del proyecto, ejecute:
   `vtex link`
4. Para publicar:
   `vtex publish --verbose && vtex deploy --force`

## Personalización

- Los estilos pueden modificarse en `styles/configs/`.
- Se pueden agregar componentes personalizados en `react/`.
- Los bloques e interfaces pueden configurarse en `store/blocks/` y `store/interfaces.json`.

## Contacto

---
