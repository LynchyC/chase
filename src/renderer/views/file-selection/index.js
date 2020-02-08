import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import FileSelection from "./component";
import { addFile } from "../../state/file/actions";
import { files } from "../../state/file/selectors";

export default withRouter(connect(
    createStructuredSelector({
        files
    }), {
        addFile
    })(FileSelection)
);
