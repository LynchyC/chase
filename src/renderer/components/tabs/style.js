import styled from "styled-components";

import View from "../view";

export const Container = styled(View)`
    flex-grow: 1;
`;

export const TabsList = styled(View)`
    border-bottom: 0.016rem solid #808080;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 2.5rem;
    list-style: none;
    margin: 0;
    overflow-x: auto;
    padding: 0;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const TabBody = styled(View)`
    flex-grow: 1;
`;
