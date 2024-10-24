import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/category');
  };

  return (
    <div>
      <div
        className="bg-cover bg-center h-64 text-white p-4"
        style={{ backgroundImage: 'url(/path-to-image.jpg)' }}
      >
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-6xl mb-2"
          >
          🍗🥩
          </motion.div>
          
          <motion.h1
            className="text-5xl text-primary font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Explore Delicious Meals
          </motion.h1>

          <motion.button
            className="text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleExploreClick}
          >
            Explore Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
