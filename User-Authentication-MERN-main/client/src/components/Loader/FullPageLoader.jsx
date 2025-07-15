import React from 'react';
import { LuLoader2 } from 'react-icons/lu';

const FullPageLoader = ({ message = "Fetching answer..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <LuLoader2 className="animate-spin text-4xl text-indigo-600" />
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default FullPageLoader;
