import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Включает автоматическую прокрутку
    autoplaySpeed: 3000, // Интервал прокрутки (в миллисекундах)
  };

  const images = [
    { src: 'https://www.kp.ru/russia/wp-content/uploads/2019/12/dostoprimechatelnosti-moskv-1536x864.jpg', link: '/places/1', alt: 'Place 1' },
    { src: 'https://s10.stc.all.kpcdn.net/russia/wp-content/uploads/2022/02/TSentralnyj-administrativnyj-okrug-v-Moskve-krasnaya-ploshhad.jpg', link: '/places/2', alt: 'Place 2' },
    { src: 'https://s14.stc.all.kpcdn.net/russia/wp-content/uploads/2020/04/vorobevy-gory-2602.jpg', link: '/places/3', alt: 'Place 3' },
    { src: 'https://s14.stc.all.kpcdn.net/russia/wp-content/uploads/2020/04/vorobevy-gory-2601.jpg', link: '/places/4', alt: 'Place 4' },
    { src: 'https://s12.stc.all.kpcdn.net/russia/wp-content/uploads/2021/04/rechnieprog-v-msk-teplohodi-kreml-2048.jpg', alt: 'Place 5' },
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <a href={image.link}>
            <img src={image.src} alt={image.alt} style={{ width: '100%' }} />
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;