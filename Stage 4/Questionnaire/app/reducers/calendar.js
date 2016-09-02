/**
 * Created by songzhj on 2016/8/12.
 */
import { handleActions } from "redux-actions";
import * as Types from "../constants/CalendarActionTypes";
import { LEFT, RIGHT, IN, OUT } from "../constants/CalendarDirectionTypes";

const now = new Date(), [year, month, date] = [now.getFullYear(), now.getMonth() + 1, now.getDate()], initialState = {
    selected: { year, month, date },
    next: { year, month, date },
    direction: "",
    display: 0,
    isOutside: false
};

const calendar = handleActions({
    [Types.SELECT_DATE](state, action) {
        const { year, month, date, display } = action.payload;
        return Object.assign({}, state, { selected: { year, month, date }, display });
    },
    [Types.SLIDE_CALENDAR](state, action) {
        const count = [, 31, !(year & 3) && ((year % 100) || !(year % 400)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const { direction, display, isOutside } = action.payload;
        let { year, month, date } = action.payload;
        switch (direction) {
            case LEFT: {
                switch (display) {
                    case 1: [year, month, date] = month === 12 ? [year + 1, 1, date] : [year, month + 1, Math.min(date, count[month + 1])]; break; //所选日期和当月最大日期中取小的
                    case 2: year++; break;
                    case 3: year += 10; break;
                    case 4: year += 100; break;
                }
                break;
            }
            case RIGHT: {
                switch (display) {
                    case 1: [year, month, date] = month === 1 ? [year - 1, 12, date] : [year, month - 1, Math.min(date, count[month - 1])]; break;
                    case 2: year--; break;
                    case 3: year -= 10; break;
                    case 4: year -= 100; break;
                }
                break;
            }
        }
        return Object.assign({}, state, { next: { year, month, date }, direction, isOutside });
    },
    [Types.ZOOM_CALENDAR](state, action) {
        const { direction, year, month, date, isOutside } = action.payload;
        switch (direction) {
            case IN: return Object.assign({}, state, { selected: { year, month, date }, next : { year, month, date }, direction, isOutside });
            case OUT: return Object.assign({}, state, { next: { year, month, date }, direction, isOutside });
            default: return Object.assign({}, state, { next: { year, month, date }, direction: "", isOutside });
        }
    }
}, initialState);

export default calendar;