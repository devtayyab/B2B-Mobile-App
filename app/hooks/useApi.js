import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    console.log("request");
    const response = await apiFunc(...args);
    console.log(response);
    setLoading(false);

    setError(!response.ok);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request, setData };
};
