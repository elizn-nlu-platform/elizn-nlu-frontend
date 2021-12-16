const environment = process.env.NODE_ENV || 'development';
const port = parseInt(process.env.PORT) || 3333;

const config = Object.freeze({
  ENVIRONMENT: environment,
  IS_PRODUCTION: environment === 'production',
  IS_STAGING: environment === 'staging',
  IS_DEVELOPMENT: environment === 'development',
  IS_TEST: environment === 'test',
  PORT: port,
  API_BASE_URL: 'https://52qv289i2g.execute-api.us-east-1.amazonaws.com' // TODO
});

export default config;
