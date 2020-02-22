import styled from "styled-components";

import View from "../../components/view";

export const Area = styled(View)`
    align-items: center;
    border: 6px dashed white;
    border-radius: 5px;
    cursor: pointer;
    flex-grow: 1;
    justify-content: center;
    outline: none;
    user-select: none;
`;

export const Container = styled(View)`
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    padding: 5%;
`;

export const Text = styled(View)`
    text-align: center;
    font-size: 30px;
`;
