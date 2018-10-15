import RateAPIType from '../types/RateAPIType';
import getRates from '../models/rates';

// eslint-disable-next-line
export const ratesQuery = {
  type: RateAPIType,
  resolve: getRates,
};
