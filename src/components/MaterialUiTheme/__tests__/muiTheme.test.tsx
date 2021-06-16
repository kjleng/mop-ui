import { Typography } from '@material-ui/core';
import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { muiTheme } from '../../../utils/theme.styles';
import MaterialUiTheme from '../MaterialUiTheme';

afterEach(cleanup);

const TestComponent = () => {
  const theme = useTheme();
  return (
    <>
      <Typography data-testid="h1" variant="h1">
        H1
      </Typography>
      <Typography data-testid="h2" variant="h2">
        H2
      </Typography>
      <Typography data-testid="h3" variant="h3">
        H3
      </Typography>
      <Typography data-testid="h4" variant="h4">
        H4
      </Typography>
      <Typography data-testid="h5" variant="h5">
        H5
      </Typography>
      <Typography data-testid="body1" variant="body1">
        body1
      </Typography>
      <div data-testid="primaryMain" style={{ backgroundColor: theme.palette.primary.main }} />
      <div data-testid="primaryLight" style={{ backgroundColor: theme.palette.primary.light }} />
      <div data-testid="secondaryMain" style={{ backgroundColor: theme.palette.secondary.main }} />
      <div
        data-testid="secondaryLight"
        style={{ backgroundColor: theme.palette.secondary.light }}
      />
      <div data-testid="secondaryDark" style={{ backgroundColor: theme.palette.secondary.dark }} />
      <div data-testid="tertiaryMain" style={{ backgroundColor: theme.palette.tertiary.main }} />
      <div data-testid="tertiaryDark" style={{ backgroundColor: theme.palette.tertiary.dark }} />
      <div data-testid="tertiaryLight" style={{ backgroundColor: theme.palette.tertiary.light }} />
    </>
  );
};

// Rendered theme & component to test against
const renderedTheme = createMuiTheme(muiTheme);
const { queryByTestId } = render(
  <MaterialUiTheme>
    <TestComponent />
  </MaterialUiTheme>
);

test('MaterialUI ThemeProvider is using our muiTheme', () => {
  const { typography, palette } = renderedTheme;
  const [h1, h2, h3, h4, h5] = Array.from({ length: 5 }, (_, i) => i + 1).map((heading) =>
    queryByTestId(`h${heading}`)
  );
  const body1 = queryByTestId(`body1`);
  const [
    primaryMain,
    primaryLight,
    secondaryMain,
    secondaryLight,
    secondaryDark,
    tertiaryMain,
    tertiaryDark,
    tertiaryLight,
  ] = [
    queryByTestId(`primaryMain`),
    queryByTestId(`primaryLight`),
    queryByTestId(`secondaryMain`),
    queryByTestId(`secondaryLight`),
    queryByTestId(`secondaryDark`),
    queryByTestId(`tertiaryMain`),
    queryByTestId(`tertiaryDark`),
    queryByTestId(`tertiaryLight`),
  ];

  [h1, h2, h3, h4, h5].forEach((heading, i) => {
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe(`H${i + 1}`);
  });

  expect(h1).toHaveStyle(`font-size: ${typography.h1.fontSize}`);
  expect(h2).toHaveStyle(`font-size: ${typography.h2.fontSize}`);
  expect(h3).toHaveStyle(`font-size: ${typography.h3.fontSize}`);
  expect(h4).toHaveStyle(`font-size: ${typography.h4.fontSize}`);
  expect(h5).toHaveStyle(`font-size: ${typography.h5.fontSize}`);
  expect(body1).toHaveStyle(`font-size: ${typography.body1.fontSize}`);
  expect(primaryMain).toHaveStyle(`background-color: ${palette.primary.main}`);
  expect(primaryLight).toHaveStyle(`background-color: ${palette.primary.light}`);
  expect(secondaryMain).toHaveStyle(`background-color: ${palette.secondary.main}`);
  expect(secondaryLight).toHaveStyle(`background-color: ${palette.secondary.light}`);
  expect(secondaryDark).toHaveStyle(`background-color: ${palette.secondary.dark}`);
  expect(tertiaryMain).toHaveStyle(`background-color: ${palette.tertiary.main}`);
  expect(tertiaryDark).toHaveStyle(`background-color: ${palette.tertiary.dark}`);
  expect(tertiaryLight).toHaveStyle(`background-color: ${palette.tertiary.light}`);
});
