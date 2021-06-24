import { Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: '#52356E',
    paddingTop: 40,
    paddingBottom: 40,
    color: '#FFFFFF',
    borderRadius: 5,
    textAlign: 'left',
  },
  backIcon: {
    position: 'relative',
    top: 2,
  },
}));

interface IPageHeader {
  DisplayText: string;
  LinkPath: string;
}

const PageHeader: React.FC<IPageHeader> = (props: IPageHeader) => {
  const { DisplayText, LinkPath } = props;
  const classes = useStyles();

  return (
    <header className={classes.wrapper}>
      <Container maxWidth="md">
        <Grid container direction="row">
          {LinkPath.length > 0 && (
            <Grid item>
              <Link to={LinkPath} data-testid="page-header-back-link">
                <ArrowBackIos className={classes.backIcon} />
              </Link>
            </Grid>
          )}
          <Grid item>
            <Typography variant="h1" style={{ color: '#FFFFFF' }}>
              {DisplayText}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
};

export default PageHeader;
