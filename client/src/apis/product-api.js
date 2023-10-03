import axios from "axios";
import queryString from "query-string";
// const apiUrl = "https://aanglo.onrender.com";
const apiUrl = "http://localhost:8080";
const create = async (params, credentials, product) => {
  try {
    const response = await axios.post(
      `/api/products/by/${params.shopId}`,
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
    const response = await axios.get(`/api/products/by/${params.shopId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listLatest = async () => {
  try {
    const response = await axios.get(`/api/products/latest`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listRelated = async (params) => {
  try {
    const response = await axios.get(
      `/api/products/related/${params.productId}`
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
    let response = await axios.get(`/api/products/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await axios.delete(
      `/api/product/${params.shopId}/${params.productId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const update = async (params, credentials, product) => {
  try {
    const response = await axios.put(
      `/api/product/${params.shopId}/${params.productId}`,
      product,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
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
  remove,
  update,
};
