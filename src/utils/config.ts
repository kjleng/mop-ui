const env = () => {
  const envName = process.env.REACT_APP_ENV;

  if (envName === 'dev') {
    return {
      API_HOST: 'https://jtuw8zbzec.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
    };
  } else if (envName === 'prod') {
    return {
      API_HOST: 'https://prod.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
    };
  } else if (envName === 'qa') {
    return {
      API_HOST: 'https://97kwiirbbh.execute-api.us-east-1.amazonaws.com/qa/api/v1',
    };
  } else {
    return {
      API_HOST: 'https://jtuw8zbzec.execute-api.us-east-1.amazonaws.com/dev/api/v1/',
    };
  }
};

export const config = env;
