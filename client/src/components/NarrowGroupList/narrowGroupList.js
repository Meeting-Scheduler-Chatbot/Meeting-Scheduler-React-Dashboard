import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import theme from "../../themes/themes";
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, green } from '@material-ui/core/colors';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { selectTeams, setGroupId, setLoadingNeededTeams } from '../../reducers/teamSlice';
import { selectToken } from '../../reducers/authSlice';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalForAdd from "../ModalForAdd/modalForAdd";
import ModalForEdit from "../ModalForEdit/modalForEdit";
import Modal from "@material-ui/core/Modal";
import our_api from "../../utils/requests";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: "40vh",
    maxHeight: "50vh",
    maxWidth: 360,
    minWidth: 250,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[700]),
    backgroundColor: deepOrange[700],
    marginRight: theme.spacing(2),
  },
  list: {
    height: "40vh",
    minHeight: "30vh",
    maxHeight: "55vh",
    overflow: "auto",
    minWidth: "100%"
  },
  button: {
    minWidth: "100%",
    marginTop: 30,
    marginBottom: 30,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));

const NarrowGroupList = () => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const team = useSelector(selectTeams);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    const handleListItemClick = (event, index, element) => {
      setSelectedIndex(index);
      dispatch(setGroupId(element._id));
    };

    const onDelete = (element) => {
      if (window.confirm("Are you sure you want to delete this group?")){
        console.log("delete", element._id)
        our_api.deleteGroup(token, element._id)
        .then((response) => {
          dispatch(setLoadingNeededTeams(true));
        })
      }
    }

    React.useEffect(() => {
      if (team.length > 0) {
        dispatch(setGroupId(team[selectedIndex]._id))
      }
    },[team])

    return ( 
        <div className={classes.root}>
          <List className={classes.list}>
            {team.map((element, index) => (
              <>
                <ListItem
                  button
                  key={index}
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index, element)}
                >
                <ListItemIcon>
                  <Avatar variant="square" className={classes.square}>
                    {element.name[0]}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={element.name} />

                <ModalForEdit element={element}/> 

                <IconButton onClick={(e) => {e.stopPropagation(); onDelete(element);}}>
                    <DeleteIcon />
                </IconButton>
                </ListItem>
                <Divider />
              </>
            ))}
            { team.length === 0 ?
              <>
                <ListItem key={0} > 
                  <ListItemText primary={"You do not have any groups!"} />
                </ListItem>
                <Divider />
              </>
              : <span></span>}

          </List>
            <ModalForAdd/>
        </div>
     );
}
 
export default NarrowGroupList;
