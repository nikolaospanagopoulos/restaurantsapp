import React from "react";
import "./Dish.css";

const Dish = ({ dish }) => {
  return (
    <div>
      <div className="dish-card">
        <h3> {dish.name} </h3>
        <h4> {dish.description} </h4>
        {dish.vegan ? (
          <h4> Vegan &#10004;</h4>
        ) : dish.vegeterian ? (
          <h4> Vegeterian &#10004;</h4>
        ) : dish.traditional ? (
          <h4>Traditional &#10004;</h4>
        ) : (
          ""
        )}
        <h4> {dish.price} €</h4>
      </div>
    </div>
  );
};

export default Dish;
