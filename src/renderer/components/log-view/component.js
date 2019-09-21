import { ipcRenderer } from "electron";
import React, { Component, createRef } from "react";
import { array, func, number, shape } from "prop-types";

import { Button, ButtonTray, Container, Label, Text } from "renderer/components/log-view/style";
import { Tab, Tabs } from "renderer/components/tabs";
import IpcManager from "renderer/ipc-manager";

// TODO: Re-implement saving scrollTop
export default class LogView extends Component {
    selected = createRef();

    static propTypes = {
        files: array.isRequired,
        followFile: func.isRequired,
        history: shape({
            push: func.isRequired
        }).isRequired,
        removeFile: func.isRequired,
        selected: number.isRequired,
        selectFile: func.isRequired,
        updateFile: func.isRequired
    };

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
        this.setScroll();
    }

    componentDidUpdate() {
        const { files, history } = this.props;
        if (!files.length) {
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
        const { files, selected } = this.props;
        const { follow } = files[selected];
        if (follow) {
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

    renderFile = ({ content, follow, id, name, path }, index) => {
        const { selected } = this.props;
        const active = (selected === index);
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
        const { files, selected } = this.props;
        return <Container>
            {files.length > 0 && <Tabs activeTabIndex={selected}>
                {files.map(this.renderFile)}
            </Tabs>}
        </Container>
    };
}
