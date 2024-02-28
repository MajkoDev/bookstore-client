import { useEffect, useState } from "react";
import { fetchDataFromApi } from "@/lib/api";

export default function useFetchProduct(endpoint) {
  const [data, setData] = useState();

  useEffect(() => {
    makeApiCall();
  }, [endpoint]);

  const makeApiCall = async () => {
    const res = await fetchDataFromApi(endpoint);
    setData(res);
  };

  return { data };
}
