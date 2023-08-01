import axios from "axios";
const apiUrl = "https://aanglo.onrender.com/";

const signin = async (user) => {
  try {
    let response = await axios.post(`${apiUrl}/auth/signin`, user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signout = async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth/signin`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { signin, signout };
