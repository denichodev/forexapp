import fetch from 'isomorphic-fetch';

// Safely make a fetch request
export default (url, options, isRaw = false) => {
  return fetch(url, options)
    .then((response) => {
      if (isRaw) {
        return response;
      }

      let res;

      try {
        res = response.json();
      } catch (error) {
        res = response.text();
      }

      return res;
    })
    .catch((error) => {
      throw error;
    });
};
