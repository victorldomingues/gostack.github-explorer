import { createGlobalStyle } from "styled-components";
import githubSVG from '../assets/github.svg'
export default createGlobalStyle`
 *{
     margin: 0;
     padding: 0;
     outline: 0;
     box-sizing: border-box;
 }
 body , input,  button {
     background: #F0F0F5 url(${githubSVG})  no-repeat 70% top;
     -webkit-font-smoothing: antialiased;
     font-family: 'Roboto', sans-serif;
 }
 #root {
     max-width: 960px;
     margin: 0 auto;
     padding: 40px 20px;
 }
 button {
     cursor: pointer;
 }
`;