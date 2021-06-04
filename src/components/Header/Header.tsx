import { AppBar, Toolbar, Button, makeStyles, Theme } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import logo from './fairstone_header_logo.svg';



const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: "#ffffff",
    color: theme.palette.secondary.light,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "25% auto 25%",
    //justifyItems: "right"
  },
  toolbar: {
    gridColumnStart: 3,
    justifySelf: "right"
  },
  logo: {
    // display: "flex",
    gridColumnStart: 1,
    color: "#3f2a56",
    justifySelf: "left"
  },
  menuButton: {
    color: "#3f2a56",
    fontFamily: "Source Sans Pro, sans-serif",
    fontWeight: 600,
  },
}));

const Header = () => {
  const classes = useStyles();
  const navItems = [
    {
      label: "FR",
      href: "/anotherpage",
    },
    {
      label: "Login",
      href: "/home",
    },
  ];


  const getNavButtons = () => {
    return navItems.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar className={classes.appBar}>
      <div className={classes.container}>
        <img src={logo} className={classes.logo} alt="Fairstone logo"/>
        <Toolbar className={classes.toolbar}>  {getNavButtons()}</Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
