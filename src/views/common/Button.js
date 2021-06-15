import styled, { css } from "styled-components";

const Button = styled.button`
  background-color: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: rgba(255,255,255,0.9);
  }

  ${props => props.inverted &&
    css`
      background-color: transparent;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `
  }
`;

export default Button;