import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";


const Login = () => {
  const navigate = useNavigate()  
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const userData = useSelector(state => state)
//console.log(userData.user);

  const dispatch = useDispatch()


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email , password}= data;
    if(email && password){
      const fetchData = await fetch(serverDomain+"/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const dataRes = await fetchData.json()
      console.log(dataRes);
      toast( dataRes.message)
      dispatch(loginRedux(dataRes))
      setTimeout(()=>{        
        navigate("/")
      }, 1000)
     // console.log(userData)
    }else{
      alert('Enter required fields')
    }

 
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-red-600 sm:text-3xl">
          Get registered today!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          You will access incredible discounts and promotions
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                onChange={handleOnChange}
                required
              />

              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <span className="text-blue-700 hover:text-blue-950">
              <Link to="/register">Register Now!</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
