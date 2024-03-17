import { useEffect } from 'react';
import { fetch } from '~/utils/fetch-sid.util';

export function useDashboardScroll({
  areaName,
  ref,
  array,
  setFunction,
}: {
  areaName: string;
  ref: React.RefObject<HTMLDivElement>;
  array: Promise<{ id: string }[]>[];
  setFunction: React.Dispatch<React.SetStateAction<any>>;
}) {
  useEffect(() => {
    const check = async () => {
      const awaitedArray = await array?.[array?.length - 1];
      if (awaitedArray?.length < 10)
        ref.current?.removeEventListener('scroll', handleScroll);
    };

    const update = async () => {
      const last = (ref.current?.lastChild as HTMLDivElement).getAttribute(
        'aria-details',
      );
      if (last === 'skeleton') return;
      const awaitedArray = await array[array.length - 1];
      const offset = awaitedArray[awaitedArray.length - 1]?.id;
      if (offset)
        setFunction((prevState: any[]) => [
          ...prevState,
          fetch(`/dashboard/${areaName}?offset=${offset}`),
        ]);
      else {
        ref.current?.removeEventListener('scroll', handleScroll);
      }
    };

    const handleScroll = () => {
      const listElement = ref.current;

      if (
        listElement &&
        listElement.scrollTop +
          listElement.clientHeight +
          listElement.scrollHeight * 0.2 >=
          listElement.scrollHeight
      )
        update();
    };

    check();

    const listElement = ref.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref, array]);
}
