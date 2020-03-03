import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {
    const classes = useStyles();
    const severity = props.snack_isSucc ? "success" : "error";

    return (
        <div className={classes.root}>
            <Snackbar open={props.display_snack}
                      autoHideDuration={6000}
                      onClose={() => props.closeSnackBar()}
                      anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                      }}
            >
                <Alert onClose={() => props.closeSnackBar()} severity={severity}>
                    {props.snack_message}
                </Alert>
            </Snackbar>
        </div>
    );
}