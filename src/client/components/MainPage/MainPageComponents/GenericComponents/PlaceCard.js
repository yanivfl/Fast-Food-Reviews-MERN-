import React, {Component} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar/index'
import {getImgSrc} from '../../../../utils/ImageHandler'

const useStyles = makeStyles({
    root: {
        maxWidth: 190,
        minWidth: 190,
        maxHeight: 345,
        minHeight: 345,
        display: "inline-flex",
        flexFlow: "column",
        justifyContent: "flex-start"
    },
});

export default function PlaceCard(props) {

    const handleCardActionClick = (restaurant_name) => {
        props.setReviews(restaurant_name);
        props.history.push(`/${restaurant_name}`);
      }

    const { address, name, openNow, photoUrl, timeText } = props.info;
    const classes = useStyles();
    return (
        <Card key={props.key} className={classes.root} onClick={() => handleCardActionClick(name)}>
            <CardActionArea className={classes.root}>
                <Avatar src={photoUrl} className="avatar-user-card"
                        style={{
                            marginTop: "15px",
                            width: "100px",
                            height: "100px",
                        }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {address}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {openNow ? 
                            <span style={{color:"green"}}>Open</span> :
                            <span style={{color:"red"}}>Closed</span>}
                        {timeText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/*<CardActions>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Share*/}
            {/*    </Button>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Learn More*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}