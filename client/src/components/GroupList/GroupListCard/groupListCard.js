import { Redirect } from "react-router-dom";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from "../../../themes/themes"
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles({
  root: {
    minWidth: 250,
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  buttonGroups: {
    minWidth: "25%",
    justifyContent: "flex-start",
    margin: "auto",
  },
  buttonMembers: { 
    minWidth: "25%",
    margin: "auto",
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[700]),
    backgroundColor: deepOrange[700],
    marginRight: theme.spacing(2),
  },
  div: {
    justifyContent: 'space-between',
    display: 'flex',
  }

  });

const GroupListCard = (props) => {
    const classes = useStyles();

    return ( 
        <Card className={classes.root}>
      <CardContent>
          <div className={classes.div}>
            <Button className={classes.buttonGroups}>
                <Avatar variant="square" className={classes.square}>
                  {props.data.name[0]}
                </Avatar>
                <Typography variant="subtitle1" component="h2">
                  {props.data.name}
                </Typography>
            </Button>
            <Button className={classes.buttonMembers}>
              <Typography variant="subtitle1" component="h2" >
                MEMBERS
              </Typography>
            </Button>
          </div>
              
      </CardContent>
    </Card>
     );
}
 
export default GroupListCard;