import api from '../services/api.js';

export const getProducts = async () => {
  const response = await api.get('/product');
  console.log(response.data.products);
  return response.data.products;
};

export const getProductById = async (productId) => {
  const response = await api.get(`/product/${productId}`);
  return response.data.product;
};


// Product upload
const uploadProduct = async (data) => {
  // console.log("📦 Uploading product:", data); // <- debug line
  const response = await api.post("/product", data);
  return response.data;
};

export default uploadProduct;
