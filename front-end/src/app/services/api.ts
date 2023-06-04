// const { default: axios } = require("axios");
// Instead of this
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const getAuthToken = () => {
  return localStorage.getItem("token") || "";
};

const client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// const getAuthToken = () => {
//   return localStorage.getItem("authToken");
// };

client.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...config.headers,
      Authorization: getAuthToken(),
      // "X-Requested-With": "XMLHttpRequest",
      // Expires: "-1",
      // "Cache-Contro": "no-cache,n-store,must-revalidate,max-age=-1,private",
      // Pragma: "no-cache",
    };

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      //Add Logic to
      //1. Redirect to login page or
      window.location.replace("/login");
      // localStorage.setItem("isLoggedIn", false);
      //2. Request refresh token
    }
    return Promise.reject(error);
  }
);

//Reusability in all web request.
const request = {
  get: (url: string, params?: object, config?: object) =>
    client
      .get(url, { params: params, ...config })
      .then((res: any) => res.data)
      .catch((err: any) => Promise.reject(err.response.data)),
  post: (url: string, data: object, config?: object) =>
    client
      .post(url, data, config)
      .then((res: any) => res.data)
      .catch((err: any) => Promise.reject(err.response.data)),
  put: (url: string, data: object) =>
    client
      .put(url, data)
      .then((res: any) => res.data)
      .catch((err: any) => Promise.reject(err.response.data)),
  patch: (url: string, data: object, config?: object) =>
    client
      .patch(url, data, config)
      .then((res: any) => res.data)
      .catch((err: any) => Promise.reject(err.response.data)),
  delete: (url: string, data?: object) =>
    client
      .delete(url, { data: data })
      .then((res: any) => res.data)
      .catch((err: any) => Promise.reject(err.response.data)),
};

const Authentication = {
  registerUser: (data: object) => request.post(`/user/register`, data),

  loginUser: (data: object) => request.post(`/user/login`, data),

  getUser: () => request.get(`/user/account`),

  updateUserProfile: ({ data, id }: any) =>
    request.patch(`/user/${id}/profile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

const homeAdministration = {
  getExpenses: () => request.get(`/expenses`),

  createExpense: (data: object) => request.post(`/expenses`, data),

  getCategories: () => request.get(`/categories`),

  updateExpense: ({ data, id }: any) => request.put(`/expenses/${id}`, data),

  deleteExpense: ({ id }: any) => request.delete(`/expenses/${id}`),
  // inviteUser: (data) => request.post(`/invite`, data),
  // getUsers: () => request.get(`/GetUsers`),

  undoDeletedExpense: ({ id }: any) =>
    request.get(`/expenses/undo-delete/${id}`),
};

const settingsAdministration = {
  createBudget: (data: object) => request.post(`/budgets`, data),

  updateBudget: ({ id, data }: any) => request.put(`/budgets/${id}`, data),

  getBudget: () => request.get(`/budgets`),

  createCategory: (data: object) => request.post(`/categories`, data),

  updateCategory: ({ data, id }: any) => request.put(`/categories/${id}`, data),

  deleteCategory: (id: string) => request.delete(`/categories/${id}`),
};

export const api = {
  Authentication,
  homeAdministration,
  settingsAdministration,
};
