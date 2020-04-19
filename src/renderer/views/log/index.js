import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { follow, remove, setPosition, update } from "../../state/file/actions";
import select from "./actions";
import LogView from "./component";
import { files } from "../../state/file/selectors";
import selected from "./selectors";

export default connect(createStructuredSelector({
    files,
    selected
}), {
    follow,
    remove,
    select,
    setPosition,
    update
})(LogView);


