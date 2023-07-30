import axios from "axios";
const create = async (params, credentials, shop) => {
  try {
    let response = await axios.post(`https://aanglo.onrender.com/api/shops/by/${params.userId}`, shop, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const list = async () => {
  try {
    let response = await axios.get("https://aanglo.onrender.com/api/shops");
    return response.data;
  } catch (err) {
    throw err;
  }
};

const listByOwner = async (params, credentials) => {
  try {
    let response = await axios.get("https://aanglo.onrender.com/api/shops/by/" + params.userId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const read = async (params) => {
  try {
    const response = await axios.get(`https://aanglo.onrender.com/api/shop/${params.shopId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (params, credentials, store) => {
  try {
    const response = await axios.put("https://aanglo.onrender.com/api/shops/" + params.shopId, store, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export { create, list, listByOwner, read, update };
