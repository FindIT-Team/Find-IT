import { MutableRefObject, useState } from 'react';
import useDashboardLength from '@/lib/hooks-contexts/dashboard/use-dashboard-length.hook';
import useDashboardScroll from '@/lib/hooks-contexts/dashboard/use-dashboard-scroll.hook';

const useDashboardInit = (
  listRef: MutableRefObject<HTMLOListElement | HTMLUListElement>,
  type: string,
) => {
  const [data, setData] = useState([]);

  const length: number = useDashboardLength({
    type: type,
    setFunction: setData,
    listRef,
  });

  useDashboardScroll({
    mountedLength: data.length,
    setFunction: setData,
    listRef,
    length,
  });

  return data;
};
export default useDashboardInit;
