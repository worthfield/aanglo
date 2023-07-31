import axios from "axios";
const create = async (user) => {
  try {
    let response = await axios.post("/api/users", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const verify = async (user) => {
  try {
    let response = await axios.post('/api/users/verify', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const list = async () => {
  try {
    let response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const read = async (params, credentials) => {
  try {
    let response = await axios.get(`/api/users/${params.userId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (params,credentials, user) => {
  try {
    let response = await axios.put(`/api/users/${params.userId}`, user,{
      headers:{
        Accept:"application/json",
        Authorization:"Bearer "+ credentials.t

      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (params,credentials) => {
  try {
    let response = await axios.delete(`/api/users/${params.userId}`,{
      headers:{
        Accept:"application/json",
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ credentials.t
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { create, verify, list, read, update, remove };
