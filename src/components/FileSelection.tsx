import * as React from "react";
import Dropzone, { DropFileEventHandler } from "react-dropzone";
import Header from "./Header";

interface IDropSettings {
    isDragActive: boolean;
    isDragReject: boolean;
}

export default class FileSelection extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
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
                    className="dropzone"
                >
                {this.renderChildren}
                </Dropzone>
            </div>
        );
    }
}
