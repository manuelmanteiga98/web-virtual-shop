import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLogged, getCategories } from "../selectors";
import { toFiltered, toFilteredByCategory } from "../../../store/itemsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const currentPath = useLocation().pathname;

  // States
  const [filteringText, setFilteringText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("-");

  // Selections
  const categories = useSelector(getCategories);
  const logged = useSelector(isLogged);

  // Handlers
  const onLogoutClick = () => dispatch(logout());
  const filterList = (e) => {
    setFilteringText(e.target.value);
    dispatch(toFiltered(e.target.value));
  };
  const onCategoryChangeHandler = (e) => {
    const category = e.target.value === "-" ? "" : e.target.value;
    setSelectedCategory(category);
    dispatch(
      toFilteredByCategory({
        category: category,
        text: filteringText,
      })
    );
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light header-navbar">
      <div class="container mw-100">
        <a class="navbar-brand" href="/">
          Market App
        </a>

        {logged && currentPath === "/items" && (
          <div className="input-group rounded header-search-items">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={filteringText}
              onChange={filterList}
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
        )}

        {logged && currentPath === "/items" && categories.length > 0 && (
          <select
            className="form-select header-category-selector"
            name="categories"
            id="categories"
            onChange={onCategoryChangeHandler}
            value={selectedCategory}
          >
            {categories.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
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
                  <li class="nav-item">
                    <Link to="/sales">
                      <a class="nav-link">Sales</a>
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/orders">
                      <a class="nav-link">Orders</a>
                    </Link>
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
