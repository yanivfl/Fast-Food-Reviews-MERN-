import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Moment from 'react-moment';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { arrayBufferToUrl } from '../../../../utils/ImageHandler'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginRight:'10em',
  },
  listRoot: {
    // marginTop: '14em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  GridListTile: {
    // objectFit: 'cover',
  }
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

//TODO: utils? move to reducer
//move date displat fix to reducer

export default function ReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const reviews = props.user_reviews ? props.user_reviews : props.restaurant_reviews;
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
        <div className={classes.root}>
        {console.log('test review card')}
        {console.log(props.reviews)}
        {console.log(props.user_reviews)}
        {console.log(props.restaurant_reviews)}

        {reviews.map((review, key) => {
            const panel = `panel${key}`;
            const panel_control = `panel${key}bh-content`;
            const panel_id = `panel${key}bh-header`;

            return <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={panel_control}
                            id={panel_id}>
                            {props.permission && // need Edit and delete permission
                              <div>
                                <FormControlLabel 
                                  aria-label="Acknowledge"
                                  onClick={event =>{event.stopPropagation();
                                                    props.onDelete(review._id)}}
                                  onFocus={event => event.stopPropagation()}
                                  control={<IconButton
                                                  aria-label="delete"
                                                  color="secondary">
                                              <DeleteIcon/>  
                                          </IconButton>
                                              }
                                />
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={event => {event.stopPropagation();
                                                      props.onEdit(review);
                                                      props.history.push('/editreview')}}
                                    onFocus={event => event.stopPropagation()}
                                    control={<IconButton
                                                    aria-label="edit"
                                                    color="primary">
                                                <EditIcon/>  
                                            </IconButton>

                                            }
                                />
                              </div>}  
                            <Typography className={classes.heading}>{props.restaurant_reviews ? review.user_author : review.restaurant_name}</Typography>
                                          <Typography className={classes.secondaryHeading}><Moment format="D MMM YYYY HH:mm" withTitle>{review.publish_date}</Moment></Typography> 
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display: 'block', verticalAlign: 'center'}}>
                            <Typography style={{whiteSpace: 'pre-wrap'}}>
                                Bathroom quality: <Rating name="customized-icons" IconContainerComponent={IconContainer} value={review.topics.bathroom_quality} readOnly /> {"\n"}
                                Staff kindness: <Rating name="customized-icons" IconContainerComponent={IconContainer} value={review.topics.staff_kindness} readOnly /> {"\n"}
                                Cleanliness: <Rating name="customized-icons" IconContainerComponent={IconContainer} value={review.topics.cleanliness} readOnly /> {"\n"}
                                Drive thru quality: <Rating name="customized-icons" IconContainerComponent={IconContainer} value={review.topics.drive_thru_quality} readOnly /> {"\n"}
                                Delivery speed: <Rating name="customized-icons" IconContainerComponent={IconContainer} value={review.topics.delivery_speed} readOnly /> {"\n"}
                                Food quality: <Rating name="customized-icons" IconContainerComponent={IconContainer} value={review.topics.food_quality} readOnly /> {"\n"}
                                Comment: {review.comment}
                            </Typography>
                            <div className={classes.listRoot}>
                                <GridList className={classes.gridList} cols={2.5}>
                                    {review.pictures.map(pic => (
                                    <GridListTile key={pic.id}>
                                        <img src={arrayBufferToUrl(pic.data.data)} />
                                    </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </ExpansionPanelDetails>
                </ExpansionPanel>
        })}
        </div>
  );
}