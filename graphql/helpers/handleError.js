export default function handleError(scope, errorMessage, defaultResponse) {
  return (error) => {
    if (defaultResponse) {
      return defaultResponse;
    }

    throw error;
  };
}
