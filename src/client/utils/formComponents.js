import React from 'react'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import {makeStyles} from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export function renderField({ input, label, type, meta: { touched, error } }) {
    return (
        <div>
            <label className="login-label">{label}</label>
            {touched && (error && <span className="danger-error">{error}</span>)}
            <input className={"login-input" + (touched&&error ? "-error": "")} {...input} type={type}/>
        </div>
    );
}

export function renderRatingField({label, input, meta: {touched, error}}){

    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: ''
        },
    });

    const customIcons = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon/>,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon/>,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon/>,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon/>,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon/>,
            label: 'Very Satisfied',
        },
    };
    const labels = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent',
    };

    const IconContainer = (props) => {
        const {value, ...other} = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    };

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <label className="review-restaurant-label">{label}</label>
            {touched && (error &&
                <span className="review-danger-error">{error}</span>)}
            <div className="review-restaurant-rating">
                {console.log('test value' + value)}
                <Rating
                    name="customized-icons"
                    getLabelText={value => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    {...input}
                />
                {console.log('test of input' , input)}
                {<Box ml={2}>{labels[hover !== -1 ? hover : (input.value !== '' ? input.value : value)]}</Box>}
            </div>
        </div>
    );
};