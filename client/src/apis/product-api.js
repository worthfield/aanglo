import axios from "axios";
import queryString from "query-string";
const create = async (params, credentials, product) => {
  try {
    const response = await axios.post(
      "/api/products/by/" + params.shopId,
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
    const response = await axios.get("/api/products/by/" + params.shopId);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listLatest = async () => {
  try {
    const response = await axios.get("/api/products/latest");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listRelated = async (params) => {
  try {
    const response = await axios.get(
      "/api/products/related/" + params.productId
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const read = async (params) => {
  try {
    const response = await axios.get(`/api/products/${params.productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const list = async (params) => {
  try {
    const query = queryString.stringify(params);
    const response = await axios.get(`/api/products?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listCategories = async () => {
  try {
    let response = await axios.get("/api/products/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const allProducts = async () => {
  try {
    let response = await axios.get("/api/allproducts");
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
