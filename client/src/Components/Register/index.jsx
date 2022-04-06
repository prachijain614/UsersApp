import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";

/** Object that defines rules and validations for the login form */
let LoginForm = {
  FirstName: {
    name: "firstname",
    validate: {
      required: {
        value: true,
        message: "Firstname is required",
      },
    },
  },
  LastName: {
    name: "lastname",
    validate: {
      required: {
        value: true,
        message: "Lastname is required",
      },
    },
  },
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
  /** we are using react-hook-form to validate forms */
  let { onSubmit } = props;

  let { handleSubmit, register, errors } = useForm({
    mode: "onChange",
    defaultValues: { firstname: "", lastname: "", username: "", password: "" },
    criteriaMode: "all",
  });

  let firstName = LoginForm.FirstName;
  let lastName = LoginForm.LastName;
  let email = LoginForm.Email;
  let password = LoginForm.Password;

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input name={firstName.name} ref={register(firstName.validate)} />
        {errors[firstName.name] && <p>{errors[firstName.name].message}</p>}
        <label>Last Name</label>
        <input name={lastName.name} ref={register(lastName.validate)} />
        {errors[lastName.name] && <p>{errors[lastName.name].message}</p>}
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
        <a href="/">Already a user? Login</a>
      </form>
    </>
  );
};

export default Login;
