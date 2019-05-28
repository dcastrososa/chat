import React, { useEffect } from 'react';
import './App.css';
import { withRouter } from "react-router-dom";
import { LandPage } from './pages/LandPage';
import { InitiaLoading } from "./components/InitialLoading";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

function App(props) {
  const { verifySesion, onAuthSuccess } = props;

  useEffect(() => {
    if (!verifySesion) {
      onAuthSuccess(null);
    };
  }, []);

  if (!verifySesion) return <InitiaLoading />

  return (
    <div className="App">
      <LandPage />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    verifySesion: state.user.verifySesion
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: (user) => dispatch(actions.authSuccess(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
