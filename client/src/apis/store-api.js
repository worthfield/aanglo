import axios from "axios";
// const apiUrl = "https://aanglo.onrender.com";
const apiUrl = "http://localhost:8080";
const create = async (params, credentials, shop) => {
  try {
    let response = await axios.post(
      `/api/shops/by/${params.userId}`,
      shop,
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

const list = async () => {
  try {
    let response = await axios.get(`/api/shops`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

const listByOwner = async (params, credentials) => {
  try {
    let response = await axios.get(`/api/shops/by/${params.userId}`, {
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
    const response = await axios.get(`/api/shop/${params.shopId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (params, credentials, store) => {
  try {
    const response = await axios.put(
      `/api/shops/${params.shopId}`,
      store,
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

const remove = async(params,credentials)=>{
  try{
    const response = await axios.delete(
      `/api/shops/${params.shopId}`,
      {
        headers:{
          Accept:"application/json",
          Authorization:"Bearer " + credentials.t
        }
      }
    )
    return response.data;
  }
  catch(error){
    throw error
  }

}

export { create, list, listByOwner, read, update,remove };
