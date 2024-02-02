import { useEffect, useState } from 'react';
import RequestOptions from '../utils/requestClass';

export function useAPIList(path) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${import.meta.env.VITE_API_URL}/${path}`;

  useEffect(() => {
    async function getAllData() {
      try {
        const request = new RequestOptions('GET');
        setIsLoading(true);
        const res = await fetch(url, request.options);
        const json = await res.json();

        setData(json[path]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getAllData();
  }, []);
  return { data, setData, isLoading, url };
}
