import { makeStyles, Toolbar } from '@material-ui/core';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React, { ReactNode } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flex: 1,
  },
  main: {
    flex: 1,
    background: 'white',
  },
}));

type Props = {
  children: NonNullable<ReactNode>;
};

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.container}>
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
