import React from "react";

const styles = {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "27px"
}

export const AvatarUser = ({text}) => (
    <span style={styles}>{text}</span>
);