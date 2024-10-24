import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/homePages';
import CategoryPage from './pages/categoryPages';
import CategoryDetailPage from './pages/categoryDetailPages';
import MealDetailPage from './pages/mealDetailPages';
import { SearchProvider } from './context/SearchContext';
import Loading from './components/atom/Loading'; // Pastikan path ini sesuai

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Navbar />
        <MainRoutes />
      </Router>
    </SearchProvider>
  );
};

const MainRoutes = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulasi loading selama 1 detik
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={
            <>
              <HomePage />
              <CategoryPage />
            </>
          } />
          <Route path="/category/:categoryName" element={<CategoryDetailPage />} />
          <Route path="/meal/:mealId" element={<MealDetailPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
