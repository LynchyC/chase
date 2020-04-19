import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FileSelection from "./component";
import { add } from "../../state/file/actions";
import { files } from "../../state/file/selectors";

export default connect(
    createStructuredSelector({
        files
    }), {
    add
})(FileSelection);
