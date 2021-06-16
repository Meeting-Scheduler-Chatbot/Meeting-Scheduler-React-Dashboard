import { Redirect } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from "../../../themes/themes"
  
const useStyles = makeStyles({
    root: {
      minWidth: 250,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
        margin: "auto",
        marginTop: theme.spacing(3)
    },
});

const GroupListHeader = () => {
    const classes = useStyles();
    return ( 
        <div className={classes.root}>
            <h2 className={classes.title}>Teams</h2>
            <h2 className={classes.title}>Members</h2>
        </div>
     );
}
 
export default GroupListHeader;