import { ipcRenderer } from "electron";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import styled from "styled-components";

import Header from "./Header";
import { removeFile, selectFile, updateFile } from "../actions/watchlist";

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
@connect(({ watchlist }) => ({ watchlist }),
	(dispatch) => ({
		removeFile: (id) => dispatch(removeFile(id)),
		updateFile: (file) => dispatch(updateFile(file)),
		selectFile: (index) => dispatch(selectFile(index))
	}))
export default class LogView extends React.Component {

	componentDidMount() {
		ipcRenderer.on("log:changed", this.handleFileListener);
	}

	componentDidUpdate() {
	    const { history, watchlist } = this.props;
		if (watchlist.files.length === 0) {
			history.push("/");
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

	onSelectTab = (index) => {
		this.props.selectFile(index);
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
		return <TabPanel key={id}><Text value={content} readOnly/></TabPanel>
	};

	render() {
	    const { watchlist } = this.props;
	    const { files, selectedFile } = watchlist;
		return (
			<Container>
				<Header/>
				{files.length > 0 &&
				<Tabs
					selectedIndex={selectedFile}
					onSelect={(index) => this.onSelectTab(index)}
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



