import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../../reducers/navbarSlice';
import "./style.css"



const List = (props) => {

    const email = useSelector(selectEmail)//state => state.navbar.email)

    return (
            <div className="listItem">
                <p> email: {email}</p>
                <p> Name: {props.name}</p>
                <p> Surname: {props.surname}</p>
           
            </div>

    );
}

export default List;