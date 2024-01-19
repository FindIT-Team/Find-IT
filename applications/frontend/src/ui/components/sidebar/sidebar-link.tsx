import React from 'react';

const SidebarLink = ({
  children,
  useNow,
  handleClick,
}: {
  children: React.ReactNode;
  useNow: boolean;
  handleClick: (e: any) => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className={
        useNow
          ? 'border shadow transition'
          : 'hover:bg-gray-100 ease-in-out pointer-events-auto'
      }
    >
      {children}
    </button>
  );
};
export default SidebarLink;
