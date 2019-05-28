import React, { useEffect } from 'react';
import './App.css';
import { withRouter } from "react-router-dom";
import { LandPage } from './pages/LandPage';
import { InitiaLoading } from "./components/InitialLoading";
import TopMenu from "./components/TopMenu";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { UserDAO } from "./common/dao/UserDAO";
import { getCookie } from './uitl/util';

function App(props) {
  const { verifySesion, onAuthSuccess, user } = props;

  const getUser = async () => {
    try {
      const response = await UserDAO.findOne(getCookie("iduser"));
      onAuthSuccess(response.data);
    } catch (err) {
      onAuthSuccess(null);
    }
  };

  useEffect(() => {
    if (!verifySesion) {
      getUser();
    };
  }, []);

  if (!verifySesion) return <InitiaLoading />

  return (
    <>
      {user && <TopMenu />}
      <LandPage />
    </>
  );
};

const mapStateToProps = state => {
  return {
    verifySesion: state.user.verifySesion,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: (user) => dispatch(actions.authSuccess(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
