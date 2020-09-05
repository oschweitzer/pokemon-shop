import styled from 'styled-components';

const CancelButton = styled.button`
  width: 30%;
  border: none;
  background-color: #bd3736;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  padding: 5px;

  &:hover {
    box-shadow: 2px 2px 2px #aaa;
    background-color: #fe5f55;
  }
`;

export default CancelButton;
