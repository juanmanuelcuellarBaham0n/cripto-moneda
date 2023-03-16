import { useEffect, useState } from "react";
import axios from "axios";

export type TApiResponse = {
  data: any;
  error: any;
  loading: Boolean;
};

export const useFetch = (url: string): TApiResponse => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAPIData();
  }, [url]);

  return { data, error, loading };
};
