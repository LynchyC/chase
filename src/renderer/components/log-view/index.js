import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { followFile, removeFile, selectFile, updateFile } from "renderer/state/file/actions";
import LogView from "./component";

export default withRouter(
    connect(({ file }) => ({ file }), {
        followFile,
        removeFile,
        updateFile,
        selectFile
    })(LogView)
);


