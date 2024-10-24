import axios from 'axios';

export const fetchCategories = async() => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    return response.data.categories;
};

export const fetchMealsByCategory = async(categoryName) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
    return response.data.meals;
};

export const fetchMealDetail = async(mealId) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    return response.data.meals[0];
};