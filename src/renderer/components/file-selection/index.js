import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FileSelection from "renderer/components/file-selection/component";
import { addFile } from "renderer/state/file/actions";

export default withRouter(connect(
    ({ file }) => ({ file }), {
        addFile
    })(FileSelection)
);
