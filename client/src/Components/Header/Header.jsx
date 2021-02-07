import React from "react";
import styled from "styled-components";
import Burger from "./Burger";


import { Link } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  height: 75px;
  background-image: linear-gradient(to bottom right, #ff3333, #ffff99);
  display: flex;
  justify-content: space-between;
  .logo {
    position: relative;
    bottom: 0.4rem;
   
  }
.logo h3{
  font-size:1.8rem;
  
  color:white;
  margin-left:10px;
  -webkit-text-stroke: 1px black;
}
.logo a{
  text-decoration:none;
}
@media screen and (max-width: 823px){
  .logo h3{
    font-size:1.5rem;
    position:relative;
    bottom:0.2rem;
}
`;

const Header = () => {
  return (
    <Nav>
      <div className="logo">
        <Link to="/" >
          <h3 >GreekRestaurants</h3>
        </Link>
      </div>
      <Burger />
    </Nav>
  );
};

export default Header;