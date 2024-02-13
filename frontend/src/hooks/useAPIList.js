import { useEffect, useState } from 'react';
import RequestOptions from '../utils/requestClass';

export function useAPIList(path, token = '') {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${import.meta.env.VITE_API_URL}/${path}`;

  useEffect(() => {
    async function getAllData() {
      try {
        const request = new RequestOptions('GET', token);
        setIsLoading(true);
        const res = await fetch(url, request.options);
        const json = await res.json();
        console.log('hello im still in the');
        console.log(json);
        setData(json[path]);
        setIsLoading(false);
      } catch (error) {
        console.log('hello');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getAllData();
  }, [path, token, url]);
  return { data, setData, isLoading, url };
}
