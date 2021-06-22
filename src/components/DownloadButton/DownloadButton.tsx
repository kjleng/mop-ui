import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    cursor: 'pointer',
    fontSize: '1.4rem',
    border: '1px solid #000000',
    borderRadius: 0,
    backgroundColor: 'transparent',
    padding: 11,
    textAlign: 'left',
    marginBottom: 10,
    width: '100%',
  },
  icon: {
    color: '#009BCD',
    fontSize: '1.8rem',
    position: 'relative',
    top: -2,
    marginLeft: 10,
  },
}));

interface IDownloadButton {
  DisplayText: string;
}

const DownloadButton: React.FC<IDownloadButton> = (props: IDownloadButton) => {
  const { DisplayText } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <button type="button" className={classes.button}>
      <Grid container direction="row">
        <Grid item xs>
          {DisplayText}
        </Grid>
        <Grid item>
          <SaveAltIcon className={classes.icon} />
        </Grid>
      </Grid>
    </button>
  );
};

export default DownloadButton;
