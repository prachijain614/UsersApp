import React from "react";
import WebService from "../../api";
import Rsgister from "../../Components/Register";
import { handleError } from "../../utils/helper";

const Page = () => {
  const onRegister = async (params) => {
    try {
      const action = WebService.Action.signup;
      let response = await WebService.post(action, params);
      alert("You have successfully created account with us.");
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      window.location.href = "/users";
    } catch (err) {
      handleError(err?.response);
    }
  };
  return <Rsgister onSubmit={onRegister} />;
};

export default Page;
