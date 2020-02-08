import React from "react";
import { arrayOf, func, number, oneOf, oneOfType, shape, string } from "prop-types";

import Tab from "./tab/index";
import { Container, TabsList, TabBody } from "./style";

const child = shape({
    type: oneOf(([Tab])).isRequired,
    props: shape({
        heading: string.isRequired,
        onClickTab: func.isRequired,
        onClickIcon: func.isRequired,
        title: string.isRequired
    }).isRequired
});

// TODO: Add uncontrolled logic
const Tabs = ({ children, selected }) => {

    const renderTab = ({ key, props }, index) => {
        return <Tab {...props}
            key={key}
            isActive={index === selected}
        />;
    };

    const body = children?.[selected];

    return <Container>
        <TabsList>
            {children.map(renderTab)}
        </TabsList>
        <TabBody>
            {body && body.props.children}
        </TabBody>
    </Container>;

}

Tabs.propTypes = {
    children: oneOfType([
        child,
        arrayOf(child)
    ]).isRequired,
    selected: number.isRequired,
};

export default Tabs;
