import React from 'react';
import { string, number } from 'prop-types';

import { RateCardWrapper, RateTitle } from './styles';

const calculate = (baseValue, multiplier) => {
  const parsedBaseVal = parseFloat(baseValue);
  const calculatedValue = parsedBaseVal * multiplier.toFixed(1);

  return calculatedValue;
};

const RateCard = ({ code, baseValue, multiplier }) => (
  <RateCardWrapper>
    <RateTitle>
      {code} - {calculate(baseValue, multiplier)}
    </RateTitle>
  </RateCardWrapper>
);

RateCard.propTypes = {
  baseValue: string.isRequired,
  code: string.isRequired,
  multiplier: number.isRequired
};

export default RateCard;
