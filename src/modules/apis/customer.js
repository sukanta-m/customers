import axios from "./axios";

export const fetchCustomerList = (q = '') => {
  return axios.get(`/customers?q=${q}`)
};

export const createCustomer = data => {
  return axios.post("/customers", data)
}

export const updateCustomer = (id, data) => {
  return axios.put(`/customers/${id}`, data)
}

export const deleteCustomer = id => {
  return axios.delete(`/customers/${id}`);
}

export const fetchCustomer = id => {
  return axios.get(`/customers/${id}`);
}

export const fetchAddresssLists = id =>
  axios.get(`/customers/${id}/addresses`);

export const createAddresss = (id, params) =>
  axios.post(`/customers/${id}/addresses`, params)