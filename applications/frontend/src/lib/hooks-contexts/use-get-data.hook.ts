import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';

const promiseWrapper = (promise: any) => {
  let status = 'pending';
  let result: any;

  const s = promise.then(
    (value: any) => {
      status = 'success';
      result = value;
    },
    (error: any) => {
      status = 'error';
      result = error;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        throw s;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};

const useGetData = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const promise = axiosInstance.get(url).then((response) => response.data);
      setData(promiseWrapper(promise));
    };

    getData().then();
  }, [url]);

  if (typeof data === 'string' && data.includes('error')) throw new Error(data);
  else if (data && 'error' in data) throw new Error(data.error);

  return data;
};
export default useGetData;
