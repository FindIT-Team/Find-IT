import { MutableRefObject, useEffect } from 'react';
import useGetData from '@/lib/hooks-contexts/use-get-data.hook';

function useDashboardLength({
  type,
  listRef,
  setFunction,
}: {
  type: string;
  listRef: MutableRefObject<HTMLOListElement | HTMLUListElement>;
  setFunction: (...args: any[]) => void;
}) {
  const data = useGetData(`/api/dashboard/${type}?skip=${0}&take=${1}`);
  const length = data ? data[1] : 0;

  useEffect(() => {
    const setListLength = () => {
      const listElement = listRef.current;

      if (!listElement) return;

      const listHeight = listElement.clientHeight;
      const listChildHeight = 70;
      setFunction(
        Array(
          length > listHeight / listChildHeight
            ? Math.floor(listHeight / listChildHeight) + 5
            : length,
        ).fill(null),
      );
    };

    setListLength();
  }, [length, listRef, setFunction]);

  return length;
}

export default useDashboardLength;
