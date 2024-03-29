import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import setting from "../config/settings";

const apiClient = create({
  // baseURL: "http://localhost:9000/api",
  // baseURL: "http://192.168.18.223:9000/api",
  baseURL: "https://b2bserver.herokuapp.com/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
