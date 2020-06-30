import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 50px;
    color:#3A3A3A;
    margin-top:80px;
    max-width: 460px;
`;

export const Form = styled.form<FormProps>`
    margin-top:40px;
    max-width: 700px;
    display:flex;

    input {
        flex: 1;
        height: 70px;
        border:0px;
        padding: 0 24px;
        border-radius: 5px 0 0 5px;
        background: #FFF;
        color: #3A3A3A;
        border: 2px solid #fff;
        ${(props) => props.hasError && css`
            border: 2px solid #c53030;
        `}
        &::placeholder{
            color:#a8a8b3;
        }
    }

    button {
        width: 210px ;
        height: 70px;
        border-radius:0 5px 5px 0;
        background: #04D361;
        border:0px;
        color: #fff;
        font-weight: bold;
        transition: background-color 0.2s;
        &:hover{
            background: ${shade(0.2, '#04D361')};
        }
    }
`;


export const Repositories = styled.div`
    max-width: 700px;
    margin-top: 16px;
    &:first-of-type{
        margin-top: 80px;
    }
    a {

        background: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: flex;
        text-decoration: none;
        aligin-items: center;
        transition: transform 0.2s;
  
   
        &:hover{
            transform: translateX(10px);
        }
   
        img{
            width: 64px;
            height: 64px;
            border-radius: 50%;
        }
        div{
            margin: 0 16px;
            margin-top: auto;
            margin-bottom: auto;
            flex: 1;
            strong{
                font-size: 20px;
                color: #3D3D4D;
            }
            p{
                font-size: 18px;
                color: #A8A8B3;
                margin-top:4px;
            }
        }
        svg{
            margin-left: auto;
            margin-top: auto;
            margin-bottom: auto;
            color: #A8A8B3;
        }
    }
`;

export const Error = styled.span`
    display: block;
    color: #c53030;
    margin-top: 8px;
`;