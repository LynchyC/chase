import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

import { removeFile, updateFile } from "../actions/fileActions";
import Header from "./Header";
import "react-tabs/style/react-tabs.css";

const Container = styled.div`
    height: 100vh;
    padding: 0 5%;
    width: 100%;
`;

const Button = styled.button`
    margin-left: 5px;
    vertical-align: bottom;
`;

const Text = styled.textarea`
    border: none;
    border-radius: 5px;
    color: transparent;
    height: 80vh;
    resize: none;
    text-shadow: 0 0 0 black;
    width: 100%;
    
    &:focus {
        outline: none;
    }
`;

class LogView extends React.Component {

    state = {
        tabIndex: 0,
    };

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

    onClickCloseTab = (event, id) => {
        event.preventDefault();
        this.props.removeFile(id);
    };

    onSelectTab = (tabIndex) => {
        this.setState(() => ({ tabIndex }));
    };

    renderTabList = ({ id, name, path }) => {
        return <Tab key={id}>
            <span title={path}>{name}</span>
            <Button onClick={() => this.onClickCloseTab(event, id)}>
                Close
            </Button>
        </Tab>
    };

    renderTabPanel = ({ content, id }) => {
        return <Text key={id} value={content} readOnly />
    };

    render() {
        return (
            <Container>
                <Header />
                {this.props.files.length > 0 &&
                    <Tabs
                        selectedIndex={this.state.tabIndex}
                        onSelect={(tabIndex) => this.onSelectTab(tabIndex)}
                        forceRenderTabPanel
                    >
                        <TabList>
                            {this.props.files.map(this.renderTabList)}
                        </TabList>
                        <TabPanel>
                            {this.props.files.map(this.renderTabPanel)}
                        </TabPanel>
                    </Tabs>
                }
            </Container>
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
        removeFile: (id) => dispatch(removeFile(id)),
        updateFile: (file) => dispatch(updateFile(file)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogView));

