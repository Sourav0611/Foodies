import React from 'react';
import './ExploreMenu.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Autoplay } from 'swiper/modules'; // Import from 'swiper'
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { menu_list } from '../../assets/assets'; // Ensure this path is correct

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Specials</h1>
      <p className="explore-menu-text">
        "Discover our diverse menu, filled with irresistible dishes for every taste."
      </p>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="explore-menu-swiper"
      >
        {menu_list.map((item, index) => (
          <SwiperSlide key={index} className="explore-menu-slide">
            <div
              onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))}
              className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <hr />
    </div>
  );
};

export default ExploreMenu;
