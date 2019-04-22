import React, { Component } from "react";
import { number } from "prop-types";
import { Tab } from "components/tabs";
import { Container, TabsList, TabBody } from "components/tabs/style";

export default class Tabs extends Component {

    static propTypes = {
        activeTabIndex: number.isRequired
    };

    render() {
        return (
            <Container>
                <TabsList>
                    {this.renderChildren()}
                </TabsList>
                <TabBody>
                    {this.renderActiveTab()}
                </TabBody>
            </Container>
        );
    }

    renderChildren() {
        return this.props.children.map((child, index) => {
            const { props } = child;
            return <Tab {...props}
                        key={child.key}
                        isActive={index === this.props.activeTabIndex}>
            </Tab>
        });
    }

    renderActiveTab() {
        const { activeTabIndex, children } = this.props;
        if (children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }
};