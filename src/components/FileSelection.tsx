import * as React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as FileActions from "../actions/fileActions";
import IStoreState, { IFile } from "../store/IStoreState";
import Header from "./Header";

interface IDropSettings {
    isDragActive: boolean;
    isDragReject: boolean;
}

interface IProps {
    addFile: (name: string, path: string) => any;
    files: IFile[];
}

class FileSelection extends React.Component<IProps & RouteComponentProps<any>, any> {
    constructor(props: IProps & RouteComponentProps<any>) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidUpdate() {
        if (this.props.files.length > 0) {
            this.props.history.push("/logs");
        }
    }

    onDrop(files: File[]) {
        const { name, path } = files[0];
        this.props.addFile(name, path);
    }

    renderChildren({ isDragActive, isDragReject }: IDropSettings): JSX.Element {
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

function mapStateToProps({files}: IStoreState) {
    return {
        files,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, AnyAction>) {
    return {
        addFile: (name: string, path: string) => dispatch(FileActions.addFile(name, path)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileSelection));
