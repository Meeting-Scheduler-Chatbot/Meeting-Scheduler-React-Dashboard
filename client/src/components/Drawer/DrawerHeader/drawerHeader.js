import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import our_api from "../../../utils/requests"
import { useDispatch, useSelector } from 'react-redux';
import { selectEmail } from "../../../reducers/navbarSlice"

const NavHeader = ({ collapsed }) => {
    
    const email = useSelector(selectEmail)
    console.log("EMAIL GELDİ Mİ??", email)

    return (

  <>
    <div style={{ padding: collapsed ? 8 : 16, transition: '0.3s' }}>
      <Avatar
        style={{
          width: collapsed ? 48 : 60,
          height: collapsed ? 48 : 60,
          transition: '0.3s',
        }}
      >
        {email[0]}
      </Avatar>
      <div style={{ paddingBottom: 16 }} />
      <Typography variant={'h6'} noWrap>
        Kaya Kapağan
      </Typography>
      <Typography color={'textSecondary'} noWrap gutterBottom>
        {email}
      </Typography>
    </div>
    <Divider />
  </>
)};

NavHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};
NavHeader.defaultProps = {};

export default NavHeader;