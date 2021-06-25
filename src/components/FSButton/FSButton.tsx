import { Button, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { FSButtonTypes } from '../../enums/fsbutton.enum';

const useStyles = makeStyles((theme: Theme) => ({
  ctaButton: {
    fontSize: '2.5rem',
    borderRadius: 4,
    paddingTop: 5,
    paddingLeft: 23,
    paddingBottom: 5,
    paddingRight: 23,
  },
  ctaBlue: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  ctaWhite: {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.dark,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

interface IFSButton {
  type: FSButtonTypes;
  linkText: string;
  linkPath: string;
}

const FSButton: React.FC<IFSButton> = (props: IFSButton) => {
  const { type, linkText, linkPath } = props;
  const classes = useStyles();
  const history = useHistory();

  const determineVariantClass = (buttonType: FSButtonTypes) => {
    switch (buttonType) {
      case FSButtonTypes.Blue: {
        return classes.ctaBlue;
        break;
      }
      case FSButtonTypes.White: {
        return classes.ctaWhite;
        break;
      }
    }
    return classes.ctaBlue;
  };

  const handleClick = () => {
    history.push(linkPath);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className={clsx(classes.ctaButton, determineVariantClass(type))}
      onClick={handleClick}
      data-testid="fsbutton">
      {linkText}
    </Button>
  );
};

export default FSButton;
