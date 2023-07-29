import axios from "axios";
const apiUrl = "http://localhost:8080/auth/signin";

const signin = async (user) => {
  try {
    let response = await axios.post('/auth/signin', user, {
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
    const response = await axios.get('/auth/signin');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { signin, signout };
