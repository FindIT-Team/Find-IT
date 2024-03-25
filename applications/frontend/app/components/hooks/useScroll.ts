import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { fetch } from '~/.client/fetch';

export function useScroll({
  url,
  ref,
  array,
  setFunction,
  take = 10,
}: {
  url: string;
  ref: React.RefObject<HTMLDivElement>;
  array: Promise<{ id: string }[]>[];
  setFunction: Dispatch<SetStateAction<Promise<unknown[]>[]>>;
  take?: number;
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
        setFunction((prevState: Promise<unknown>[]) => [
          ...prevState,
          fetch(`${url}?offset=${offset}&take=${take}`),
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
        update().then();
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
