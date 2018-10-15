import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import BaseHero from '../../components/BaseHero';
import RateCard from '../../components/RateCard';
import Selection from '../../components/Selection';
import RatesQuery from './rates.graphql';

const DEFAULT_CURRENCY = ['IDR', 'KRW', 'JPY'];

class Forex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseValue: '10',
      activeCurrencies: DEFAULT_CURRENCY
    };
  }

  get ratesArray() {
    // memoization
    if (this.memoizedRatesArray) {
      return this.memoizedRatesArray;
    }

    const { data } = this.props;
    const rates = get(data, 'rates.rates');

    const ratesArray = Object.keys(rates)
      .filter((key) => key !== '__typename')
      .map((key) => ({
        code: key,
        value: rates[key]
      }));

    this.memoizedRatesArray = ratesArray;

    return this.memoizedRatesArray;
  }

  handleBaseValueChange = ({ target }) => {
    this.setState({ baseValue: target.value });
  };

  handleAddCurrency = (code) => {
    const { activeCurrencies } = this.state;

    if (activeCurrencies.includes(code)) {
      return;
    }

    this.setState((prevState) => ({
      activeCurrencies: prevState.activeCurrencies.concat(code)
    }));
  };

  render() {
    const { loading, data } = this.props;
    const { baseValue, activeCurrencies } = this.state;

    if (loading) {
      return 'Loading...';
    }

    console.log('data', data);

    return (
      <Fragment>
        <BaseHero
          value={baseValue}
          onInputChange={this.handleBaseValueChange}
        />
        {activeCurrencies.map((currencyCode, index) => {
          const rate = get(data, `rates.rates.${currencyCode}`) || null;

          if (!rate) {
            return null;
          }

          return (
            <RateCard
              key={currencyCode}
              code={currencyCode}
              multiplier={rate}
              baseValue={baseValue}
            />
          );
        })}
        <Selection
          options={this.ratesArray}
          onSubmit={this.handleAddCurrency}
        />
      </Fragment>
    );
  }
}

export default () => (
  <Query query={RatesQuery}>{(data) => <Forex {...data} />}</Query>
);
