import { array } from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { files } from "../../state/file/selectors";
import { Container, Dropzone, Text } from "./style";

const FileSelection = ({ files }) => {
    const { push } = useHistory();

    useEffect(() => {
        if (files.length) {
            push("/logs");
        }
    }, [files]);

    return <Container>
        <Dropzone>
            {({ getInputProps, isDragActive, isDragReject }) => {
                return <Fragment>
                    <input {...getInputProps()} />
                    <Text>
                        {!isDragActive && !isDragReject && "Drop a file here to get started or click me!"}
                        {isDragActive && !isDragReject && "This file is authorized"}
                        {isDragActive && isDragReject && "Sorry, this file is not authorized ..."}
                    </Text>
                </Fragment>
            }}
        </Dropzone>
    </Container>
};


FileSelection.propTypes = {
    files: array.isRequired
};

export default connect(
    createStructuredSelector({
        files
    })
)(FileSelection);
