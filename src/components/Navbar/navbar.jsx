import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import './navbar.css';
import ca from '../../assets/ca.png'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={ca} alt="app__logo" />
      </div>
      <div className="app__navbar-links">
        <ul className="app__navbar-links">
          <li className="p__opensans"><a href="/">Home</a></li>
          <li className="p__opensans"><a href="/#online order">Online Order</a></li>
          <li className="p__opensans"><a href="/#menu">Menu</a></li>
          <li className="p__opensans"><a href="/reservation">Reservation</a></li>
          <li className="p__opensans"><a href="/#contact">Contact</a></li>
        </ul>
        <div className="contact-phone"><i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:+61-423356692">+61-423356692</a></div>
      </div>
      
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#000" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><a href="#home" onClick={() => setToggleMenu(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
              <li><i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:+61-423356692">+61-423356692</a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;  