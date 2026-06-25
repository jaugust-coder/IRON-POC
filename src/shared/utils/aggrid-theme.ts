import { agGridThemeConfigPL } from '@purplelab/atoms-ui/aggrid-pl';

import { themeQuartz } from 'ag-grid-community';

export const AgGridTheme = themeQuartz.withParams({
  ...agGridThemeConfigPL,
  wrapperBorderRadius: '0px'
});
