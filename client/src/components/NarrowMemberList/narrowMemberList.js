import React from "react"
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
import { useDispatch, useSelector } from 'react-redux';
import { selectTeams } from '../../reducers/teamSlice';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { setTeamMembers,
        selectGroupId,
        setLoadingNeededCompanyMembers, 
        selectLoadingNeededCompanyMembers 
} from '../../reducers/teamSlice';
import { selectEmail } from '../../reducers/navbarSlice'
import { selectToken } from '../../reducers/authSlice'
import our_api from "../../utils/requests"


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    square: {
      color: theme.palette.getContrastText(deepOrange[700]),
      backgroundColor: deepOrange[700],
      marginRight: theme.spacing(2),
    },
    list: {
      height: "auto",
      maxHeight: "37.3vh",
      minHeight: "20vh",
      overflow: "auto",
      minWidth: "100%"
    },
  
  }));


const NarrowMemberList = () => {
    const classes = useStyles();
    const team = useSelector(selectTeams);
    const token = useSelector(selectToken);
    const groupId = useSelector(selectGroupId);
    const myEmail = useSelector(selectEmail);
    const isLoadingNeededCompanyMembers = useSelector(selectLoadingNeededCompanyMembers);
    const dispatch = useDispatch();

    const [members, setMembers] = React.useState([{email: "loading..."}]);

    const onDelete = (element) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            our_api.deleteMemberOfGroup(token, element._id, groupId)
            .then((response) => {
                dispatch(setLoadingNeededCompanyMembers(true));
            })
        }
    }

    React.useEffect(() => {
       if (groupId !== undefined) {
            our_api.getMembersOfGroup(token, groupId)
            .then(request => {
                const memberList = request.data.data[0].memberNames
                dispatch(setTeamMembers(memberList))
                dispatch(setLoadingNeededCompanyMembers(false))
                setMembers(memberList)
            })
        }
        else {
            setMembers([]);
        }
    }, [groupId, isLoadingNeededCompanyMembers])

    return ( 
        <div className={classes.root}>
            <List className={classes.list}>
                {members.slice(0).reverse().map((element, index) => (
                    <>
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Avatar variant="square" className={classes.square}>
                                        {element.email[0]}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary={element.email} />
                           {
                               myEmail !== element.email ?
                               ( <IconButton onClick={() => {onDelete(element)}}>
                                    <DeleteIcon />
                                 </IconButton>
                               )
                                : <span></span>
                            }
                        </ListItem>
                        <Divider />
                    </>
                ))}
                { members.length === 0 ? 
                    <ListItem key={0}>
                        <ListItemText primary={"There is no member!"} />
                    </ListItem>
                    : <span></span>
                }
            </List>
        </div>
     );
}
export default NarrowMemberList;