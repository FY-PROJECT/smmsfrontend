import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

const Testimonials = () => {
  SwiperCore.use([Autoplay, Pagination]);

  const quotes = [
    "A boy on joining wants to begin Scouting right away.",
    "Scoutmasters need to enter into boys’ ambitions.",
    "Scouting is a man’s job cut down to a boy’s size.",
    "We do not want to make Scout training too soft.",
    "Teach Scouts not how to get a living, but how to live.",
    "The Scout Oath and Law are our binding disciplinary force.",
    "In Scouting you are combating the brooding of selfishness"
  ];



  return (
    <section id="testimonials" className="testimonials section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Baden-Powell Sayings</h2>
        </div>
        <Swiper
          speed={800}
          slidesPerView="auto"
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true
          }}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            // when window width is >= 360px
            360: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 750px
            750: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 1200px
            1200: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
        >
          {quotes.map((quote, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <p>
                  <i className="fa-solid fa-quote-left" style={{fontSize: "30px", marginRight: "236px"}}></i>
                  <br/>
                  {quote}<br/>
                  <i className="fa-solid fa-quote-right" style={{fontSize: "30px", marginLeft: "235px"}}></i>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
