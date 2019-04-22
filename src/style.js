import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    html, body, #app {
        background-image: linear-gradient(to bottom, #A9A9A9, #C0C0C0);
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        height: 100%;
        margin: 0;
        width: 100%;
    }
    
    * {
        box-sizing: border-box;
    }
`;
