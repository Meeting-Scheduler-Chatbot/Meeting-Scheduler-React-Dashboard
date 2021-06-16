import React, { useEffect, useState } from 'react';
import NarrowGroupList from "../../components/NarrowGroupList/narrowGroupList"
import { useDispatch, useSelector } from 'react-redux';
import myTheme from "../../themes/themes"
import { makeStyles } from '@material-ui/core/styles';
import our_api from "../../utils/requests"
import { selectToken } from "../../reducers/authSlice"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { setTeams,
        setCompanyMembers,
        setLoadingNeededTeams,
        selectLoadingNeededTeams,
        selectLoadingNeededCompanyMembers,
        setLoadingNeededCompanyMembers,
        selectGroupId,
} from '../../reducers/teamSlice';
import SeeAndAddMembers from "../../components/SeeAndAddMembers/seeAndAddMembers"
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        marginTop: myTheme.spacing(20),
        margin: "auto",
    },
    card: {
        height: '60vh',
        minWidth: 690,
        padding: 30,
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },

}));

const AddGroupMemberPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const groupId = useSelector(selectGroupId);
    const isLoadingNeededCompanyMembers = useSelector(selectLoadingNeededCompanyMembers);
    const isLoadingNeededTeams = useSelector(selectLoadingNeededTeams);
    const [isLoadingTeams, setIsLoadingTeams] = useState(true);
    const [isLoadingCompanyMembers, setIsLoadingCompanyMembers] = useState(true);

    const loadingData = [{ name: "Loading..."}]

    useEffect(() => {
        dispatch(setTeams(loadingData));
        dispatch(setCompanyMembers(loadingData));
    },[])

    useEffect(() => {
        our_api.getMyGroups(token)
        .then((req) => { 
            dispatch(setTeams(req.data.data));
            console.log("TEAMS", req.data.data)
            dispatch(setLoadingNeededTeams(false));
            setIsLoadingTeams(false);
        })
    }, [token, isLoadingTeams, isLoadingNeededTeams])

    useEffect(() => {
        our_api.getMembersOfMyCompany(token, groupId)
        .then((req) => {
            dispatch(setCompanyMembers(req.data.data));
            setIsLoadingCompanyMembers(false);
            setLoadingNeededCompanyMembers(false);
        })
    }, [token, isLoadingCompanyMembers, groupId, isLoadingNeededCompanyMembers])


    if (isLoadingCompanyMembers || isLoadingTeams)
    {
        return (
            <h1>LOADING</h1>
        );
    }
    else{
        return ( 
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <NarrowGroupList />
                        <SeeAndAddMembers />
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default AddGroupMemberPage;