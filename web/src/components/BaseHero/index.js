import React from 'react';
import { func, string } from 'prop-types';

import {
  BaseHeroWrapper,
  HeroTitle,
  HeroFormWrapper,
  FormInput
} from './styles';

const BaseHero = ({ onInputChange, value }) => (
  <BaseHeroWrapper>
    <HeroTitle>USD - United States Dollars</HeroTitle>
    <HeroFormWrapper>
      USD
      <FormInput
        type="number"
        step="0.1"
        value={value}
        onChange={onInputChange}
      />
    </HeroFormWrapper>
  </BaseHeroWrapper>
);

BaseHero.propTypes = {
  onInputChange: func,
  value: string
};

BaseHero.defaultProps = {
  onInputChange: () => {},
  value: '10'
};

export default BaseHero;
