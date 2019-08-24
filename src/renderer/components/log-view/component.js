import { ipcRenderer } from "electron";
import React, { Component, createRef } from "react";

import { Button, ButtonTray, Container, Label, Text } from "renderer/components/log-view/style";
import { Tab, Tabs } from "renderer/components/tabs";
import IpcManager from "renderer/ipc-manager";

export default class LogView extends Component {
    selectedFile = createRef();

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
        if (this.props.watchlist.allFiles.length) {
            this.setTabScrollTop();
        }
    }

    getSnapshotBeforeUpdate() {
        return this.getScrollTop();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { history, setScroll, watchlist } = this.props;
        const { allFiles, files } = watchlist;
        const { allFiles: prevFiles, selectedFile: prevSelectedFile } = prevProps.watchlist;
        if (!watchlist.allFiles.length) {
            history.push("/");
        }

        const oldFile = files[allFiles[prevSelectedFile]] || {};
        if (allFiles.length > 0
            && allFiles.length === prevFiles.length
            && oldFile.scrollTop != null
            && oldFile.scrollTop !== snapshot) {
            setScroll(oldFile.id, snapshot);
        }

        if (this.selectedFile.current) {
            this.setTabScrollTop();
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeListener("log:changed", this.handleFileListener);
    }

    setTabScrollTop() {
        const { current } = this.selectedFile;
        const { watchlist } = this.props;
        const { allFiles, files, selectedFile } = watchlist;
        const { follow, scrollTop } = files[allFiles[selectedFile]];

        current.scrollTop = follow ? current.scrollHeight : scrollTop;
    }

    handleFileListener = (event, fileWithContent) => {
        this.props.updateFile(fileWithContent);
    };

    getFile = (id) => {
        const { watchlist } = this.props;
        return watchlist.files[id];
    };

    getScrollTop() {
        const { current } = this.selectedFile;
        return (current ? current.scrollTop : null);
    }

    onChangeFollowFile = (id) => {
        return () => {
            const scrollTop = this.getScrollTop();
            this.props.followFile(id, scrollTop);
        };
    };

    onClickIcon = (id) => {
        return (evt) => {
            evt.stopPropagation();
            this.props.removeFile(id);
        };
    };

    onClickTab = (index) => {
        return () => {
            const { allFiles, selectedFile } = this.props.watchlist;
            const scrollTop = this.getScrollTop();
            this.props.setScroll(allFiles[selectedFile], scrollTop);
            this.props.selectFile(index);
        };
    };

    onClickOpenFile = (id) => {
        return () => {
            IpcManager.openFileInExplorer(id);
        };
    };

    renderFiles = (id, index) => {
        const { watchlist: { selectedFile } } = this.props;
        const active = (selectedFile === index);
        const { content, follow, name, path } = this.getFile(id);
        return <Tab key={id}
                    heading={name}
                    onClickTab={this.onClickTab(index)}
                    onClickIcon={this.onClickIcon(id)}
                    tabIndex={index}
                    title={path}>
            <Text value={content}
                  ref={active ? this.selectedFile : null}
                  readOnly/>
            <ButtonTray>
                <Label>
                    Follow
                    <input type="checkbox"
                           onChange={this.onChangeFollowFile(id)}
                           checked={follow}/>
                </Label>
                <Button onClick={this.onClickOpenFile(id)}>
                    Open in Explorer
                </Button>
            </ButtonTray>
        </Tab>
    };

    render() {
        const { watchlist } = this.props;
        const { allFiles, selectedFile } = watchlist;
        return <Container>
            {
                allFiles.length > 0 && <Tabs activeTabIndex={selectedFile}>
                    {allFiles.map(this.renderFiles)}
                </Tabs>
            }
        </Container>
    };
}
