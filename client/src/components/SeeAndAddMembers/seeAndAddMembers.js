import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import NarrowMemberList from "../NarrowMemberList/narrowMemberList"
import { selectCompanyMembers, selectGroupId, setLoadingNeededCompanyMembers } from '../../reducers/teamSlice'
import { selectToken } from '../../reducers/authSlice'
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import our_api from "../../utils/requests"

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 100,
    },
    button: {
        width: "25vw",
        minWidth: 250,
        marginTop: 30,
    },
    autoComplete: {
        width: "25vw",
        minWidth: 250,
        marginBottom: 30,
    },
    narrowMemberList: {
        minWidth: 250,
        width: "25vw",
    },

}));


const SeeAndAddMembers = () => {
    const classes = useStyles();
    const groupId = useSelector(selectGroupId);
    const token = useSelector(selectToken);

    const [value, setValue] = React.useState({tags: []});
    const [inputValue, setInputValue] = React.useState('');
    const dispatch = useDispatch();
    
    const handleAddMember = () => {
  
        const memberList = value.tags.map( (item) => item._id);
    
        console.log("memberIds",memberList);
        console.log("groupId",groupId);

        our_api.addMemberListBulk(token, memberList, groupId)
        .then( (data) => {
            alert("Members are added"); 
            dispatch(setLoadingNeededCompanyMembers(true));
            setValue({tags: []})
        })
        .catch( (err) => {
            console.log(err);
        })
        
    }


    const onTagsChange = (event, values) => {
        setValue({tags: values});
        console.log("values:", values);
        console.log("value", value);
    }
    // let members = [
    //     { title: 'Loading...', year: 1994 },
    //   ];
      
    const companyMembers = useSelector(selectCompanyMembers);
    //select olan sayfa

    return ( 
        <div className={classes.root}>
            <Autocomplete
                disabled={groupId === undefined}
                className={classes.autoComplete}
                multiple
                id="tags-standard"
                onChange={onTagsChange}
                options={companyMembers}
                value={value.tags}
                limitTags={2}
                //defaultValue={["cavitcakir@sabanciuniv.edu", "kayakapagan@sabanciuniv.edu", "gokberkyar@sabanciuniv.edu", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj", "def", "ghj"]}
                getOptionLabel={(option) => option.email}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="All Users"
                    placeholder="All Users"
                />
                )}
            />

            <NarrowMemberList className={classes.narrowMemberList}/>

            <Button variant="contained" color="primary" disabled={groupId === undefined} onClick={handleAddMember} className={classes.button}>
                Add Members
            </Button>   
        </div>
    );
}

export default SeeAndAddMembers;