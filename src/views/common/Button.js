import styled, {css} from "styled-components";

const Button = styled.button`
  background-color: ${props => props.color || 'rgb(54, 162, 235)'};
  color: white;
  border: none;
  /* border-radius: 4px; */
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  width: 15%;
  height: 40px;

  &:hover {
    color: black
  }
  ${props => props.deleteButton &&
    css`
      background-color: 'rgb(54, 162, 235)';
      color: white;
      &:hover {
        background: #fa5252;
      }
    `
  }
  
  ${props => props.init &&
    css`
      background-color: white;
      color: black;
      border: none;
      /* &:hover {
        color: white;
      }
       */
    `
  }
  ${props => props.init2 &&
    css`
      background-color: #38d9a9;
      color: white;
      border: none;
      
    `
  }

  
`;

export default Button;