// const create = async (params, credentials, order, token) => {
//     try {
//       let response = await fetch('/api/orders/'+params.userId, {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + credentials.t
//           },
//           body: JSON.stringify({order: order, token:token})
//         })
//         return response.json()
//       }catch(err) {
//         console.log(err)
//       }
//   }
import axios from "axios";
const create = async (params, credentials, order) => {
  try {
    const response = await axios.post(
      `https://aanglo.onrender.com/api/orders/${params.userId}`,
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
    const response = await axios.get("https://aanglo.onrender.com/api/orders/shop/" + params.shopId, {
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

const getStatusValues = async () => {
  try {
    let response = await axios.get("https://aanglo.onrender.com/api/order/status_values");
    return response.data;
  } catch (err) {
    throw err;
  }
};

const update = async (params, credentials, product) => {
  try {
    let response = await axios.put(
      "/api/order/status/" + params.shopId,
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
      "https://aanglo.onrender.com/api/order/" + params.shopId + "/cancel/" + params.productId,
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
      "https://aanglo.onrender.com/api/order/" +
        params.orderId +
        "/charge/" +
        params.userId +
        "/" +
        params.shopId,
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

export { create, listByShop, getStatusValues, update, cancelProduct,processCharge };
