import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const WithVerifySesion = props => {
    const { user } = props;

    return user ? props.children : <Redirect to="/login" />;
};

const mapStateToProps = state => {
    return {
      user: state.user.user,
      verifySesion: state.user.verifySesion
    }
};

export default connect(mapStateToProps)(WithVerifySesion);
