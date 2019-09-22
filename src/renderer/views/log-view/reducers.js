import { SELECT_FILE } from "renderer/constants";

export default (state = 0, { selected, type }) => {
    if (type === SELECT_FILE) {
        return selected;
    }
    return state;
};
