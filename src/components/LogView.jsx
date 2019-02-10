import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import * as FileActions from "../actions/fileActions";
import Header from "./Header";

class LogView extends React.Component {
    constructor(props) {
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

    handleFileListener = (event, fileWithContent) => {
        this.props.updateFile(fileWithContent);
    };

    handleRemoveTab = (event, id) => {
        event.preventDefault();
        this.props.removeFile(id);
    }

    render() {
        return (
            <div className="logView">
                <Header />
                {this.props.files.length > 0 &&
                    <Tabs selectedIndex={this.state.tabIndex}
                        onSelect={(tabIndex) => this.setState(() => ({ tabIndex }))}
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

function mapStateToProps(state) {
    return {
        files: state.files,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeFile: (id) => dispatch(FileActions.removeFile(id)),
        updateFile: (file) => dispatch(FileActions.updateFile(file)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogView));

