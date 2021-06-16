import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import GroupListCard from "./GroupListCard/groupListCard";
import GroupListHeader from "./GroupListHeader/groupListHeader";
import { useDispatch, useSelector } from 'react-redux';
import { selectTeams } from '../../reducers/teamSlice';
import themes from '../../themes/themes'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: "auto",
        width: '100%',
        maxWidth: "80vw",
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
      padding: themes.spacing(5),
      //boxShadow: "10px 2px 2px 10px grey",
      //boxShadow: "5px 5px blue, 10px 10px red, 15px 15px green",
      //marginTop: themes.spacing(2),
    },
    list: {
      maxHeight: "60vh",
      overflow: "auto",
    },

  }));


const GroupList = () => {
    const classes = useStyles();
    const team = useSelector(selectTeams);
    console.log(team);

    return ( 
        <div className={classes.root}>
            <GroupListHeader/>
      <List component="nav" aria-label="main mailbox folders" className={classes.list}>
      <Divider />
        {team.map((data, index) => (
            <ListItem key={index} className={classes.listItem}>
                <GroupListCard data={data}/>
            </ListItem>
        ))}
      </List>
      <Divider />
    </div>
     );
}


export default GroupList;
