import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";

let LoginForm = {
  Email: {
    name: "email",
    validate: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please Enter Valid Email",
      },
    },
  },
  Password: {
    name: "password",
    validate: {
      required: {
        value: true,
        message: "Password is required",
      },
    },
  },
};

const Login = (props) => {
  let { onSubmit } = props;

  let { handleSubmit, register, errors } = useForm({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
    criteriaMode: "all",
  });

  let email = LoginForm.Email;
  let password = LoginForm.Password;

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name={email.name} ref={register(email.validate)} />
        {errors[email.name] && <p>{errors[email.name].message}</p>}
        <label>Password</label>
        <input
          type="password"
          name={password.name}
          ref={register(password.validate)}
        />
        {errors[password.name] && <p>{errors[password.name].message}</p>}
        <input type="submit" />
        <a href="/signup">Create an account</a>
      </form>
    </>
  );
};

export default Login;
