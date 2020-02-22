import styled from "styled-components";

import View from "../../view";
import Close from "./close";

export const Icon = styled(Close)`
    border: 0;
    display: ${({ isActive }) => {
        return isActive ? "flex" : "none";
    }};
`;

export const Item = styled(View)`
    align-items: center;
    border-style: solid;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-width: 1px;
    cursor: pointer;
    flex-grow: 0;
    justify-content: center;
    margin-right: 0.1rem;
    user-select: none;
    width: 7rem;
    &:hover ${Icon} {
        display: inline-block;
    }
    ${({ isActive }) => {
        return `
            background-color: ${isActive ? "rgba(128,128,128, 0.2)" : "transparent"};
            border-bottom-color: ${isActive ? "#A9A9A9" : "transparent"};
            border-left-color: ${isActive ? "#808080" : "transparent"};
            border-right-color: ${isActive ? "#808080" : "transparent"};
            border-top-color: ${isActive ? "#808080" : "transparent"};
        `;
    }}
`;

export const Button = styled(View)`
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    line-height: 1.7rem;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0.4rem;
`;

export const Heading = styled(View)`
    left: 0.4rem;
    line-height: 1.6rem;
    margin: 0 0.01rem 0 0;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 4rem;
`;
