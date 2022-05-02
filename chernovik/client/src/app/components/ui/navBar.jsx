import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavProfile from "../../layouts/navProfile";
import { getIsLoggedIn } from "../../store/users";

const Navbar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn())
  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              Главная
            </Link>
          </li>
          {isLoggedIn  && (
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/books">
                Все книги
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn  ? (
            <NavProfile/>
          ) : (
              <Link className="nav-link" aria-current="page" to="/login">
                Войти
              </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
