import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLogged } from "../selectors";
import { toFiltered } from "../../../store/itemsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const logged = useSelector(isLogged);
  const onLogoutClick = () => dispatch(logout());
  const filterList = (e) => {
    dispatch(toFiltered(e.target.value));
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">
          Market App
        </a>

        {logged && (
          <div class="input-group rounded w-50 search-items-bar">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={filterList}
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
        )}

        {logged && (
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <Link to="/items">
                  <a class="nav-link">Inventory</a>
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sections
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="#">
                      Link 1
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Link 2
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Link 3
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <Link to="/" onClick={onLogoutClick}>
                  <img
                    class="nav-link header-logout"
                    src="https://cdn.pixabay.com/photo/2014/03/25/16/59/external-link-297789_960_720.png"
                  />
                </Link>
              </li>
            </ul>
          </div>
        )}
        {logged && (
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
