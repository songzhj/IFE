import React, {PropTypes} from "react";
import {Header, Main} from "../";
import styles from "./App.scss";
import "../../styles/reset.css";

function App({children}) {
    "use strict";
    return (
      <div className={styles.container}>
          <Header/>
          <Main>
              {children}
          </Main>
      </div>
    );
}

export default App;