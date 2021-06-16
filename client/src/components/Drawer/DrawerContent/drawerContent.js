import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Folder from '@material-ui/icons/Folder';
import People from '@material-ui/icons/People';
import Star from '@material-ui/icons/Star';
import Schedule from '@material-ui/icons/Schedule';
import OfflinePin from '@material-ui/icons/OfflinePin';
import Publish from '@material-ui/icons/Publish';
import Backup from '@material-ui/icons/Backup';
import Delete from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { clearToken } from "../../../reducers/authSlice"
import { useDispatch } from "react-redux";

const list = [
  {
    primaryText: 'My Groups',
    icon: <People />,
    href: "/my-groups"
  },
  {
    primaryText: 'Customize Groups',
    icon: <Publish />,
    href: "/add-member"
  },
  {
    primaryText: 'New Feature',
    icon: <Schedule />,
    href: "/"
  },
//   {
//     primaryText: 'Starred',
//     icon: <Star />,
//   },
//   {
//     primaryText: 'Offline',
//     icon: <OfflinePin />,
//   },
//   {
//     primaryText: 'Uploads',
//     icon: <Publish />,
//   },
//   {
//     primaryText: 'Backups',
//     icon: <Backup />,
//   },
//   {
//     primaryText: 'Trash',
//     icon: <Delete />,
//   },
];

const onClick = (href, dispatch) => {
    if(href === "logout"){
        href = "/"
        dispatch(clearToken())
    }
    window.location.href = href;
}
const onClickLogout = (dispatch) => {
    dispatch(clearToken())
    const href = "/"
    window.location.href = href;
}

const NavContent = () => {

    const dispatch = useDispatch();   

    return (
  <List>
    {list.map(({ primaryText, icon, href }, i) => (
      <ListItem
        key={primaryText}
        //selected={i === 0}
        button
        onClick={() => {onClick(href)}}
      >
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    ))}
    <Divider style={{ margin: '12px 0' }} />
    <ListItem button onClick={() => {onClick("/settings")}}>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText
        primary={'Settings & account'}
        primaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
    <ListItem button onClick={() => {onClickLogout(dispatch)}}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText
        primary={'Logout'}
        primaryTypographyProps={{ noWrap: true }}
      />
    </ListItem>
  </List>
)};

NavContent.propTypes = {};
NavContent.defaultProps = {};

export default NavContent;