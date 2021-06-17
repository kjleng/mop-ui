import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

/**
 * Type Overrides
 */

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary: {
      main: React.CSSProperties[`color`];
      dark: React.CSSProperties[`color`];
      light: React.CSSProperties[`color`];
    };
  }
}

/**
 * Instantiate the standard breakpoints to use
 * within the createMuiTheme below
 */

const breakpoints = createBreakpoints({});

/**
 * Theme
 */

export const muiTheme = {
  typography: {
    // https://app.zeplin.io/project/6064fef491501d0814269e88/screen/609b208150defcac17c6ab17
    fontFamily: [`Source Sans Pro`, `sans-serif`].join(`,`),
    htmlFontSize: 10,
    h1: {
      fontSize: `2.8rem`,
      lineHeight: 1.07,
      fontWeight: 600,
      [breakpoints.up(`md`)]: {
        fontSize: `3rem`,
        lineHeight: 1,
      },
    },
    h2: {
      fontSize: `2rem`,
      lineHeight: 1.1,
      fontWeight: 600,
      [breakpoints.up(`md`)]: {
        fontSize: `2.2rem`,
        lineHeight: 1,
      },
    },
    h3: {
      fontSize: `1.8rem`,
      lineHeight: 1.44,
      fontWeight: 600,
      [breakpoints.up(`md`)]: {
        fontSize: `2rem`,
        lineHeight: 1.3,
      },
    },
    h4: {
      fontSize: `1.6rem`,
      lineHeight: 1.38,
      fontWeight: 600,
      [breakpoints.up(`md`)]: {
        fontSize: `1.8rem`,
        lineHeight: 1.22,
      },
    },
    h5: {
      fontSize: `1.4rem`,
      lineHeight: 1.14,
      fontWeight: 600,
      [breakpoints.up(`md`)]: {
        fontSize: `1.6rem`,
        lineHeight: 1,
      },
    },
    body1: {
      fontSize: `2.4rem`,
      lineHeight: 1.25,
    },
  },
  palette: {
    // https://app.zeplin.io/project/6064fef491501d0814269e88/screen/609b2081cc5485bd0f4fbff5
    primary: {
      main: `#32F2A56`,
      light: `#52356E`,
    },
    secondary: {
      main: `#007EA8`,
      light: `#41B9E6`,
      dark: `#007EA8`,
    },
    tertiary: {
      main: `#ff6754`,
      dark: `#e14632`,
      light: `#ff5d43`,
    },
    success: {
      main: `#00A857`,
    },
    error: {
      main: `#C42323`,
    },
    text: {
      primary: `#000`,
    },
  },
} as const;
