import axios from "axios";
// const apiUrl = "https://aanglo.onrender.com";
const apiUrl = "http://localhost:8080";
const create = async (params, credentials, order) => {
  try {
    const response = await axios.post(
      `/api/orders/${params.userId}`,
      { order: order },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const listByShop = async (params, credentials) => {
  try {
    const response = await axios.get(
      `/api/orders/shop/${params.shopId}`,
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

const getStatusValues = async () => {
  try {
    let response = await axios.get(`/api/order/status_values`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const update = async (params, credentials, product) => {
  try {
    let response = await axios.put(
      `/api/order/status/${params.shopId}`,
      product,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const cancelProduct = async (params, credentials, product) => {
  try {
    let response = await axios.put(
      `/api/order/${params.shopId}/cancel/${params.productId}`,
      product,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
const processCharge = async (params, credentials, product) => {
  try {
    let response = await axios.put(
      `/api/order/${params.orderId}/charge/${params.userId}/${params.shopId}`,
      product,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

const listByUser = async (params, credentials) => {
  try {
    const response = await axios.get(
      `/api/orders/user/${params.userId}`,
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
const read = async (params, credentials) => {
  try {
    const response = await axios.get(`/api/order/${params.orderId}`, {
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
export {
  create,
  listByShop,
  getStatusValues,
  update,
  cancelProduct,
  processCharge,
  listByUser,
  read,
};
