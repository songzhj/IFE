/**
 * Created by songzhj on 2016/8/14.
 */
import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import questionnaires from "./questionnaires";
import dialog from "./dialog";
import calendar from "./calendar";

const rootReducer = combineReducers({
    routing,
    questionnaires,
    dialog,
    calendar
});

export default rootReducer;