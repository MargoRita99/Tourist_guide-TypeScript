import React from 'react';
import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';
import './HomePage.css'; 

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header text-center mb-4">
        <h1>Добро пожаловать!</h1>
        <h3>Это ваш гид по лучшим туристическим местам Москвы.</h3>
      </header>
      <p className="text-center mb-4">
        Один из самых красивых, комфортных и впечатляющих мегаполисов мира. Москва — город с богатой историей и особым характером. Ее неповторимый облик создавали русские зодчие, советские архитекторы и современные дизайнеры.
        Москва многогранна и неизменно привлекательна. Она встречает тысячами весенних цветов в парках, поражает летним простором бульваров и площадей, удивляет богатством осенних красок и предстает в сверкающем новогоднем убранстве. Это город, в который хочется возвращаться за яркими эмоциями и новыми впечатлениями.
      </p>
      <Carousel />
      <h2 className="text-center my-4">Куда хотите сходить?</h2>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/places/parks" className="btn btn-outline-light px-4 py-2">
          Хочу гулять!
        </Link>
        <Link to="/places/events" className="btn btn-outline-light px-4 py-2">
          Хочу посетить мероприятие!
        </Link>
        <Link to="/places/active" className="btn btn-outline-light px-4 py-2">
          Хочу провести активный отдых!
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

