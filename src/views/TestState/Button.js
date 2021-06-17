import styled from "styled-components";

const Button = styled.button`
  background-color: ${props => props.color || "dodgerblue"};
  border: none;
  margin-left: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

export default Button;