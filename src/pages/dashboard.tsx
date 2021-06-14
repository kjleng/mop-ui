import {
  makeStyles,
  Theme,
  Typography,
  Button,
  Grid,
  Card,
  Input,
  List,
  ListItem,
} from '@material-ui/core';
import ChevronRight from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AddMerchantModal } from '../components/AddMerchantModal/AddMerchantModal';
import type { Merchant } from '../types/merchants.types';

/**
 * NOTE
 * All React keys are just random for now -- these will be changed
 * to the Merchant Code once we get the API hooked up.
 */

const useStyles = makeStyles((theme: Theme) => ({
  pageWrapper: {
    padding: `60px 15px`,
    [theme.breakpoints.up(`md`)]: {
      padding: `60px 100px`,
    },
    [theme.breakpoints.up(`lg`)]: {
      padding: `48px 200px`,
    },
  },
  pageHeader: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    marginBottom: `15px`,
    [theme.breakpoints.up(`md`)]: {
      flexDirection: `row`,
      justifyContent: `space-between`,
      alignItems: `center`,
      marginBottom: `22px`,
    },
    '& h1': {
      fontSize: `30px`,
      fontWeight: 600,
    },
    '& button': {
      color: `#007ea8`,
      fontSize: `18px`,
      fontWeight: `600`,
      marginTop: `10px`,
      [theme.breakpoints.up(`md`)]: {
        marginTop: `0`,
      },
    },
  },
  needsActionSection: {
    '& h2': {
      fontSize: `24px`,
      fontWeight: `600`,
      lineHeight: `30px`,
      textAlign: `left`,
      marginBottom: `13px`,
    },
  },
  needsActionCard: {
    textAlign: `left`,
    padding: `11px 14px`,
    backgroundColor: `#f2f2f2`,
    height: '100',
    '& .subtitle': {
      fontSize: `21px`,
      lineHeight: `30px`,
    },
    '& .code': {
      fontSize: `14px`,
      lineHeight: `30px`,
    },
    '& .date': {
      fontsize: `14px`,
      lineHeight: `30px`,
      color: `#acacac`,
    },
    '& .button': {
      color: `#000`,
      textAlign: `left`,
      fontSize: `14px`,
      // fontWeight: `normal`,
      padding: `6px 7px`,
      lineHeight: `normal`,
      textTransform: `none`,
      marginTop: `auto`,
    },
  },
  allMerchantsSection: {
    marginTop: `24px`,
  },
  allMerchantsHeader: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `stretch`,
    justifyContent: `flex-start`,
    [theme.breakpoints.up(`sm`)]: {
      flexDirection: `row`,
      justifyContent: `space-between`,
      alignItems: `center`,
    },
    marginBottom: `29px`,
    '& h2': {
      fontSize: `24px`,
      fontWeight: 600,
      lineHeight: `30px`,
      textAlign: `left`,
      marginBottom: `10px`,
      [theme.breakpoints.up(`sm`)]: {
        marginBottom: 0,
      },
    },
  },
  allMerchantsInput: {
    backgroundColor: `#b5b5b5`,
    borderRadius: `22.5px`,
    color: `white`,
    fontSize: `14px`,
    minWidth: `300px`,
    '& input': {
      padding: `12px 22px`,
      '&::placeholder': {
        color: `#fff`,
        opacity: 1,
      },
      '&::webkit-search-cancel-button': {
        color: `#fff`,
      },
    },
  },
  merchantsUl: {
    '& li:not(:last-of-type)': {
      marginBottom: `10px`,
    },
  },
  merchantLink: {
    display: `grid`,
    gridTemplateAreas: `
			'name name svg'
			'code date svg'
			'status status svg'
		`,
    gridTemplateRows: `repeat(3, max-content)`,
    gridTemplateColumns: `1fr 1fr .5fr`,
    [theme.breakpoints.up(`md`)]: {
      gridTemplateColumns: `1fr 1fr 1fr .5fr .5fr`,
      gridTemplateAreas: `'name code date status svg'`,
    },
    backgroundColor: `#fbfbfb`,
    padding: `17px 30px`,
    '& h6': {
      fontSize: `21px`,
      lineHeight: `30px`,
    },
    '& p': {
      fontSize: `16px`,
      lineHeight: `30px`,
      textAlign: `left`,
      [theme.breakpoints.up(`md`)]: {
        textAlign: `center`,
      },
    },
    '& .name': {
      gridArea: `name`,
    },
    '& .code': {
      gridArea: `code`,
    },
    '& .date': {
      gridArea: `date`,
    },
    '& .status': {
      gridArea: `status`,
      display: `flex`,
      justifyContent: `flex-start`,
      alignItems: `center`,
      marginTop: `5px`,
      [theme.breakpoints.up(`md`)]: {
        justifyContent: `center`,
        marginTop: 0,
      },
      '& p': {
        '&.rounded': {
          padding: `0 15px`,
          backgroundColor: `#d8d8d8`,
          borderRadius: `16px`,
        },
      },
    },
    '& svg': {
      gridArea: `svg`,
      marginLeft: `auto`,
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [merchants, setMerchants] = useState<{
    needsAction: Array<Merchant>;
    other: Array<Merchant>;
  }>({
    needsAction: [],
    other: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(``);

  useEffect(() => {
    /**
     * TODO: Return here when API call is ready
     *
     * assuming we will make our API call here, for now just filling dummy data from designs
     */
    setMerchants((prevMerchants) => ({
      ...prevMerchants,
      needsAction: Array.from({ length: 4 }, (_, i) => i).map((i) => ({
        name: `Merchant ${i + 1}`,
        code: 123456789,
        date: `02/30/2022`,
        status: [
          `Update Cobrand`,
          `Update Cobrand & Review Questionnair`,
          `Review Plans`,
          `Review Questionnair`,
        ][i],
      })),
      other: Array.from({ length: 7 }, (_, i) => {
        if (i === 2 || i === 3) return `Not Started`;
        if (i >= 5) return `In Progress`;
        else return `Live`;
      }).map((fakeStatus, i) => ({
        name: `Merchant ${i + 1}`,
        code: 123456789,
        date: `02/30/2022`,
        status: fakeStatus,
      })),
    }));
  }, []);

  return (
    <>
      <AddMerchantModal isOpen={modalOpen} closeCallback={() => setModalOpen(false)} />
      <div className={classes.pageWrapper}>
        <header className={classes.pageHeader}>
          <Typography variant="h1">{t(`Dashboard`)}</Typography>
          <Button onClick={() => setModalOpen(true)}>+ {t(`Add New Merchant`)}</Button>
        </header>

        {merchants?.needsAction?.length && (
          <section className={classes.needsActionSection} aria-label="Merchants that need action">
            <Typography variant="h2">
              {t(`Needs Action`)} ({merchants?.needsAction?.length ?? 0})
            </Typography>
            <div>
              <Grid direction="row" alignItems="stretch" container spacing={2}>
                {merchants?.needsAction?.length &&
                  merchants?.needsAction?.map &&
                  merchants.needsAction.map((merchant) => (
                    <Grid item key={`${Math.random()}`} xs={12} sm={6} md={3}>
                      <Card
                        className={classes.needsActionCard}
                        elevation={0}
                        style={{ height: `100%` }}>
                        <Typography className="subtitle" variant="subtitle1">
                          {merchant.name}
                        </Typography>
                        <Typography className="code">{merchant.code}</Typography>
                        <Typography className="date">{merchant.date}</Typography>
                        <Button className="button" disableElevation variant="contained">
                          {merchant.status}
                        </Button>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </section>
        )}

        <section className={classes.allMerchantsSection} aria-label="All Merchants">
          <header className={classes.allMerchantsHeader}>
            <Typography variant="h2">{t(`All`)}</Typography>
            <Input
              className={classes.allMerchantsInput}
              disableUnderline
              onChange={({ target: { value } }) => setSearchInput(value)}
              placeholder={t(`Search`)}
              type="search"
              value={searchInput}
            />
          </header>

          <List className={classes.merchantsUl} component="ul">
            {merchants?.other?.length &&
              merchants?.other?.map &&
              merchants.other.map((merchant) => (
                <li key={`${Math.random()}`}>
                  <ListItem
                    button
                    className={classes.merchantLink}
                    component={Link}
                    to={`/merchant-detail/${merchant.name}`}>
                    <div className="name">
                      <Typography variant="subtitle1">{merchant.name}</Typography>
                    </div>
                    <div className="code">
                      <Typography>{merchant.code}</Typography>
                    </div>
                    <div className="date">
                      <Typography>{merchant.date}</Typography>
                    </div>
                    <div className="status">
                      <Typography
                        className={clsx({
                          rounded: merchant.status.trim?.()?.toLowerCase?.() === `live`,
                        })}>
                        {t(`${merchant.status}`)}
                      </Typography>
                    </div>
                    <ChevronRight />
                  </ListItem>
                </li>
              ))}
          </List>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
