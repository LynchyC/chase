import { createSelector } from "reselect";

import view from "renderer/views/selectors";

export default createSelector(view, ({ log }) => {
    return log;
});
