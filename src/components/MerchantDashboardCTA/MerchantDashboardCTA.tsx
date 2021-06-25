import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FSButtonTypes from '../../enums/fsbutton.enum';
import FSButton from '../FSButton/FSButton';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    border: '1px solid #606170',
    borderRadius: 5,
    padding: 18,
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.secondary,
    fontSize: '2.5rem',
  },
}));

interface IMerchantDashboardCTA {
  HeaderText: string;
  BodyText: string;
  LinkText: string;
  LinkPath: string;
  ButtonType: FSButtonTypes;
  ShowCheck: boolean;
}

const MerchantDashboardCTA: React.FC<IMerchantDashboardCTA> = (props: IMerchantDashboardCTA) => {
  const { HeaderText, BodyText, LinkText, LinkPath, ButtonType, ShowCheck } = props;

  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container direction="row" alignItems="center" className={classes.wrapper} spacing={1}>
      {ShowCheck && (
        <Grid item>
          <Check style={{ color: '#008450' }} />
        </Grid>
      )}
      <Grid item sm>
        <Typography variant="h1">{HeaderText}</Typography>
        {BodyText.length > 0 ? <Typography variant="subtitle1"> {BodyText}</Typography> : null}
      </Grid>
      <Grid item>
        <FSButton type={ButtonType} linkText={LinkText} linkPath={LinkPath} />
      </Grid>
    </Grid>
  );
};

export default MerchantDashboardCTA;
