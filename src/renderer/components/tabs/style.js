import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 1%;
`;

export const TabsList = styled.ul`
    border-bottom: 0.016rem solid #808080;
    display: flex;
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

export const TabBody = styled.div`
    height: calc(100% - 2.5rem);
    max-height: 100%;
`;
