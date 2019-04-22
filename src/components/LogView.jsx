import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Tabs from "components/tabs/Tabs";
import Tab from "components/tabs/Tab";
import styled from "styled-components";

import { followFile, removeFile, selectFile, updateFile } from "actions/watchlist";

const Container = styled.div`
    height: 100vh;
    width: 100%;
`;

const ButtonTray = styled.div`
    height: 1.5rem;
`;

const Text = styled.textarea`
    border: none;
    color: transparent;
    height: calc(100% - 1.5rem);
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
        selectFile: (index, scrollTop) => dispatch(selectFile(index, scrollTop))
    }))
export default class LogView extends React.Component {
    selectedFile = React.createRef();

    componentDidMount() {
        ipcRenderer.on("log:changed", this.handleFileListener);
        if (this.props.watchlist.allFiles.length) {
            this.setScroll();
        }
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
        const scrollTop = this.getScrollTop();
        this.props.selectFile(index, scrollTop);
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
                <label>Follow</label>
                <input type="checkbox"
                       onChange={() => this.onChangeFollowFile(id)}
                       checked={follow}/>
            </ButtonTray>

        </Tab>
    }
}
