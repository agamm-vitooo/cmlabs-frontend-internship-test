import React, { useEffect, useState, useContext } from 'react';
import { fetchMealsByCategory } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import Pagination from '../components/molecules/Pagination';
import Breadcrumb from '../components/molecules/Breadcrumb';
import { SearchContext } from '../context/SearchContext';
import { motion } from 'framer-motion';
import Skeleton from '../components/atom/Skeleton'; // Import Skeleton component

const CategoryDetailPage = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { searchQuery } = useContext(SearchContext);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const data = await fetchMealsByCategory(categoryName);
        setMeals(data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    getMeals();
  }, [categoryName]);

  // Filter meals based on search query
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const currentMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="container mx-auto py-8 px-4"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      <Breadcrumb />
      <h1 className="text-2xl mb-4 font-semibold text-gray-800 p-4">
        {categoryName} Meals
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
        ) : currentMeals.length > 0 ? (
          currentMeals.map((meal) => (
            <motion.div
              key={meal.idMeal}
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="relative rounded-md overflow-hidden cursor-pointer transition-transform"
            >
              <Link to={`/meal/${meal.idMeal}`}>
                <motion.img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <h2 className="text-xl font-semibold text-white">
                    {meal.strMeal}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full">No meals found.</p>
        )}
      </motion.div>

      {/* Pagination Component */}
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </motion.div>
  );
};

export default CategoryDetailPage;
