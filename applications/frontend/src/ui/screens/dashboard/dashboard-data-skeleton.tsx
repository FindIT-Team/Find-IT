import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

const DashboardDataSkeleton = ({ children }: { children: React.ReactNode }) => {
  const listRef: MutableRefObject<HTMLOListElement> =
    useRef<HTMLOListElement>(null);

  const [length, setLength] = useState(0);

  useEffect(() => {
    const element = listRef.current;

    if (!element) return;

    const listHeight = element.clientHeight;
    const listChildHeight = 70;

    setLength(Math.floor(listHeight / listChildHeight) + 2);
  }, [listRef]);

  return (
    <ol ref={listRef} className={'overflow-y-hidden'}>
      {[...new Array(length)].map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </ol>
  );
};
export default DashboardDataSkeleton;
