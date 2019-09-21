import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { followFile, removeFile, selectFile, updateFile } from "renderer/state/file/actions";
import LogView from "./component";
import { files, selected } from "renderer/state/file/selectors";

export default withRouter(
    connect(createStructuredSelector({
        files,
        selected
    }), {
        followFile,
        removeFile,
        updateFile,
        selectFile
    })(LogView)
);


