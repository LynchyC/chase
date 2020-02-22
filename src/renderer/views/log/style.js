import styled from "styled-components";

import View from "../../components/view";

export const Container = styled(View)`
    flex-grow: 1;
    height: 100%;
    padding: 1%;
`;

export const Button = styled(View)`
    align-items: center;
    background-color: #C0C0C0;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    color: #FFFFFF;
    cursor: pointer;
    justify-content: center;
    padding: 5px;
    &:hover {
        text-decoration: underline;
    }
`;

export const ButtonTray = styled(View)`
    align-items: center;
    flex-direction: row;
    height: 40px;
    justify-content: space-between;
    margin-top: 2px;
`;

export const Label = styled(View)`
    flex-direction: row;
`;

export const Text = styled(View)`
    border: none;
    color: transparent;
    flex-grow: 1;
    resize: none;
    text-shadow: 0 0 0 black;
    width: 100%;
    &:focus {
        outline: none;
    }
`;
