import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Generate visible page numbers (1, 2, ..., 9, 10)
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    } else if (
      (i === currentPage - 2 || i === currentPage + 2) && 
      !pageNumbers.includes('...')
    ) {
      pageNumbers.push('...');
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="container mx-auto mt-6 mb-4"> {/* Container for centering */}
      <div className="flex justify-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          <FaChevronLeft />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            onClick={() => typeof number === 'number' && onPageChange(number)}
            className={`px-4 py-2 rounded-md border transition-colors ${
              number === currentPage
                ? 'border-purple-500 text-purple-500 font-bold'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
            disabled={number === '...'}
          >
            {number}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-white border border-gray-300 hover:bg-gray-100'
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
