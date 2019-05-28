import React from "react";
import { TextField, Button } from '@material-ui/core';
import { ErrorField } from "./../../components/ErrorField";
import WithLoading from "./../../components/hocs/WithLoading";
import logo from "./../../logo.svg";
import { useLoginLogic } from "./LoginLogic";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../store/actions/index";

const LoginScreen = props => {
    const { values, styles, errors, handleTextChange, handleTextBlur, handleSubmit, formValid, isSubmitting, error, redirect } = useLoginLogic(props);

    if (redirect) {
        return <Redirect to="/conversations" />;
    };
    
    return (
        <div className="dFlex fullWidth fullHeight" style={styles.container}>
            <img className="img-responsive" src={logo} />

            <TextField 
                name="email" 
                label="Email"
                type="text" 
                value={values.email} 
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                style={styles.itemForm} />
            <ErrorField error={errors.email} />

             <TextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                style={styles.itemForm}
            />
            <ErrorField error={errors.password} />

            <WithLoading loading={isSubmitting}>
                <Button 
                    disabled={!formValid} 
                    onClick={handleSubmit} 
                    color="primary" 
                    variant="contained" 
                    style={styles.btnSend}>Enviar</Button>
            </WithLoading>

            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthSuccess: (user) => dispatch(actions.authSuccess(user))
    };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
