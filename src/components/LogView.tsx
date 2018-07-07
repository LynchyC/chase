import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as FileActions from "../actions/fileActions";
import IStoreState, { IFile } from "../store/IStoreState";
import Header from "./Header";

interface IProps {
    files: IFile[];
    removeFile: (id: string) => any;
    updateFile: (file: IFile) => any;
}

class LogView extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        ipcRenderer.on("log:loaded", (event: Event, fileWithContent: IFile) => {
            this.props.updateFile(fileWithContent);
        });
    }

    render() {
        return (
            <div className="logView">
                <Header />
                <Tabs defaultIndex={0}>
                    <TabList>
                        {
                            this.props.files.map((file, index) => {
                                return (
                                    <Tab key={index}>{file.path}</Tab>
                                );
                            })
                        }
                    </TabList>

                    <TabPanel>
                        {
                            this.props.files.map((file, index) => {
                                return (
                                    <textarea className="logContent" key={index} value={file.content}></textarea>
                                );
                            })
                        }
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

function mapStateToProps(state: IStoreState) {
    return {
        files: state.files,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<IStoreState, null, AnyAction>) {
    return {
        removeFile: (id: string) => dispatch(FileActions.removeFile(id)),
        updateFile: (file: IFile) => dispatch(FileActions.updateFile(file)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogView);

