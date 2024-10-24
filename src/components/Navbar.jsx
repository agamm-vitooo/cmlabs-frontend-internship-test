// src/components/Navbar.js
import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const Navbar = () => {
  const { setSearchQuery } = useContext(SearchContext);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <nav className="bg-slate-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Gunakan Link untuk navigasi ke Home */}
        <Link to="/" className="text-primary text-xl font-bold">
          Meal Finder
        </Link>
        <input
          type="text"
          placeholder="Search for meals..."
          className="p-2 rounded bg-white"
          onChange={handleSearch}
        />
      </div>
    </nav>
  );
};

export default Navbar;
