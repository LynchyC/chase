import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { followFile, removeFile, selectFile, setScroll, updateFile } from "renderer/actions/watchlist";
import LogView from "./component";

export default withRouter(
    connect(({ watchlist }) => ({ watchlist }), {
        followFile,
        removeFile,
        updateFile,
        selectFile,
        setScroll
    })(LogView)
);


