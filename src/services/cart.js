import api from '../services/api.js';


//create an cart along when user is registered
export const createCart = async () => {
    const response = await api.post("/cart");
    return response.data;
}

//get User cart for cart page
export const getCart = async (userId) => {
    try {
      const response = await api.get(`/cart/populated/${userId}`); // Assuming your base API URL is /api
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error; // Re-throw the error for the component to catch
    }
  };


//to Update a cart
export const updateCart = async () => {
    const response = await api.patch("/cart/:userId");
    return response.data;
}

