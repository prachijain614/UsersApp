import axios from "axios";

/** setting baseurl for all http method calls */
axios.defaults.baseURL = "http://localhost:3001/";

export default class WebService {
  /** action types */
  static Action = {
    login: "/login",
    signup: "/signup",
    list: "/users",
    edit: "/users/",
  };

  /** Http methods */
  static async post(action, params) {
    let response = await axios.post(action, params);
    return response.data;
  }
  static async put(action, params) {
    let response = await axios.put(action, params);
    return response.data;
  }
  static async get(action) {
    let response = await axios.get(action);
    return response.data;
  }
}

/** setting default header in http requests */
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = localStorage.getItem("token");
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

/** handling response of http request */
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
