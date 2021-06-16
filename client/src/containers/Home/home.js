

import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';


const useStyles = theme => ({
    root: {

    }

})


class Home extends Component {

    constructor(props) {

        super(props);
        this.handleAuth = this.handleAuth.bind(this);

    }
    handleAuth() {
        let token = localStorage.getItem("token");

        return token !== undefined;
    }


    render() {
        const { classes } = this.props;
        const isAuth = this.handleAuth();

        if (!isAuth) {
            return <Redirect to={{ pathname: "/signin" }} />;
        }
        return (
            <div className={classes.root}>
                <Button variant="contained" href="/signup" color="primary">
                    Sign Up
                </Button>
                <Button variant="contained" href="/login" color="secondary">
                    Login
                </Button>
            </div>
        );
    }
}



export default withStyles(useStyles, { withTheme: true })(Home);