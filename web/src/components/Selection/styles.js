import styled from 'react-emotion';

import { border, blue } from '../../colors';

export const SelectionWrapper = styled('div')`
  display: flex;
  padding: 4px;
  margin: 16px 0 0 0;
  justify-content: space-between;
  border-top: 1px solid ${border};
  box-shadow: 0 2px 8px 0 ${border};
  padding: 16px;
`;

export const Select = styled('select')`
  border-bottom: 1px solid ${border};
  margin-left: 10px;
`

export const Button = styled('div')`
  color: ${blue};
  flex-basis: 20%;
`
