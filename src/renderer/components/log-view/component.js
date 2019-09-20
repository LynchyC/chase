import { ipcRenderer } from "electron";
import React, { Component, createRef } from "react";

import { Button, ButtonTray, Container, Label, Text } from "renderer/components/log-view/style";
import { Tab, Tabs } from "renderer/components/tabs";
import IpcManager from "renderer/ipc-manager";

// TODO: Re-implement saving scrollTop
export default class LogView extends Component {
    selected = createRef();

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
        this.setScroll();
    }

    componentDidUpdate() {
        const { history, file: { allIds } } = this.props;
        if (!allIds.length) {
            history.push("/");
        } else {
            this.setScroll();
        }
    }

    componentWillUnmount() {
        ipcRenderer.removeListener("log:changed", this.handleFileListener);
    }

    handleFileListener = (event, fileContent) => {
        this.props.updateFile(fileContent);
    };

    setScroll = () => {
        const { file: { allIds, byId, selected } } = this.props;
        const id = allIds[selected];
        if (byId[id].follow) {
            const { current } = this.selected;
            current.scrollTop = current.scrollHeight;
        }
    };

    onChangeFollow = (id) => {
        return () => {
            this.props.followFile(id);
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
            this.props.selectFile(index);
        };
    };

    onClickOpen = (id) => {
        return () => {
            IpcManager.openFileInExplorer(id);
        };
    };

    renderFile = (id, index) => {
        const { file: { byId, selected } } = this.props;
        const active = (selected === index);
        const { content, follow, name, path } = byId[id];
        return <Tab key={id}
                    heading={name}
                    onClickTab={this.onClickTab(index)}
                    onClickIcon={this.onClickIcon(id)}
                    tabIndex={index}
                    title={path}>
            <Text value={content}
                  ref={active ? this.selected : null}
                  readOnly/>
            <ButtonTray>
                <Label>
                    Follow
                    <input type="checkbox"
                           onChange={this.onChangeFollow(id)}
                           checked={follow}/>
                </Label>
                <Button onClick={this.onClickOpen(id)}>
                    Open in Explorer
                </Button>
            </ButtonTray>
        </Tab>
    };

    render() {
        const { file: { allIds, selected } } = this.props;
        return <Container>
            {allIds.length > 0 && <Tabs activeTabIndex={selected}>
                {allIds.map(this.renderFile)}
            </Tabs>}
        </Container>
    };
}
