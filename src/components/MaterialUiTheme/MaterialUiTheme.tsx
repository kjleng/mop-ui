import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { muiTheme } from 'utils/theme.styles';

type Props = {
  children: JSX.Element | Array<JSX.Element>;
};

export default function MaterialUiTheme({ children }: Props) {
  return (
    <ThemeProvider theme={createMuiTheme(muiTheme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
