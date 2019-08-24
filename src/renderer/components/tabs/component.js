import React, { Component } from "react";
import { arrayOf, func, number, oneOf, oneOfType, shape, string } from "prop-types";

import Tab from "./tab/index";
import { Container, TabsList, TabBody } from "renderer/components/tabs/style";

const child = shape({
    type: oneOf(([Tab])).isRequired,
    props: shape({
        heading: string.isRequired,
        onClickTab: func.isRequired,
        onClickIcon: func.isRequired,
        tabIndex: number.isRequired,
        title: string.isRequired
    }).isRequired
});

export default class Tabs extends Component {

    static propTypes = {
        activeTabIndex: number.isRequired,
        children: oneOfType([
            child,
            arrayOf(child)
        ]).isRequired
    };

    renderTabs() {
        return this.props.children.map(this.renderTab.bind(this));
    }

    renderTab({ key, props }, index) {
        return <Tab {...props}
                    key={key}
                    isActive={index === this.props.activeTabIndex}
        />
    }

    renderActiveTab() {
        const { activeTabIndex, children } = this.props;
        if (children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

    render() {
        return <Container>
            <TabsList>
                {this.renderTabs()}
            </TabsList>
            <TabBody>
                {this.renderActiveTab()}
            </TabBody>
        </Container>
    }
};
