import React from "react";

const styles = {
    color: "red",
    fontSize: "11px",
}

export const ErrorField = props => props.error && <div><span style={styles}>*{props.error}</span></div>