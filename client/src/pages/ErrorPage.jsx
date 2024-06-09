

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    
      <h1 className="text-4xl font-bold text-center text-red-500 mb-8">Error</h1>
      <p className="text-xl text-gray-700 text-center">
        Oops! Looks like something went wrong.
      </p>
      <a href="/" className="mt-8 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;