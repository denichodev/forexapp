import { get } from 'lodash';

export default function handleResponse(
  scope,
  defaultResponse,
  { raw = false, returnPath = 'data', validate = true, validator = false } = {}
) {
  return (response) => {
    let validations = [(res) => res.success];

    if (validator && typeof validator === 'function') {
      validations = [validator];
    }

    const isValid = !validate || validations.some((vf) => vf(response));

    if (isValid) {
      return raw ? response : get(response, returnPath, defaultResponse);
    }

    return defaultResponse;
  };
}
