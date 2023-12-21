import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../../users";
import { Register } from "../../users";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLogged } from "../selectors";
import { InventoryList, ItemDetails } from "../../inventory";

const Body = () => {
  const logged = useSelector(isLogged);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {logged && <Route path="/articles" element={<InventoryList />} />}
      {logged && <Route path="/articles/:itemID" element={<ItemDetails />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Body;
