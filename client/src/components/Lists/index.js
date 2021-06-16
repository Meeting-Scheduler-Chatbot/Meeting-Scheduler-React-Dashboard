import React from 'react';
import List from "./List/index"

import { useSelector } from "react-redux"
import {
    selectLoggedIn,
    selectToken,

  } from '../../reducers/authSlice';
// import store from '../../app/store';

// console.log(store.getState())

const Lists = (props) => {

    const token = useSelector(selectToken);
    const loggedIn = useSelector(selectLoggedIn);
    return (
        <div>   
            
            <p> Token : {token}</p>
            <p> LoggedIn: {loggedIn ? "True":"False"}</p>
                <br/>
                {props.data.map((item,key) =>  <List name={item.name} surname={item.surname} /> )}
        </div>    
                
        
    );
}

// const mapStateToProps = (state) => ({
//     token: state.auth.token,
//     loggedIn: state.auth.loggedIn
// });

export default Lists;
