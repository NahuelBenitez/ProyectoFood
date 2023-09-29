import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
   
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
//console.log("Server Domain:", serverDomain);


//console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = data;
    if (firstName && lastName && email && password) {
      try {
        const fetchData = await fetch(serverDomain+"/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataRes = await fetchData.json();
        console.log("Registro exitoso:", dataRes);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate('/login')
        }
        // Aquí puedes agregar código para redirigir al usuario después de registrarse exitosamente
        // Por ejemplo:
        // history.push('/login');
      } catch (error) {
        console.error("Error al registrar:", error);
      }
    } else {
      alert("Please Enter all required fields");
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-red-600 sm:text-3xl">
          Register Now!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Create a new account to access incredible discounts and promotions
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div>
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="First Name"
              value={data.firstName}
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Last Name"
              value={data.lastName}
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
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
                value={data.password}
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
            Register
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <span className="text-blue-700 hover:text-blue-950">
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
