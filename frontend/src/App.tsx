import React from "react";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center">Hello, Tailwind CSS!</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </div>
  );
};

export default App;
