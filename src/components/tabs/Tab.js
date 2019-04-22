import React from "react";
import { bool, func, number, string } from "prop-types";
import CloseIcon from "images/close.png";

import { Button, Heading, Icon, Item } from "components/tabs/style";

const Tab = (props) => {
    const { heading, isActive, onClickTab, onClickIcon, tabIndex, title } = props;
    return <Item isActive={isActive}
                 onClick={(evt) => onClickTab(evt, tabIndex)}
                 title={title}>
        <Heading>{heading}</Heading>
        <Button onClick={() => onClickIcon(tabIndex)}>
            <Icon src={CloseIcon}
                  alt="Close Tab"
                  isActive={isActive}
                  onClick={onClickIcon}/>
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
    tabIndex: number.isRequired,
    title: string.isRequired
};

export default Tab;
