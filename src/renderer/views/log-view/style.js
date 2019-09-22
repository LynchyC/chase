import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    width: 100%;
`;

export const Button = styled.button`
    background-color: #C0C0C0;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    color: #FFFFFF;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
        text-decoration: underline;
    }
`;

export const ButtonTray = styled.div`
    display: flex;
    height: 2.5rem;
    justify-content: space-between;
`;

export const Label = styled.label`
    align-self: center;
    display: inline-block;
`;

export const Text = styled.textarea`
    border: none;
    color: transparent;
    height: calc(100% - 2.5rem);
    resize: none;
    text-shadow: 0 0 0 black;
    width: 100%;
    
    &:focus {
        outline: none;
    }
`;
