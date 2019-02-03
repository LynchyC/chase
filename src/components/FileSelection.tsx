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
    getInputProps: () => any;
    getRootProps: () => any;
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
    }

    componentDidUpdate() {
        if (this.props.files.length > 0) {
            this.props.history.push("/logs");
        }
    }

    onDrop = (files: File[]) => {
        const { name, path } = files[0];
        this.props.addFile(name, path);
    }

    renderChildren({ getInputProps, getRootProps, isDragActive, isDragReject }: IDropSettings): JSX.Element {
        return (
            <div {...getRootProps()} className={isDragActive ? "dropzone--active" : "dropzone"}>
                <input {...getInputProps()} />
                <h1 className="dropzone__header">
                    {!isDragActive && !isDragReject && "Drop a file here to get started or click me!"}
                    {isDragActive && !isDragReject && "This file is authorized"}
                    {isDragActive && isDragReject && "Sorry, this file is not authorized ..."}
                </h1>
        </div>);
    }

    render() {
        return (
            <div className="fileSelection">
                <Header />
                <Dropzone
                    accept="text/*"
                    multiple={false}
                    onDrop={this.onDrop}
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
