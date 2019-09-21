import { createSelector } from "reselect";

export const file = ({ file }) => {
    return file;
};

export const files = createSelector(file, ({ byId }) => {
    return Object.values(byId);
});

export const selected = createSelector(file, ({ selected }) => {
    return selected;
});
