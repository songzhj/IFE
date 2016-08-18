import React,{PropTypes} from "react";
import styles from "./Main.scss";

function Main({children}) {
    "use strict";
    return (
        <div className={styles.wrap}>
            {children}
        </div>
    );
}

export default Main;