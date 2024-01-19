import { MutableRefObject, useEffect } from 'react';

const useDashboardScroll = ({
  listRef,
  setFunction,
  mountedLength,
  length,
}: {
  listRef: MutableRefObject<HTMLOListElement | HTMLUListElement>;
  setFunction: (...args: any[]) => void;
  mountedLength: number;
  length: number;
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const listElement = listRef.current;

      if (
        listElement &&
        listElement.scrollTop +
          listElement.clientHeight +
          listElement.scrollHeight * 0.2 >=
          listElement.scrollHeight
      ) {
        if (mountedLength < length)
          setFunction((prevState: any[]) => [...prevState, null]);
      }
    };
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [length, mountedLength, setFunction, listRef]);
};
export default useDashboardScroll;
