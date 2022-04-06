import React from "react";
import { useHistory } from "react-router-dom";
import WebService from "../../api";
import Login from "../../Components/Login";
import { handleError } from "../../utils/helper";

const Page = () => {
  const history = useHistory();
  const onLogin = async (params) => {
    try {
      const action = WebService.Action.login;
      let response = await WebService.post(action, params);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      history.push("/users");
    } catch (err) {
      handleError(err?.response);
    }
  };

  return <Login onSubmit={onLogin} />;
};

export default Page;
