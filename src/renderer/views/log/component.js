import { ipcRenderer } from "electron";
import React, { Component, createRef } from "react";
import { array, func, number, shape } from "prop-types";

import { Button, ButtonTray, Container, Label, Text } from "renderer/views/log/style";
import { Tab, Tabs } from "renderer/views/tabs";
import IpcManager from "renderer/ipc-manager";

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
        setScroll: func.isRequired,
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

    getScroll = () => {
        const { scrollHeight, scrollTop } = this.selected.current;
        return { scrollHeight, scrollTop };
    };

    setScroll = () => {
        const { files, selected } = this.props;
        const { follow, scrollTop } = files[selected];
        const { scrollHeight } = this.getScroll();
        this.selected.current.scrollTop = follow ? scrollHeight : scrollTop;
    };

    toggleFollow = (id) => {
        const { scrollHeight } = this.getScroll();
        this.props.followFile(id, scrollHeight);
    };

    onChangeFollow = (id) => {
        return () => {
            this.toggleFollow(id);
        };
    };

    onClickIcon = (id) => {
        return (event) => {
            event.stopPropagation();
            this.props.removeFile(id);
        };
    };

    onClickTab = (index) => {
        return () => {
            const { files, selected, selectFile, setScroll } = this.props;
            const { id, follow } = files[selected];
            if (!follow) {
                const { scrollTop } = this.getScroll();
                setScroll(id, scrollTop);
            }
            selectFile(index);
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
        return <Tab
            key={id}
            heading={name}
            onClickTab={this.onClickTab(index)}
            onClickIcon={this.onClickIcon(id)}
            tabIndex={index}
            title={path}
        >
            <Text
                value={content}
                ref={active ? this.selected : null}
                readOnly />
            <ButtonTray>
                <Label>
                    Follow
                    <input
                        type="checkbox"
                        onChange={this.onChangeFollow(id)}
                        checked={follow} />
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
