import styled, {css} from "styled-components";

const InputText = styled.input`
  padding: 0.6em;
  background-color: ${props => props.color || "#f7f7f8"};
  width: ${props => props.width || "20em"};
  border: solid 0.7px;
`;

export default InputText;