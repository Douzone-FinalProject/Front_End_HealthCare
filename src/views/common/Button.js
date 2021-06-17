import styled, {css} from "styled-components";

const Button = styled.button`
  background-color: ${props => props.color || '#B3BCE3'};
  color: black;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;
  width: 15%;
  height: 40px;

  &:hover {
    background-color: white;
  }
  ${props => props.deleteButton &&
    css`
      background-color: #fa5252;
      color: black;
      &:hover {
        background: white;
      }
    `
  }
  &+button {    
    margin-left: 0.5rem;
  }
`;

export default Button;