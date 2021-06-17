import { Container, Card, List, ListItem, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { httpRequest } from '../../api/http-request';
import { getMerchantUsers } from '../../api/merchant';
import type { MerchantUser } from '../../types/merchants.types';

// Types
type Params = {
  merchantName: string;
};

type State = {
  loading: boolean;
  users: Array<MerchantUser>;
  modalOpen: boolean;
};

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: 'left',
  },
  h1: {
    marginTop: '6rem',
    marginBottom: '3rem',
  },
  subheading: {
    fontSize: '2.4rem',
    fontWeight: 600,
    lineHeight: 1.25,
    marginBottom: '1.3rem',
  },
  sectionContainer: {
    width: '100%',
    height: '215px',
    marginBottom: '3.2rem',
    backgroundColor: '#fafafa',
  },
  skeleton: {
    borderRadius: `.5rem`,
    marginBottom: `.7rem`,
  },
  user: {
    backgroundColor: `#fafafa`,
    padding: `1rem 2.5rem`,
    display: `grid`,
    gridTemplateColumns: `1fr max-content`,
    gridTemplateRows: `repeat(2, max-content)`,
    gridTemplateAreas: `
      'name button'
      'email button'
    `,
    marginBottom: `.7rem`,
    [theme.breakpoints.up(`sm`)]: {
      gridTemplateColumns: `12rem 1fr max-content`,
      gridTemplateAreas: `'name email button'`,
    },
    '& .name': {
      gridArea: `name`,
    },
    '& .email': {
      gridArea: `email`,
      fontSize: `1.6rem`,
      lineHeight: 1.25,
    },
    '& .button': {
      gridArea: `button`,
      color: theme.palette.secondary.main,
      gridRowSpan: 2,
      fontSize: `1.8rem`,
      fontWeight: 600,
      [theme.breakpoints.up(`md`)]: {
        marginTop: `0`,
      },
    },
  },
}));

const MerchantDetailPage = ({ getUsers = getMerchantUsers }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [{ loading, users, modalOpen }, setState] = useState<State>({
    loading: true,
    users: [],
    modalOpen: false,
  });
  const params: Params = useParams();

  const closeModal = () =>
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));

  React.useEffect(() => {
    getUsers(params.merchantName, (users) =>
      setState((prevState) => ({
        ...prevState,
        loading: false,
        users,
      }))
    );
  }, [params.merchantName]);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography data-testid="h1" className={classes.h1} variant="h1">
        {params.merchantName}
      </Typography>
      <Typography className={classes.subheading}>{t('Merchant Details')}</Typography>
      <Card className={classes.sectionContainer} elevation={0}>
        <Typography variant="h2">TBD</Typography>
      </Card>
      <Typography className={classes.subheading}>{t('Merchant Users')}</Typography>
      <List className="" component="ul">
        {loading &&
          Array.from({ length: 3 }, (_, i) => i).map((i) => (
            <Skeleton
              data-testid="skeletons"
              className={classes.skeleton}
              height={50}
              key={i}
              variant="rect"
            />
          ))}
        {!users.length && !loading && (
          <Typography data-testid="no-users" variant="h2">
            {params.merchantName} does not have any Merchant Users
          </Typography>
        )}
        {!!users.length &&
          !loading &&
          users.map((user) => (
            <ListItem className={classes.user} component="li" key={`${user.name}-${Math.random()}`}>
              <Typography className="name" variant="h4">
                {user.name}
              </Typography>
              <Typography className="email">{user.email}</Typography>
              <Button
                className="button"
                onClick={
                  () => console.log(`Delete functionality will go here`)
                  // setState((prevState) => ({
                  //   ...prevState,
                  //   modalOpen: true,
                  // }))
                }>
                {t(`Delete User`)}
              </Button>
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default MerchantDetailPage;
