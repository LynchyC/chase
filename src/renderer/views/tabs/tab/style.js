import styled, { css } from "styled-components";
import Close from "./close";

export const Icon = styled(Close)`
    border: 0;
    display: inline-block;
    
    ${({ isActive }) => !isActive && css`
        display: none;                
    `}
`;

export const Item = styled.li`
    background-color: transparent;
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    cursor: pointer;
    display: inline-block;
    flex: 0 0 auto;
    height: 100%;
    margin-right: 0.1rem;
    padding: 0.4rem 0.4rem 0.2rem 0.4rem;
    position: relative;
    width: 7rem;
    
    ${({ isActive }) => isActive && css`
        background-color: rgba(128,128,128, 0.2);    
        border-top: 1px solid #808080;
        border-right: 1px solid #808080;
        border-left: 1px solid #808080;
        border-bottom: 1px solid #A9A9A9;
    `}
    
    &:hover ${Icon} {
        display: inline-block;
    }
`;

export const Button = styled.button`
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    line-height: 1.7rem;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0.4rem;
`;

export const Heading = styled.p`
    display: inline-block;
    left: 0.4rem;
    line-height: 1.6rem;
    margin: 0 0.01rem 0 0;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 4rem;
`;
