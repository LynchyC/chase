import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

import { removeFile, updateFile } from "../actions/fileActions";
import { setTabIndex } from "../actions/tabActions";
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

@withRouter
@connect(({files, tabIndex}) => ({files, tabIndex}),
    (dispatch) => ({
        removeFile: (id) => dispatch(removeFile(id)),
        setTabIndex: (index) => dispatch(setTabIndex(index)),
        updateFile: (file) => dispatch(updateFile(file))
    }))
export default class LogView extends React.Component {

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
    }

    componentDidUpdate(prevProps) {
        const {files, history, setTabIndex} = this.props;
        if (files.length === 0) {
            history.push("/");
        } else if (prevProps.files.length !== files.length) {
            setTabIndex(files.length - 1);
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
        this.props.setTabIndex(tabIndex);
    };

    renderTabList = ({id, name, path}) => {
        return <Tab key={id}>
            <span title={path}>{name}</span>
            <Button onClick={() => this.onClickCloseTab(event, id)}>
                Close
            </Button>
        </Tab>
    };

    renderTabPanel = ({content, id}) => {
        return <TabPanel key={id}>
            <Text value={content} readOnly/>
        </TabPanel>;
    };

    render() {
        const {files, tabIndex} = this.props;
        return (
            <Container>
                <Header/>
                {files.length > 0 &&
                <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(tabIndex) => this.onSelectTab(tabIndex)}
                    forceRenderTabPanel
                >
                    <TabList>
                        {files.map(this.renderTabList)}
                    </TabList>
                    {files.map(this.renderTabPanel)}
                </Tabs>
                }
            </Container>
        );
    }
}



