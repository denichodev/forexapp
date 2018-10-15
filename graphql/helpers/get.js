import URL from 'url';

import formatGetUrl from './formatGetUrl';
import safeRequest from './safeRequest';

const get = (url, queries, additionalOptions = {}) => {
  const endpoint = formatGetUrl(URL.parse(url), queries);
  const opts = {
    method: 'GET',
    timeout: 2000,
    ...additionalOptions
  };

  return safeRequest(endpoint, opts);
};

export default get;
