import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { followFile, removeFile, setScroll, updateFile } from "../../state/file/actions";
import selectFile from "./actions";
import LogView from "./component";
import { files } from "../../state/file/selectors";
import selected from "./selectors";

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


