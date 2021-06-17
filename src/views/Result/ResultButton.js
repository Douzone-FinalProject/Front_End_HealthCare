import styled from 'styled-components';

const ResultButton = styled.button`
    background-color: #dbe4ff;
    color: black;
    border-radius: 3px;
    border-width: 2px;
    padding: 0.5rem;
    width: 100px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-size: small;
    font-weight: 600;

    &:hover {
        background-color: #bac8ff;
    }
`;

export default ResultButton;