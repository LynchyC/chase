import { createSelector } from "reselect";

export const file = ({ file }) => {
    return file;
};

export const files = createSelector(file, (file) => {
    return Object.values(file);
});
