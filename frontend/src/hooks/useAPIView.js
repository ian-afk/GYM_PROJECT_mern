import { useEffect, useState } from 'react';
import RequestOptions from '../utils/requestClass';

export function useAPIView(path, token = '', setIsLoggedIn) {
  const [data, setData] = useState({});
  const [init, setInit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const url = `${import.meta.env.VITE_API_URL}/${path}`;
  const newPath = path.split('/')[0];

  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const request = new RequestOptions('GET', token);
        setIsLoading(true);

        const res = await fetch(url, request.options);
        const json = await res.json();
        console.log(json);
        if (json.status === 'fail') {
          setData([]);
          setInit([]);
          setIsLoading(false);
          setIsLoggedIn(false);
          setMessage(json.message);
        }
        setData(json[newPath]);
        setInit(json[newPath]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
    return function () {
      controller.abort();
    };
  }, [newPath, url, setIsLoggedIn]);

  return { data, setData, isLoading, url, init, setInit, message };
}

export default useAPIView;

/**
 * sample
 * const {setData: setEmployees, data: employees, isLoading, url, setInit: setInit, init: init} = useAPIView(url, { ...keys
 * })
 *
 */
