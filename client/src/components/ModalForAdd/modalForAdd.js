import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button,TextField, InputAdornment} from '@material-ui/core';
import our_api from '../../utils/requests'
import { selectToken } from "../../reducers/authSlice"
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
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

const  ModalForAdd = (props) => {
  const classes = useStyles();
  const [textField, setTextField ] = React.useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [isGroupNameWrong, setIsGroupNameWrong] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const onAdd = () => {
    our_api.addGroup(token,textField)
    .then( () => {
        dispatch(setLoadingNeededTeams(true));
        alert("Group Added Succesfully");
        
    } )
    .catch( (err) => {console.log(err)})
  }

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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => {setTextField(""); handleOpen();}}>
              Add Group
          </Button>
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
           <div className={classes.paper}>
              <h1> Add Group</h1>
              <TextField 
                id="outlined-basic" 
                label="New Group Name" 
                variant="outlined" 
                // InputProps={{
                //   startAdornment: <InputAdornment position="start">group_</InputAdornment>,
                // }}
                defaultValue ="" 
                value={textField} 
                onChange={(e) => {console.log(e.target.value); handleChange(e);}}
              />
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
                onClick={(evt) =>  {handleClose();onAdd();}}  
                className={classes.button}
              >
                  Add Group
              </Button>
            </div>
        </Modal>
    </div>
  );
}

export default ModalForAdd;