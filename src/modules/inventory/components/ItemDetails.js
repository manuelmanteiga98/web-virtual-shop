import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getList } from "../selectors";

const ItemDetails = () => {
  const { itemID } = useParams();
  const list = useSelector(getList);
  const item = list.find((item) => item.id === itemID);
  return <>Hola k ase, este es el item {item.name}</>;
};

export { ItemDetails };
