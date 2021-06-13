
const env = (envName: string = '') => {
    if (envName === 'dev') {
        return {
            API_HOST: "https://jtuw8zbzec.execute-api.us-east-1.amazonaws.com/dev/api/v1/"
        }
    }
    else if (envName === 'prod') {
        return {
            API_HOST: "https://jtuw8zbzec.execute-api.us-east-1.amazonaws.com/dev/api/v1/"
        }
    }
    else if (envName === 'qa') {
        return {
            API_HOST: "https://jtuw8zbzec.execute-api.us-east-1.amazonaws.com/dev/api/v1/"
        }
    }
    else {
        return {
            API_HOST: "https://jtuw8zbzec.execute-api.us-east-1.amazonaws.com/dev/api/v1/"
        }
    };
    
}

export const config = env;