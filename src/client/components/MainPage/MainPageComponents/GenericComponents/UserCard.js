import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar/index'


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


export default function UserCard(props) {

    const handleCardActionClick = (user_name) => {
        props.setReviews(user_name);
        props.history.push(`/reviews/${user_name}`);
      }

    const classes = useStyles();
    const image = props.user.avatar ? props.user.avatar : '/broken-image.jpg';
    const user_name = props.user.user_name;
    const location = props.user.location;

    return (
        <Card className={classes.root} onClick={() => handleCardActionClick(user_name)}>
            <CardActionArea className={classes.root}>
                <Avatar src={image} className="avatar-user-card"
                        style={{
                            marginTop: "15px",
                            width: "100px",
                            height: "100px",
                        }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {location}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions/>
               {/* <Button size="small" color="primary">
            {/*        Share*/}
            {/*    </Button>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Learn More*/}
            {/*    </Button>*/}
            {/*</CardActions> */}
        </Card>
    );
}