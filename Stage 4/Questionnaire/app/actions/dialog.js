/**
 * Created by songzhj on 2016/8/12.
 */
import { createAction } from "redux-actions";
import * as Types from "../constants/DialogActionTypes";

export const switchDialog = createAction(Types.SWITCH_DIALOG, id => id);