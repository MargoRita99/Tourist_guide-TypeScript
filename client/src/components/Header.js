import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Header.css'; 

const Header = () => {
  return (
    <header className="bg-danger text-black py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <img
          src="https://icons.getbootstrap.com/assets/icons/globe-americas.svg"
          alt="Logo"
          style={{ height: '40px' }}
        />
        <nav>
        <Link to="/" className="text-black mx-3 text-decoration-none header-link">Главная</Link>
        <Link to="/places" className="text-black mx-3 text-decoration-none header-link">Места</Link>
        <Link to="/routes" className="text-black mx-3 text-decoration-none header-link">Маршруты</Link>
        <Link to="/registration" className="text-black mx-3 text-decoration-none header-link">Регистрация</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
