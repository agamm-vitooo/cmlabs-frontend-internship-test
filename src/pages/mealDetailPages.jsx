import React, { useEffect, useState } from 'react';
import { fetchMealDetail } from '../services/api';
import { useParams } from 'react-router-dom';
import Skeleton from '../components/atom/Skeleton'; // Import Skeleton component

const MealDetailPage = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const getMealDetail = async () => {
      try {
        const data = await fetchMealDetail(mealId);
        setMeal(data);
      } catch (error) {
        console.error('Error fetching meal detail:', error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };
    getMealDetail();
  }, [mealId]);

  // Render Skeleton when loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="h-80 w-80 rounded-md" />
      </div>
    );
  }

  // Render meal details when data is available
  if (!meal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-500">Meal not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 py-12 px-4 md:px-8 lg:px-16">
      {/* Grid layout, adjust for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Image Section */}
        <div className="col-span-1 md:col-span-3">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-auto object-cover rounded-md"
            style={{ maxHeight: '400px', maxWidth: '100%' }}
          />
        </div>

        {/* Details Section */}
        <div className="col-span-1 md:col-span-2 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {meal.strMeal}
          </h1>
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Area:</strong> {meal.strArea}
          </p>

          <div className="my-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Instructions
            </h2>
            <p className="text-gray-700 leading-relaxed">{meal.strInstructions}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {Object.keys(meal)
                .filter((key) => key.startsWith('strIngredient') && meal[key])
                .map((key) => (
                  <li key={key}>
                    {meal[key]} - {meal[`strMeasure${key.slice(13)}`]}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Video Tutorial Section */}
        {meal.strYoutube && (
          <div className="col-span-1 md:col-span-5 flex justify-center mt-6">
            <div className="w-full max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                Video Tutorial
              </h2>
              <div className="relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetailPage;
