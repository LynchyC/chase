import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { array, func, shape } from "prop-types";

import { Area, Container, Text } from "./style";

export default class FileSelection extends Component {

    static propTypes = {
        addFile: func.isRequired,
        files: array.isRequired,
        history: shape({
            push: func.isRequired
        }).isRequired
    };

    componentDidUpdate() {
        const { files, history } = this.props;
        if (files.length) {
            history.push("/logs");
        }
    }

    onDrop = (files = []) => {
        if (files.length) {
            const { name, path } = files[0];
            this.props.addFile(name, path);
        }
    };

    renderChildren = ({ getInputProps, getRootProps, isDragActive, isDragReject }) => {
        return <Area {...getRootProps()}>
            <input {...getInputProps()} />
            <Text>
                {!isDragActive && !isDragReject && "Drop a file here to get started or click me!"}
                {isDragActive && !isDragReject && "This file is authorized"}
                {isDragActive && isDragReject && "Sorry, this file is not authorized ..."}
            </Text>
        </Area>;
    }

    render() {
        return <Container>
            <Dropzone
                accept="text/*"
                multiple={false}
                onDrop={this.onDrop}
            >
                {this.renderChildren}
            </Dropzone>
        </Container>;
    }
}
