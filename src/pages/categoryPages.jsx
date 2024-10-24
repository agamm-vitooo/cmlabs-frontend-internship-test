import React, { useEffect, useState, useContext } from 'react';
import { fetchCategories } from '../services/api';
import { Link } from 'react-router-dom';
import { SearchContext } from '../context/SearchContext';
import { motion } from 'framer-motion';
import Pagination from '../components/molecules/Pagination'; // Import Pagination component
import Skeleton from '../components/atom/Skeleton'; // Import Skeleton component

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const { searchQuery } = useContext(SearchContext);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust the number of items per page as needed

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    getCategories();
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Staggering child elements for sequential appearance
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const pageTransition = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      className="container mx-auto py-10 px-6"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      <h1 className="text-3xl font-light text-center mb-8 mt-4 text-gray-700">
        Categories
      </h1>

      {/* Grid Container with Animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          // Display Skeletons when loading
          Array.from({ length: itemsPerPage }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-md" />
          ))
        ) : currentCategories.length > 0 ? (
          currentCategories.map((category) => (
            <motion.div
              key={category.idCategory}
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="relative rounded-md overflow-hidden cursor-pointer shadow-sm"
            >
              <Link to={`/category/${category.strCategory}`}>
                <motion.img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="w-full h-40 object-cover"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <h2 className="text-xl font-semibold text-white">
                    {category.strCategory}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full">No categories found.</p>
        )}
      </motion.div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
};

export default CategoryPage;
