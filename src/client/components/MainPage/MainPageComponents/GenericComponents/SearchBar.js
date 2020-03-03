import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    height: 50,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 20,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const {placeholder, isIconDisplayed, onChange } = props;
  return (
    <Paper className={classes.root}>
      <InputBase  onChange={event => onChange(event)}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': {placeholder} }}
        defaultValue={props.defaultValue}
      />
      {isIconDisplayed? <SearchIcon /> : null }
    </Paper>
  );
}