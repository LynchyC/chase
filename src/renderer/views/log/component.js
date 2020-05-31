import { ipcRenderer } from "electron";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { array, func, number, shape } from "prop-types";

import { Tab, Tabs } from "../../components/tabs";
import IpcManager from "../../ipc-manager";
import { Button, ButtonTray, Container, Label, Text } from "./style";

const Component = ({ files, follow, remove, select, selected, setPosition, update }) => {

    const { push } = useHistory();
    const tab = useRef();

    useEffect(() => {
        const handleFileChange = (event, content) => update(content);
        ipcRenderer.on("log:changed", handleFileChange);
        return () => {
            ipcRenderer.removeListener("log:changed", handleFileChange);
        }
    }, []);

    useEffect(() => {
        if (!files.length) {
            push("/");
        } else {
            const { follow, scrollTop } = files[selected] ?? {};
            setScroll(follow ? scrollTop : null);
        }
    }, [files, selected, files[selected]?.content]);

    const getScroll = () => {
        const { scrollHeight, scrollTop } = tab.current;
        return { scrollHeight, scrollTop };
    };

    const setScroll = (initial = null) => {
        const { follow } = files[selected];
        const { scrollHeight, scrollTop } = getScroll();
        tab.current.scrollTop = follow ? scrollHeight : (initial ?? scrollTop);
    };

    const onChangeFollow = (id) => {
        return () => {
            const { scrollHeight } = getScroll();
            follow(id, scrollHeight);
        };
    };

    const onClickIcon = (path) => {
        return (event) => {
            event.stopPropagation();
            remove(path);
        };
    };

    const onClickOpen = (id) => {
        return () => IpcManager.openFileInExplorer(id);
    };

    const onClickTab = (index) => {
        return () => {
            const { id, follow } = files[selected];
            if (!follow) {
                const { scrollTop } = getScroll();
                setPosition(id, scrollTop);
            }
            select(index);
        };
    };

    const renderFile = ({ content, follow, id, name, path }, index) => {
        const active = (selected === index);
        return <Tab
            key={id}
            heading={name}
            onClickTab={onClickTab(index)}
            onClickIcon={onClickIcon(path)}
            title={path}
        >
            <Text
                element="textarea"
                value={content}
                ref={active ? tab : null}
                readOnly />
            <ButtonTray>
                <Label>
                    Follow
                    <input
                        type="checkbox"
                        onChange={onChangeFollow(id)}
                        checked={follow} />
                </Label>
                <Button onClick={onClickOpen(id)}>
                    Open in Explorer
                </Button>
            </ButtonTray>
        </Tab>
    };

    return <Container>
        {!!files.length && <Tabs selected={selected}>
            {files.map(renderFile)}
        </Tabs>}
    </Container>;

};

Component.propTypes = {
    files: array.isRequired,
    follow: func.isRequired,
    remove: func.isRequired,
    selected: number.isRequired,
    select: func.isRequired,
    setPosition: func.isRequired,
    update: func.isRequired
};

export default Component;
