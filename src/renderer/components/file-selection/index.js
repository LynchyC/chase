import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FileSelection from "renderer/components/file-selection/component";
import { addFile } from "renderer/actions/watchlist";

export default withRouter(connect(
    ({ watchlist }) => ({ watchlist }), {
        addFile
    })(FileSelection)
);
