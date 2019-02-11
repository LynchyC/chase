import * as React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { addFile } from "../actions/fileActions";
import Header from "./Header";

const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    padding: 0 5%;
    width: 100%;
`;

const StyledDropzone = styled.div`
    align-items: center;
    background-color: ${({isActive}) => isActive && "#1D2F49" };
    border: 4px dashed white;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    height: 85vh;
    justify-content: center;
    outline: 0;
    user-select: none;

    @media screen and (min-height: 480px) and (min-width: 520px) {
        border: 8px dashed white;
    }
`;

const DropzoneHeader = styled.h1`
    text-align: center;
    font-size: 1rem;

    @media screen and (min-height: 480px) and (min-width: 520px) {
        font-size: 2.5rem;
    }
`;

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
            <StyledDropzone {...getRootProps()} isActive={isDragActive}>
                <input {...getInputProps()} />
                <DropzoneHeader>
                    {!isDragActive && !isDragReject && "Drop a file here to get started or click me!"}
                    {isDragActive && !isDragReject && "This file is authorized"}
                    {isDragActive && isDragReject && "Sorry, this file is not authorized ..."}
                </DropzoneHeader>
            </StyledDropzone>
        );
    }

    render() {
        return (
            <Container>
                <Header />
                <Dropzone
                    accept="text/*"
                    multiple={false}
                    onDrop={this.onDrop}
                >
                    {this.renderChildren}
                </Dropzone>
            </Container>
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
        addFile: (name, path) => dispatch(addFile(name, path)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FileSelection));
