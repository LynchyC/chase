import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

import { followFile, removeFile, selectFile, updateFile } from "../actions/watchlist";

import "react-tabs/style/react-tabs.css";

const Container = styled.div`
    height: 100vh;
    padding: 2%;
    width: 100%;
`;

const Button = styled.button`
    margin-left: 5px;
    vertical-align: bottom;
`;

const Text = styled.textarea`
    border: none;
    color: transparent;
    height: 85vh;
    resize: none;
    text-shadow: 0 0 0 black;
    width: 100%;
    
    &:focus {
        outline: none;
    }
`;

@withRouter
@connect(({ watchlist }) => ({ watchlist }),
    (dispatch) => ({
        followFile: (id) => dispatch(followFile(id)),
        removeFile: (id) => dispatch(removeFile(id)),
        updateFile: (file) => dispatch(updateFile(file)),
        selectFile: (index) => dispatch(selectFile(index))
    }))
export default class LogView extends React.Component {
    selectedFile = React.createRef();

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
        this.setScroll();
    }

    componentDidUpdate() {
        const { history, watchlist } = this.props;
        if (!watchlist.allFiles.length) {
            history.push("/");
        }

        if (this.selectedFile.current) {
            this.setScroll();
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeListener("log:changed", this.handleFileListener);
    }

    setScroll() {
        const { current } = this.selectedFile;
        const { watchlist } = this.props;
        const { allFiles, files, selectedFile } = watchlist;
        const { follow } = files[allFiles[selectedFile]];

        if (follow) {
            current.scrollTop = current.scrollHeight;
        }
    }

    handleFileListener = (event, fileWithContent) => {
        this.props.updateFile(fileWithContent);
    };

    getFile = (id) => {
        const { watchlist } = this.props;
        return watchlist.files[id];
    };

    onChangeFollowFile = (id) => {
        this.props.followFile(id);
    };

    onClickCloseTab = (event, id) => {
        event.preventDefault();
        this.props.removeFile(id);
    };

    onSelectTab = (index) => {
        this.props.selectFile(index);
    };

    render() {
        const { watchlist } = this.props;
        const { allFiles, selectedFile } = watchlist;
        return (
            <Container>
                {allFiles.length > 0 &&
                <Tabs
                    selectedIndex={selectedFile}
                    onSelect={(index) => this.onSelectTab(index)}
                >
                    <TabList>
                        {allFiles.map(this.renderTabList)}
                    </TabList>
                    {allFiles.map(this.renderTabPanel)}
                </Tabs>
                }
            </Container>
        );
    }

    renderTabList = (id) => {
        const { name, path } = this.getFile(id);
        return <Tab key={id}>
            <span title={path}>{name}</span>
            <Button onClick={() => this.onClickCloseTab(event, id)}>
                Close
            </Button>
        </Tab>
    };

    renderTabPanel = (id, index) => {
        const { watchlist: { selectedFile } } = this.props;
        const active = (selectedFile === index);
        const { content, follow } = this.getFile(id);

        return <TabPanel key={id}>
            <Text value={content}
                  ref={active ? this.selectedFile : null}
                  readOnly/>
            <label>Follow</label>
            <input type="checkbox"
                   onChange={() => this.onChangeFollowFile(id)}
                   checked={follow}/>
        </TabPanel>
    };
}
