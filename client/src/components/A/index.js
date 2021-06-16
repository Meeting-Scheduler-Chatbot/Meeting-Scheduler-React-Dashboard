import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectToken,
  selectLoggedIn,
} from '../../reducers/authSlice';


const A = () => {
    const token = useSelector(selectToken);
    const loggedIn = useSelector(selectLoggedIn);
 
    return (
        <div>   
            <p> Token A: {token}</p>
            <p> LoggedIn A: {loggedIn ? "True":"False"}</p>     
        </div>
    );
}

export default A;
