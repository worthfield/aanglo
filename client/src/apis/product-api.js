import axios from "axios";
import queryString from "query-string";
const apiUrl = "https://aanglo.onrender.com";
const create = async (params, credentials, product) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/products/by/${params.shopId}`,
      product,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
const listByShop = async (params) => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/by/${params.shopId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listLatest = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/latest`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listRelated = async (params) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/products/related/${params.productId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const read = async (params) => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/${params.productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const list = async (params) => {
  try {
    const query = queryString.stringify(params);
    const response = await axios.get(`${apiUrl}/api/products?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listCategories = async () => {
  try {
    let response = await axios.get(`${apiUrl}/api/products/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const allProducts = async () => {
  try {
    let response = await axios.get(`${apiUrl}/api/allproducts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  create,
  listByShop,
  listLatest,
  listRelated,
  read,
  list,
  listCategories,
  allProducts,
};
