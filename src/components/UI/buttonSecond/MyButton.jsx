import React from "react";
import classes from "./MyButtonSecond.module.css";

const MyButtonSecond = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtnSecond}>
            {children}
        </button>
    );
}

export default MyButtonSecond;
