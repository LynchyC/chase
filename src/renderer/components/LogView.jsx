import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Tabs, Tab } from "renderer/components/tabs";
import styled from "styled-components";

import { followFile, removeFile, selectFile, setScroll, updateFile } from "renderer/actions/watchlist";
import IPCManager from "renderer/utils/ipcManager";

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;

const Button = styled.button`
    background-color: #C0C0C0;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    color: #FFFFFF;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
        text-decoration: underline;
    }
`;

const ButtonTray = styled.div`
    display: flex;
    height: 2.5rem;
    justify-content: space-between;
`;

const Label = styled.label`
    align-self: center;
    display: inline-block;
`;

const Text = styled.textarea`
    border: none;
    color: transparent;
    height: calc(100% - 2.5rem);
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
        followFile: (id, scrollTop) => dispatch(followFile(id, scrollTop)),
        removeFile: (id) => dispatch(removeFile(id)),
        updateFile: (file) => dispatch(updateFile(file)),
        selectFile: (index) => dispatch(selectFile(index)),
        setScroll: (id, scrollTop) => dispatch(setScroll(id, scrollTop))
    }))
export default class LogView extends React.Component {
    selectedFile = React.createRef();

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
        const scrollTop = this.getScrollTop();
        this.props.followFile(id, scrollTop);
    };

    onClickIcon = (evt, id) => {
        evt.stopPropagation();
        this.props.removeFile(id);
    };

    onClickTab = (index) => {
        const { allFiles, selectedFile } = this.props.watchlist;
        const scrollTop = this.getScrollTop();

        this.props.setScroll(allFiles[selectedFile], scrollTop);
        this.props.selectFile(index);
    };

    onClickOpenFile = (id) => {
        IPCManager.openFileInExplorer(id);
    };

    render() {
        const { watchlist } = this.props;
        const { allFiles, selectedFile } = watchlist;
        return (
            <Container>
                {allFiles.length > 0 &&
                <Tabs activeTabIndex={selectedFile}>
                    {allFiles.map(this.renderFiles)}
                </Tabs>
                }
            </Container>
        );
    };

    renderFiles = (id, index) => {
        const { watchlist: { selectedFile } } = this.props;
        const active = (selectedFile === index);
        const { content, follow, name, path } = this.getFile(id);

        return <Tab key={id}
                    heading={name}
                    onClickTab={() => this.onClickTab(index)}
                    onClickIcon={(evt) => this.onClickIcon(evt, id)}
                    tabIndex={index}
                    title={path}>
            <Text value={content}
                  ref={active ? this.selectedFile : null}
                  readOnly/>
            <ButtonTray>
                <Label>
                    Follow
                    <input type="checkbox"
                           onChange={() => this.onChangeFollowFile(id)}
                           checked={follow}/>
                </Label>
                <Button onClick={() => this.onClickOpenFile(id)}>
                    Open in Explorer
                </Button>
            </ButtonTray>

        </Tab>
    }
}
