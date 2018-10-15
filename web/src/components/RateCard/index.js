import React, { PureComponent } from 'react';
import { string, number, func } from 'prop-types';

import {
  RateCardWrapper,
  RateSubText,
  BigCode,
  RateCardFirstRow,
  DeleteButton
} from './styles';

const calculate = (baseValue, multiplier) => {
  const parsedBaseVal = parseFloat(baseValue);
  const calculatedValue = parsedBaseVal * multiplier.toFixed(1);

  return calculatedValue;
};

class RateCard extends PureComponent {
  handleDelete = () => {
    const { code, onDelete } = this.props;

    onDelete(code);
  }

  render() {
    const { code, baseValue, multiplier } = this.props;

    return (
      <RateCardWrapper>
        <RateCardFirstRow>
          <BigCode>{code}</BigCode>
          {calculate(baseValue, multiplier)}
        </RateCardFirstRow>
        <RateSubText>
          {`1 USD = ${code} ${multiplier.toFixed(2)}`}
          <DeleteButton onClick={this.handleDelete}>Delete</DeleteButton>
        </RateSubText>
      </RateCardWrapper>
    );
  }
}

RateCard.propTypes = {
  baseValue: string.isRequired,
  code: string.isRequired,
  multiplier: number.isRequired,
  onDelete: func
};

RateCard.defaultProps = {
  onDelete: () => {}
};

export default RateCard;
