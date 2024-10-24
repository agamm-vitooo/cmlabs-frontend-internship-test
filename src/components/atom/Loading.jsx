const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-loading-dot"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-loading-dot delay-200"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-loading-dot delay-400"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-loading-dot delay-600"></div>
      </div>
    </div>
  );
};

export default Loading;
