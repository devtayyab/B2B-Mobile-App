const cacheKeys = { CartCacheKey: "MyCart", ChatBackground: "ChatBackground" };

const settings = {
  dev: {
    // apiUrl: "http://localhost:9000/api",
    // apiUrl: "http://192.168.0.113:9000/api",
    apiUrl: "https://b2bserver.herokuapp.com/api",
    ...cacheKeys,
  },
  production: {
    apiUrl: "https://b2bserver.herokuapp.com/api",
    ...cacheKeys,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  return settings.production;
};

export default getCurrentSettings();
