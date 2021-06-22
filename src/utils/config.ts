const env = () => {
  const envName = process.env.REACT_APP_ENV;

  if (envName === 'dev') {
    return {
      API_HOST: 'https://7dtzxm9tg6.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
      USER_POOL_ID: 'us-east-1_qcNFqwRK3',
      CLIENT_ID: '3fd783o9v1dq5f26s31p6o065j',
    };
  } else if (envName === 'prod') {
    return {
      API_HOST: 'https://api.merchant-onboarding.fairstone.ca/api/v1/',
      USER_POOL_ID: 'us-east-1_qcNFqwRK3',
      CLIENT_ID: '3fd783o9v1dq5f26s31p6o065j',
    };
  } else if (envName === 'qa') {
    return {
      API_HOST: 'https://pmrvznssl8.execute-api.us-east-1.amazonaws.com/qa/api/v1/',
      USER_POOL_ID: 'us-east-1_rUOGKhHqK',
      CLIENT_ID: '2uqvss3p0rnu6eaqh6a17orkl0',
    };
  } else {
    return {
      API_HOST: 'https://7dtzxm9tg6.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
      USER_POOL_ID: 'us-east-1_qcNFqwRK3',
      CLIENT_ID: '3fd783o9v1dq5f26s31p6o065j',
    };
  }
};

export const config = env;
