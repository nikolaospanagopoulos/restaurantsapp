import React from 'react';
import restaurants from '../../Images/background-restaurants.jfif'
import './Header.css'
const Header = () => {
    return ( 
        <div>
            <img src={restaurants} alt='fruits' className='header-image'/>
            
        </div>
     );
}
 
export default Header