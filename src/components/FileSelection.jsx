import * as React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as FileActions from "../actions/fileActions";
import Header from "./Header";

class FileSelection extends React.Component {

    componentDidUpdate() {
        if (this.props.files.length > 0) {
            this.props.history.push("/logs");
        }
    }

    onDrop = (files) => {
        const { name, path } = files[0];
        this.props.addFile(name, path);
    };

    renderChildren({ getInputProps, getRootProps, isDragActive, isDragReject }) {
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

function mapStateToProps({files}) {
    return {
        files,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addFile: (name, path) => dispatch(FileActions.addFile(name, path)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileSelection));
