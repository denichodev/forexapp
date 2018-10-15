import get from '../helpers/get';
import handleResponse from '../helpers/handleResponse';
import handleError from '../helpers/handleError';

const validator = (response) => response && typeof response === 'object';

export default function getRates() {
  const defaultResponse = [];

  // Base currency is hardcoded to USD
  return get(`https://api.exchangeratesapi.io/latest?base=USD`)
    .then(handleResponse('Get latest rates', defaultResponse, { validator, raw: true }))
    .catch(handleError('Get latest rates'));
}
