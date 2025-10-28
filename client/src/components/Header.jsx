// src/components/Header.jsx
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:8000/api/logout/", { credentials: "include" });
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-yellow-400 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">SnackVerse</h1>
      <nav className="space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white font-semibold ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `text-white font-semibold ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className="text-white px-4 py-2 hover:text-yellow-300"
        >
          Cart
        </NavLink>
        {user ? (
          <>
            <span className="text-white font-semibold">Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-yellow-500 font-semibold px-3 py-1 rounded hover:bg-yellow-100 ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="text-white font-semibold">
              Login
            </NavLink>
            <NavLink to="/register" className="text-white font-semibold">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
