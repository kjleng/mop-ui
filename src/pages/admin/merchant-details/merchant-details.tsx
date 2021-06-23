import { Container, Card, List, ListItem, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { httpRequest } from '../../../api/http-request';
import { AddUserModal } from '../../../components/AddUserModal/AddUserModal';
import type { MerchantUser } from '../../../types/merchants.types';

// Types
type Params = {
  merchantName: string;
};

type State = {
  loading: boolean;
  users: Array<MerchantUser>;
  error: string;
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
  detailsContainer: {
    width: '100%',
    height: '215px',
    padding: `1rem`,
    marginBottom: '3.2rem',
    backgroundColor: '#fafafa',
    textAlign: `right`,
  },
  sectionHeader: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `flex-start`,
    marginBottom: `1.3rem`,
    [theme.breakpoints.up(`sm`)]: {
      flexDirection: `row`,
      justifyContent: `space-between`,
      alignItems: `center`,
    },
    '& .h2': {
      fontSize: '2.4rem',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    '& .modal-button': {
      color: theme.palette.secondary.main,
      fontSize: `1.8rem`,
      fontWeight: `600`,
      // marginTop: `1rem`,
      [theme.breakpoints.up(`md`)]: {
        marginTop: `0`,
      },
    },
  },
  skeleton: {
    borderRadius: `.5rem`,
    marginBottom: `.7rem`,
  },
  message: {
    textAlign: `center`,
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

const MerchantDetailPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const params: Params = useParams();

  const [{ error, loading, users, modalOpen }, setState] = useState<State>({
    loading: true,
    users: [],
    error: ``,
    modalOpen: false,
  });

  const closeModal = () =>
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
    }));

  React.useEffect(() => {
    httpRequest({
      // Get Merchant Hash
      url: `merchants/?name=${params.merchantName}`,
      method: `GET`,
    })
      .then(
        (
          res: AxiosResponse<{ merchantHash: string }>
        ): PromiseLike<AxiosResponse<{ users: Array<MerchantUser> }>> => {
          const merchantHash = res?.data?.merchantHash ?? ``;

          return httpRequest({
            // Get Merchant User
            url: `/merchants/${merchantHash}/users`,
            method: `GET`,
          });
        }
      )
      .then((res) => {
        const users: Array<MerchantUser> = res?.data?.users ?? [];
        if (!res?.data?.users) {
          console.error(res);
        } else {
          return setState((prevState) => ({
            ...prevState,
            loading: false,
            users,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        return setState((prevState) => ({
          ...prevState,
          loading: false,
          error:
            err?.message ??
            `There was an issue getting the information for ${params.merchantName}, please try again later`,
        }));
      });
  }, [params.merchantName]);

  return (
    <>
      <AddUserModal isOpen={modalOpen} closeCallback={closeModal} />
      <Container maxWidth="md" className={classes.container}>
        <Typography data-testid="h1" className={classes.h1} variant="h1">
          {params.merchantName}
        </Typography>
        <section>
          <header className={classes.sectionHeader}>
            <Typography className="h2" variant="h2">
              {t('Merchant Details')}
            </Typography>
          </header>
          <Card className={classes.detailsContainer} elevation={0}>
            <Typography variant="h3">TBD</Typography>
          </Card>
        </section>
        <section>
          <header className={classes.sectionHeader}>
            <Typography className="h2" variant="h2">
              {t('Merchant Users')}
            </Typography>
            <Button
              className="modal-button"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  modalOpen: true,
                }))
              }>
              + {t(`Add New User`)}
            </Button>
          </header>
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
            {error && (
              <Typography className={classes.message} data-testid="error-message" variant="h2">
                {error}
              </Typography>
            )}
            {!users.length && !loading && !error && (
              <Typography className={classes.message} data-testid="no-users" variant="h2">
                {params.merchantName} does not have any Merchant Users
              </Typography>
            )}
            {!!users.length &&
              !loading &&
              !error &&
              users.map((user) => (
                <ListItem
                  className={classes.user}
                  component="li"
                  data-testid="user"
                  key={`${user.name}-${Math.random()}`}>
                  <Typography className="name" variant="h4">
                    {user.name}
                  </Typography>
                  <Typography className="email">{user.email}</Typography>
                  <Button
                    className="button"
                    onClick={() => console.log(`Delete functionality will go here`)}>
                    {t(`Delete User`)}
                  </Button>
                </ListItem>
              ))}
          </List>
        </section>
      </Container>
    </>
  );
};

export default MerchantDetailPage;
