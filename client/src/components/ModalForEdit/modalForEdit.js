import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button,TextField,} from '@material-ui/core';
import our_api from '../../utils/requests'
import { selectToken } from "../../reducers/authSlice"
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import InputAdornment from "@material-ui/core/InputAdornment"

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {  setLoadingNeededTeams } from '../../reducers/teamSlice';

const useStyles = makeStyles((theme) => ({
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
  button: {
    minWidth: "100%",
    marginTop: 30,
    marginBottom: 30,
  },

}));

const  ModalForEdit = (props) => {
  const classes = useStyles();
  const [textField,setTextField ] = React.useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const [isGroupNameWrong, setIsGroupNameWrong] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleChange = (e) => {
    let isMatch = e.target.value.match(/group_\w+/g);
    setTextField(e.target.value)
    if (isMatch && isMatch[0] === e.target.value) {
      setIsGroupNameWrong(false);
    }
    else {
      setIsGroupNameWrong(true);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };
  
  const onEdit = (element) => {
    our_api.editGroup(token, element._id, textField)
    .then( () => {
      dispatch(setLoadingNeededTeams(true));
      alert("Group Edited Succesfully");
    } )
    .catch( (err) => {console.log(err)})
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <IconButton  onClick={() => {setTextField(""); handleOpen();}}>
          <EditIcon />
        </IconButton>
                  
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
           <div className={classes.paper}>
                      <h1> Edit Group</h1>
                      <TextField
                        placeholder={props.element.name}
                        variant="outlined"
                        // InputProps={{
                        //   startAdornment: <InputAdornment position="start">group_</InputAdornment>,
                        // }}
                        defaultValue={props.element.name}
                        value={textField}
                        onChange={(e) => {console.log(e.target.value); handleChange(e)}}/>
                        {
                          isGroupNameWrong ?
                          <span>
                            <br/>
                            <br/>
                            <div>Grup Name is not correct it should start with</div>
                            <div>"group_" and there should not be any spaces!</div>
                          </span>
                          : <span></span>
                        }
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {e.stopPropagation(); handleClose();
                        onEdit(props.element);
                         }}
                        className={classes.button}
                      >
                          Edit Group
                      </Button>
            </div>
        </Modal>
    </div>
  );
}

export default ModalForEdit;