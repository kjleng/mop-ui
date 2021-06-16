const env = () => {
  const envName = process.env.REACT_APP_ENV;

  if (envName === 'dev') {
    return {
      API_HOST: 'https://7dtzxm9tg6.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
    };
  } else if (envName === 'prod') {
    return {
      API_HOST: 'https://api.merchant-onboarding.fairstone.ca/api/v1/',
    };
  } else if (envName === 'qa') {
    return {
      API_HOST: 'https://pmrvznssl8.execute-api.us-east-1.amazonaws.com/qa/api/v1/',
    };
  } else {
    return {
      API_HOST: 'https://7dtzxm9tg6.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
    };
  }
};

export const config = env;
