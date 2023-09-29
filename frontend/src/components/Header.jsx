import React, { useState } from "react";
import logo from "../assets/logorfood.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";

import { toast } from "react-hot-toast";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const userData = useSelector((state) => state.user);
console.log(userData);
const dispatch = useDispatch();
const handleLogout = () => {
  dispatch(logoutRedux());
  toast("Logout successfully");
};


  return (
    <header>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 shadow-lg  shadow-red-800">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/"  className="flex items-center">
            <img src={logo} className="h-16 mr-3" alt="RollingLogo" />
           
          </Link>
          <div className="flex md:order-2">
          {userData.firstName ? (
          <Link
          to="/login"
            type="button"
            className="text-white bg-green-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
            onClick={handleLogout}
          >
            Logout({userData.firstName})
          </Link>

        ): (
          <Link
          to="/login"
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
          >
            Login
          </Link>

        )}


           
          
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-red-500 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-red-500 rounded"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                 to="/about"
                  className="block py-2 pl-3 pr-4 text-red-500 rounded hover:bg-gray-100"
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block py-2 pl-3 pr-4 text-red-500 rounded hover:bg-gray-100"
                  aria-current="page"
                >
                Products
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="block py-2 pl-3 pr-4 text-red-500 rounded hover:bg-gray-100"
                  aria-current="page"
                >
                Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"                
                  className="block py-2 pl-3 pr-4 text-red-500 rounded hover:bg-gray-100"
                  aria-current="page"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        
        </div>
        {userData.firstName ? (
          <p>Bienvenido {userData.firstName}</p>
        ): (<p></p>)}
      </nav>
    </header>
  );
};

export default Header;
