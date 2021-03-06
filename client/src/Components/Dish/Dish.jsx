import React, { useState } from "react";
import "./Dish.css";

const Dish = ({ dish, history, match }) => {
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    history.push(`/cart/${dish._id}?qty=${qty}`);
  };
  return (
    <div>
      <div className="dish-card">
        <div className='dish-image'>
        <img src={dish.image} alt={dish.name} />
        </div>
       
        
        <h3> {dish.name} </h3>
        <h4> {dish.description} </h4>
        {dish.vegan && <h4>Vegan &#10004;</h4>}
        {dish.vegeterian && <h4>Vegeterian &#10004;</h4>}
        {dish.traditional && <h4>Traditional &#10004;</h4>}
        <h4> {dish.price} €</h4>
        {dish.available > 0 ? (
          <button className="cart-button" onClick={addToCartHandler}>
            Add to cart
          </button>
        ) : (
          <h4>Not Available</h4>
        )}
        {dish.available > 0 ? (
          <div className="select-dish-number">
            <h4>
              <strong>Select Quantity:</strong>
            </h4>
            <select value={qty} onChange={(e) => setQty(e.target.value)}>
              {[...Array(dish.available).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dish;
