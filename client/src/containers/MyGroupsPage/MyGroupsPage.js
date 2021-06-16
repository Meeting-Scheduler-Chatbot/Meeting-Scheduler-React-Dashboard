import React, { useEffect, useState } from 'react';
import GroupList from '../../components/GroupList/groupList'
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../reducers/teamSlice';
import myTheme from "../../themes/themes"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import our_api from "../../utils/requests"
import { selectToken } from "../../reducers/authSlice"

const useStyles = makeStyles( (theme) => ({
    root: {
        minWidth: 250,
        width: '80%',
        marginTop: myTheme.spacing(20),
        margin: "auto",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        margin: myTheme.spacing(5),
    }
}));

const MyGroupsPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState([{ name: "loading..."}]);
    
   
    useEffect(() => {
        dispatch(setTeams(data));
        our_api.getMyGroups(token)
        .then((req) => {
            dispatch(setTeams(req.data.data));
            setIsLoading(false);
        })
    }, [token, isLoading])

    if (isLoading)
    {
        return (
            <h1>LOADING</h1>
        );
    }
    else{
    
    return ( 
        <div className={classes.root}>
            <div className={classes.header}>
                <h1>MY GROUPS</h1>
                <Button className={classes.button} color="secondary" variant="contained" >
                    Add Group
                </Button>
            </div>
            <GroupList/>
        </div>
        
     );
    }
}
 
export default MyGroupsPage;