import { makeStyles, Theme, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormLabel, Select } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import React from 'react'
import CloseIcon from '@material-ui/icons/Close';




interface AddMerchantModalProps {
    isOpen: boolean;
}

interface ISearchMerchantInput {
    findMerchantName: string;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '60rem',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    diaglogTitle: {
        // width: '60rem',
        // height: '58rem',
        padding: '1.6rem 2.4rem 1.5rem',

    },
    diaglogTitleContainer: {
        display: "grid",
        gridTemplateColumns: "95% 5%",
    },
    dialogTitleText: {
        gridColumnStart: '1',
        justifySelf: 'left',
        alignSelf: 'center',
        margin: '0.1rem 33.8rem 0 0',
        fontFamily: 'Source Sans Pro',
        fontSize: '2.4rem',
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.08',
        letterSpacing: '-0.05rem',
        color: '#3f2a56',
        whiteSpace: 'nowrap',
        width: '19rem',

    },
    dialogTitleClose: {
        gridColumnStart: 2,
        justifySelf: 'right',
        alignSelf: 'center',
    }
}));

export const AddMerchantModal: React.FC<AddMerchantModalProps> = ({ isOpen }) => {
    const classes = useStyles();

    
    const [open, setOpen] = React.useState(isOpen); //whether Modal is open
    const [submitText, setSubmitText] = React.useState('Search Merchant');

    const handleClose = () => {
        // different api calls depending on submitText var's value
        // ..
        setOpen(false);
    };

    const submitSearchMerchant = () => {
        debugger;
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby='add-merchant-modal-title'>
                <DialogTitle className={classes.diaglogTitle}>
                    <div className={classes.diaglogTitleContainer}>
                        <Typography id='add-merchant-modal-title' className={classes.dialogTitleText}>Add New Merchant</Typography>
                        <CloseIcon className={classes.dialogTitleClose} />
                    </div>
                </DialogTitle>

                <form onSubmit={submitSearchMerchant}>
                    <TextField
                        name='serach-merchant-name'
                        label="Search Merchant Name"
                    />


                </form>

                {
                    // Add another form here for add merchant details, Display Name onwards
                    // https://app.zeplin.io/project/60afaeb937ae977eae3bcbd1/screen/60b6869fe0a7bb3862848e3f
                    // https://app.zeplin.io/project/60afaeb937ae977eae3bcbd1/screen/60b6869f9c7b12757015693a
                }


                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        {submitText}
                    </Button>
                </DialogActions>

            </Dialog >
        </div >
    );
};

