import styled from 'react-emotion';

import { border, muteBlack } from '../../colors';

export const RateCardWrapper = styled('div')`
  display: flex;
  padding: 4px;
  flex-direction: column;
  margin: 16px 0 0 0;
  border-top: 1px solid ${border};
  box-shadow: 0 2px 8px 0 ${border};
  padding: 16px;
`;

export const RateCardFirstRow = styled('div')`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const BigCode = styled('div')`
  font-weight: 600;
`;

export const RateSubText = styled('div')`
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  color: ${muteBlack};
`;

export const DeleteButton = styled('div')`
  color: red;
  text-align: right;
  flex-basis: 20%;
`
