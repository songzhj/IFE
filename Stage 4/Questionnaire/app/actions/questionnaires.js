/**
 * Created by songzhj on 2016/8/12.
 */
import { createAction } from "redux-actions";
import * as Types from "../constants/QuestionnaireActionTypes";

export const addQuestionnaire = createAction(Types.ADD_QUESTIONNAIRE);
export const editQuestionnaire = createAction(Types.EDIT_QUESTIONNAIRE, questionnaire => questionnaire);
export const removeQuestionnaire = createAction(Types.REMOVE_QUESTIONNAIRE, questionnaire => questionnaire);
export const saveQuestionnaire = createAction(Types.SAVE_QUESTIONNAIRE);
export const releaseQuestionnaire = createAction(Types.RELEASE_QUESTIONNAIRE);
// export const sortQuestionnaire = createAction(Types.SORT_QUESTIONNAIRE, dataKey => dataKey);
export const fillQuestionnaire = createAction(Types.FILL_QUESTIONNAIRE, questionnaire => questionnaire);
export const submitQuestionnaire = createAction(Types.SUBMIT_QUESTIONNAIRE);
export const closeQuestionnaire = createAction(Types.CLOSE_QUESTIONNAIRE, questionnaire => questionnaire);
export const editText = createAction(Types.EDIT_TEXT, (content, question, option) => ({ content, question, option }));
export const saveText = createAction(Types.SAVE_TEXT, content => content);
export const fillText = createAction(Types.FILL_TEXT, (content, question) => ({ content, question }));
export const chooseType = createAction(Types.CHOOSE_TYPE, type => type);
export const addQuestion = createAction(Types.ADD_QUESTION, type => type);
export const removeQuestion = createAction(Types.REMOVE_QUESTION, question => question);
export const shiftQuestion = createAction(Types.SHIFT_QUESTION, (question, direction) => ({ question, direction }));
export const copyQuestion = createAction(Types.COPY_QUESTION, question => question);
export const addOption = createAction(Types.ADD_OPTION, question => question);
export const removeOption = createAction(Types.REMOVE_OPTION, (question, option) => ({ question, option }));
export const chooseOption = createAction(Types.CHOOSE_OPTION, (question, option) => ({ question, option }));
export const toggleOption = createAction(Types.TOGGLE_OPTION, (question, option) => ({ question, option }));
export const toggleRequirement = createAction(Types.TOGGLE_REQUIREMENT, question => question);
export const saveTime = createAction(Types.SAVE_TIME, (year, month, date) => ({ year, month, date }));
export const checkData = createAction(Types.CHECK_DATA, questionnaire => questionnaire);