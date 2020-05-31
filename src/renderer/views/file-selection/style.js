import styled from "styled-components";

import View from "../../components/view";
import BaseDropzone from "../dropzone";

export const Container = styled(View)`
    flex-grow: 1;
    height: 100%;
    justify-content: center;
    padding: 25px;
`;

export const Dropzone = styled(BaseDropzone)`
    align-items: center;
    border: 6px dashed white;
    border-radius: 5px;
    cursor: pointer;
    justify-content: center;
    outline: none;
    user-select: none;
`;

export const Text = styled(View)`
    text-align: center;
    font-size: 30px;
`;
