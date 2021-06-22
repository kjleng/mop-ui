import { makeStyles, Toolbar } from '@material-ui/core';
import React, { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

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
      <Toolbar />
      <div className={classes.container}>
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
