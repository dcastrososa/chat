import React from "react";
import { CircularProgress } from "@material-ui/core";

export const InitiaLoading = () => (
    <div style={{width: "100%", marginTop: "25%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <CircularProgress />
    </div>
)