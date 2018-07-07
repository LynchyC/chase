import * as React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as FileActions from "../actions/fileActions";
import IStoreState from "../store/IStoreState";
import Header from "./Header";

interface IDropSettings {
    isDragActive: boolean;
    isDragReject: boolean;
}

interface IProps {
    addFile: (path: string) => any;
}

class FileSelection extends React.Component<IProps & RouteComponentProps<any>, any> {
    constructor(props: IProps & RouteComponentProps<any>) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files: File[]) {
        const { path } = files[0];
        this.props.addFile(path);
        this.props.history.push("/logs");
    }

    renderChildren({ isDragActive, isDragReject}: IDropSettings): JSX.Element {
        if (isDragActive) {
            return <h1 className="dropzone__header">This file is authorized</h1>;
        } else if (isDragReject) {
            return <h1 className="dropzone__header">Sorry, this file is not authorized ...</h1>;
        } else {
            return <h1 className="dropzone__header">Drop a file here to get started or click me!</h1>;
        }
    }

    render() {
        return (
            <div className="fileSelection">
                <Header />
                <Dropzone
                    accept="text/plain"
                    activeClassName="dropzone--active"
                    multiple={false}
                    onDrop={this.onDrop}
                    className="dropzone"
                >
                {this.renderChildren}
                </Dropzone>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, AnyAction>) {
    return {
        addFile: (path: string) => dispatch(FileActions.addFile(path)),
    };
}

export default withRouter(connect(null, mapDispatchToProps)(FileSelection));
