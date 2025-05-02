import React from 'react';
import { BarChart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <BarChart className="h-8 w-8 mr-3" />
        <div>
          <h1 className="text-2xl font-bold">Chart Generator</h1>
          <p className="text-sm text-blue-100">Create beautiful, interactive visualizations</p>
        </div>
      </div>
    </header>
  );
};

export default Header;