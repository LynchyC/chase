import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    padding: 0 5%;
    width: 100%;
`;

export const DropzoneHeader = styled.h1`
    text-align: center;
    font-size: 1rem;

    @media screen and (min-height: 480px) and (min-width: 520px) {
        font-size: 2.5rem;
    }
`;

export const Header = styled.div`
    align-items: center;
    display: flex;
    height: 10vh;
    justify-content: center;
    margin-bottom: 1vh;
`;

export const HeaderText = styled.h1`
  margin: 0;
`;

export const StyledDropzone = styled.div`
    align-items: center;
    background-color: ${({ isActive }) => isActive && "#1D2F49"};
    border: 4px dashed white;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    height: 85vh;
    justify-content: center;
    outline: 0;
    user-select: none;

    @media screen and (min-height: 480px) and (min-width: 520px) {
        border: 8px dashed white;
    }
`;
