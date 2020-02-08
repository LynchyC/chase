import { createSelector } from "reselect";

import view from "../selectors";

export default createSelector(view, ({ log }) => {
    return log;
});
