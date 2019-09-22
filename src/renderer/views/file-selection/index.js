import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import FileSelection from "renderer/views/file-selection/component";
import { addFile } from "renderer/state/file/actions";
import { files } from "renderer/state/file/selectors";

export default withRouter(connect(
    createStructuredSelector({
        files
    }), {
        addFile
    })(FileSelection)
);
