import styled from 'react-emotion';

import { muteBlack, border, blue } from '../../colors';

export const BaseHeroWrapper = styled('div')`
  display: flex;
  padding: 16px;
  flex-direction: column;
  border-bottom: 1px solid border;
  box-shadow: 0 2px 8px 0 ${border};
`;

export const HeroTitle = styled('div')`
  color: ${muteBlack};
  font-style: italic;
`;

export const HeroFormWrapper = styled('div')`
  display: flex;
  padding-top: 16px;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
`;

export const FormInput = styled('input')`
  flex-basis: 20%;
  border: none;
  border-bottom: 1px solid ${border};
  font-size: 16px;
  margin-left: 8px;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${blue};
  }
`;
