import React from "react";
import WebService from "../../api";
import Login from "../../Components/Login";
import { handleError } from "../../utils/helper";

const Page = () => {
  const onLogin = async (params) => {
    try {
      const action = WebService.Action.login;
      let response = await WebService.post(action, params);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      window.location.href = "/users";
    } catch (err) {
      handleError(err?.response);
    }
  };

  return <Login onSubmit={onLogin} />;
};

export default Page;
