import styled from 'styled-components';

const ValidationButton = styled.button`
  width: 30%;
  border: none;
  background-color: #56cbf9;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  padding: 5px;
  text-align: center;

  &:hover {
    box-shadow: 2px 2px 2px #aaa;
    background-color: #00af54;
  }
`;

export default ValidationButton;
