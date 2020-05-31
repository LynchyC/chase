import { func, string } from "prop-types";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { useDropzone } from "react-dropzone";

import { add } from "../../state/file/actions";
import Container from "./style";

const Dropzone = ({ add, children, className }) => {

    const onDrop = useCallback((files = []) => {
        if (files.length) {
            const [{ name, path }] = files;
            add(name, path);
        }
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject
    } = useDropzone({
        multiple: false,
        onDrop
    });

    return <Container
        {...getRootProps()}
        className={className}
    >
        {children && children({
            getInputProps,
            isDragAccept,
            isDragActive,
            isDragReject
        })}
    </Container>;
};

Dropzone.defaultProps = {
    children: null,
    className: ""
};

Dropzone.propTypes = {
    add: func.isRequired,
    children: func,
    className: string
};

export default connect(null, { add })(Dropzone);
