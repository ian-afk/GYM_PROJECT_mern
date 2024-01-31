import { useEffect, useState } from 'react';

export function useAPIList(path) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${import.meta.env.VITE_API_URL}/${path}`;

  useEffect(() => {
    async function getAllData() {
      try {
        const request = {
          method: 'GET',
          header: {
            'Content-Type': 'application/json',
          },
        };
        setIsLoading(true);
        const res = await fetch(url, request);
        const json = await res.json();

        setData(json.employees);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getAllData();
  }, []);
  return { data, setData, isLoading, url };
}
