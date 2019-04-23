import { createGlobalStyle } from "styled-components";
import RobotoFont from "fonts/Roboto/Roboto-Regular.ttf";

export default createGlobalStyle`
    html, body, #app {
        background-image: linear-gradient(to bottom, #A9A9A9, #C0C0C0);
        color: white;
        font-family: Roboto, sans-serif;
        height: 100%;
        margin: 0;
        width: 100%;
    }
    
    @font-face {
        font-family: "Roboto";
        src: url(${RobotoFont}) format("truetype");
    }
    
    * {
        box-sizing: border-box;
    }
`;
