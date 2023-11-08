import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/bitcoin.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import {  registerRoute } from "../utils/APIRoutes";
function Register() {
  const navigate = useNavigate();
  const toastDesign = {
    pauseOnHover: true,
    autoClose: 8000,
    position: "bottom-right",
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error("Username Invalid", toastDesign);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be same  ",
        toastDesign
      );
      return false;
    } else if (email.length < 3) {
      toast.error("Email Invalid", toastDesign);
      return false;
    } else if (password.length < 3) {
      toast.error("Password Invalid", toastDesign);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastDesign);
    }
    return true;
  };

  useEffect(()=>{
    if (localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  },[navigate])


  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // event.target.value: This gives you the value (what you typed)
  // in the element that triggered the event.


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        const { password, username, email } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
        if (data.status === false) {
          toast.error(data.msg, toastDesign);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>CryptoApp</h1>
          </div>
          <input
            type="text"
            name="username"
            onChange={(event) => handleChange(event)}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            onChange={(event) => handleChange(event)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={(event) => handleChange(event)}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
            placeholder="Confirm Password "
          />

          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login ">Login</Link>
          </span>
        </form>

        {/* Link is an important section over here from which you can go to the specified domain */}
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      width: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    align-items: center;
    justify-content: center;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      /* transition: 0.3s ease-in-out; */
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      width: 110%;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.4rem;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
