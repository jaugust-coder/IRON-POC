# Allure Report Customization

Este directorio contiene los archivos de personalización para Allure Report.

## Archivos

- `static/logo.svg` - Logo personalizado para el reporte
- `static/custom-theme.css` - Estilos CSS personalizados con los colores del tema
- `apply-customization.js` - Script que aplica la personalización al reporte generado

## Colores personalizados

- **Primary**: `#8548EA`
- **Success/Passed**: `#33CA6F`
- **Failed**: `#DB1A1A`
- **Broken**: `#F38A3F`
- **Skipped**: `#B3B9C4`

## Uso

La personalización se aplica automáticamente cuando ejecutas:

```bash
npm run allure:generate
```

Si necesitas aplicar la personalización manualmente:

```bash
node allure-custom/apply-customization.js ./allure-report
```

## Nota sobre `allure serve`

Cuando uses `allure serve`, el reporte se genera temporalmente. Para aplicar la personalización, primero genera el reporte con `allure:generate` y luego ábrelo con `allure:open`.
