import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
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

interface IState {
    tabIndex: number;
}

class LogView extends React.Component<IProps & RouteComponentProps<any>, IState> {
    constructor(props: IProps & RouteComponentProps<any>) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
    }

    componentDidUpdate() {
        if (this.props.files.length === 0) {
            this.props.history.push("/");
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeListener("log:changed", this.handleFileListener);
    }

    handleFileListener(event: Event, fileWithContent: IFile): void {
        this.props.updateFile(fileWithContent);
    }

    handleRemoveTab(event: Event, id: string): void {
        event.preventDefault();
        this.props.removeFile(id);
    }

    render() {
        return (
            <div className="logView">
                <Header />
                {this.props.files.length > 0 &&
                    <Tabs selectedIndex={this.state.tabIndex}
                        onSelect={(tabIndex: number) => this.setState(() => ({ tabIndex }))}
                        forceRenderTabPanel>
                        <TabList>
                            {
                                this.props.files.map((file, index) => {
                                    return (
                                        <Tab key={index}>
                                            <span title={file.path}>
                                                {file.name}
                                            </span>
                                            <button
                                                className="react-tab__btn"
                                                onClick={() => this.handleRemoveTab(event, file.id)}>
                                                Close
                                            </button>
                                        </Tab>
                                    );
                                })
                            }
                        </TabList>

                        <TabPanel>
                            {
                                this.props.files.map((file, index) => {
                                    return (
                                        <textarea
                                            className="react-tabs__tab-panel__textarea"
                                            key={index}
                                            value={file.content}
                                            readOnly
                                        >
                                        </textarea>
                                    );
                                })
                            }
                        </TabPanel>
                    </Tabs>
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogView));

