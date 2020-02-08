import React from "react";

import { bool, func, number, string } from "prop-types";
import { Button, Heading, Icon, Item } from "./style";

const Tab = ({ heading, isActive, onClickTab, onClickIcon, title }) => {
    return <Item
        isActive={isActive}
        onClick={onClickTab}
        title={title}
    >
        <Heading>{heading}</Heading>
        <Button onClick={onClickIcon}>
            <Icon
                isActive={isActive}
                onClick={onClickIcon}
            />
        </Button>
    </Item>
};

Tab.defaultProps = {
    isActive: false
};

Tab.propTypes = {
    heading: string.isRequired,
    isActive: bool,
    onClickTab: func.isRequired,
    onClickIcon: func.isRequired,
    title: string.isRequired
};

export default Tab;
