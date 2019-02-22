import { SET_TAB_INDEX } from "../constants";

export default function (state = 0, action) {
    const {type, tabIndex} = action;
    switch (type) {
        case SET_TAB_INDEX:
            return tabIndex;
    }
    return state;
}
