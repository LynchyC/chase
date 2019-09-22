import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { followFile, removeFile, setScroll, updateFile } from "renderer/state/file/actions";
import selectFile from "renderer/views/log-view/actions";
import LogView from "./component";
import { files } from "renderer/state/file/selectors";
import selected from "renderer/views/log-view/selectors";

export default withRouter(
    connect(createStructuredSelector({
        files,
        selected
    }), {
        followFile,
        removeFile,
        selectFile,
        setScroll,
        updateFile
    })(LogView)
);


