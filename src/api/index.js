import axios from "axios";



//define base url 

const API = axios.create({
    baseURL : "http://localhost:5050/",
});

//user singup

export const UserSignUp = async (data) => {
  console.log("Data sent to API:", data);
  return await API.post("/api/user/signup", data);
};



export const UserSingIn = async (data) => {
   // Log the data being sent
  return await API.post("/api/user/signin", data);
};


//product

export const getAllproducts = async(filter)=> await API.get(`/api/food?${filter}`, filter)
export const getProductDetails = async (id) => await API.get(`/api/food/${id}`);

// cart

export const getCart = async (token) =>
    await API.get(`/api/user/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const addToCart = async (token, data) =>
    await API.post(`/api/user/cart/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const deleteFromCart = async (token, data) =>
    await API.patch(`/api/user/cart/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  //favorites
  
  export const getFavourite = async (token) =>
    await API.get(`/api/user/favorite`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const addToFavourite = async (token, data) =>
    await API.post(`/api/user/favorite/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const deleteFromFavourite = async (token, data) =>
    await API.patch(`/api/user/favorite/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  //Orders
  export const placeOrder = async (token, data) =>
    await API.post(`/api/user/order/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
  export const getOrders = async (token) =>
    await API.get(`/api/user/order/`, {
      headers: { Authorization: `Bearer ${token}` },
    });