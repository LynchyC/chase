import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    html, body {
        background-image: linear-gradient(to bottom, #19283e, #193d3e);
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
    }
    
    * {
        box-sizing: border-box;
    }
`;