import React from "react";
import { CircularProgress } from "@material-ui/core";

const withLoading = (props) => props.loading ? <CircularProgress /> : props.children

export default withLoading;