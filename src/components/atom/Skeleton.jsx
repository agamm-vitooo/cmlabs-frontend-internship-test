import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className}`}
    >
      <div
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_1.5s_linear_infinite]"
      ></div>
    </div>
  );
};

export default Skeleton;
