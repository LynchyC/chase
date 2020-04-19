import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import { array, func } from "prop-types";

import { Area, Container, Text } from "./style";

const Component = ({ add, files }) => {
    const { push } = useHistory();

    useEffect(() => {
        if (files.length) {
            push("/logs");
        }
    }, [files]);

    const onDrop = useCallback((files = []) => {
        if (files.length) {
            const { name, path } = files[0];
            add(name, path);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        accept: "text/*",
        multiple: false,
        onDrop
    });

    return <Container>
        <Area {...getRootProps()}>
            <input {...getInputProps()} />
            <Text>
                {!isDragActive && !isDragReject && "Drop a file here to get started or click me!"}
                {isDragActive && !isDragReject && "This file is authorized"}
                {isDragActive && isDragReject && "Sorry, this file is not authorized ..."}
            </Text>
        </Area>
    </Container>
};


Component.propTypes = {
    add: func.isRequired,
    files: array.isRequired
};

export default Component;