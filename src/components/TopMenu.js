import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";

const styles = {
    title: {
        color: "white"
    },
    profile: {
        float: "right"
    }
}

const TopMenu = props => {
    const { user } = props;

    return (
        <>
            <AppBar position="static" style={{marginBottom: "20px"}}>
                <Toolbar>
                    <Typography variant="h6" style={styles.title}>Chat App</Typography>
                    <Typography style={styles.profile}>usuario logueado: {user.email}</Typography>
                </Toolbar>
            </AppBar>
        </>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(TopMenu);