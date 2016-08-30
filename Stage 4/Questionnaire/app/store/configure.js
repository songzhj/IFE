/**
 * Created by songzhj on 2016/8/10.
 */

import {createStore} from "redux";
import rootReducer from "../reducers";

const configure = initialState => {
    "use strict";
    const store = createStore(rootReducer, initialState, window.devToolsExtension ? window.devToolsExtension : undefined);
    if (module.hot) {
        module.hot.accept("../reducers", () => {
            const nextReducers = require("../reducers");
            store.replaceReducer(nextReducers);
        });
    }
    return store;
}

export default configure;