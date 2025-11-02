import React, { useEffect, useState, useMemo } from "react";
import "./SliderComponent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatives } from "../../features/Creatives/CreativesSlice";

import slider1Desktop from "../../Images/slider1.jpg";
import slider1Mobile from "../../Images/slider1-mobile.png";

const defaultSlides = [
  {
    imageDesktop: slider1Desktop,
    imageMobile: slider1Mobile,
    title: "MOTHER’S DAY SPECIAL",
    subtitle: "Tart | Bun | Cheese",
    description: "To the most beautiful women in this entire world",
  },
  {
    imageDesktop: slider1Desktop,
    imageMobile: slider1Mobile,
    title: "VALENTINE’S DAY LOVE",
    subtitle: "Red Velvet | Heart Cake",
    description: "Celebrate the sweetness of love this season",
  },
  {
    imageDesktop: slider1Desktop,
    imageMobile: slider1Mobile,
    title: "CHOCOLATE HEAVEN",
    subtitle: "Fudge | Choco Drip",
    description: "Every bite melts into a memory",
  },
];

const SliderComponent = () => {
  const dispatch = useDispatch();
  const { creatives, loading } = useSelector((state) => state.creatives);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 680);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!creatives || creatives.length === 0) {
      dispatch(fetchCreatives());
    }
  }, [dispatch, creatives]);

  const slidesToShow = useMemo(() => {
    if (creatives && creatives.length > 0) {
      const desktopSlides = creatives
        .filter((c) => c.tag === "desktop")
        .map((c) => ({
          image: `http://localhost:4001/uploads/${c.media}`,
          title: c.title || "",
          subtitle: "",
          description: "",
        }));
      const mobileSlides = creatives
        .filter((c) => c.tag === "mobile")
        .map((c) => ({
          image: `http://localhost:4001/uploads/${c.media}`,
          title: c.title || "",
          subtitle: "",
          description: "",
        }));
      return isMobile ? mobileSlides : desktopSlides;
    } else {
      return isMobile
        ? defaultSlides.map((s) => ({
            image: s.imageMobile,
            title: s.title,
            subtitle: s.subtitle,
            description: s.description,
          }))
        : defaultSlides.map((s) => ({
            image: s.imageDesktop,
            title: s.title,
            subtitle: s.subtitle,
            description: s.description,
          }));
    }
  }, [creatives, isMobile]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="slider-container">
      <Swiper
        key={isMobile ? "mobile" : "desktop"}
        loop={true}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        className="slider-wrapper"
        observer={true}
        observeParents={true}
      >
        {slidesToShow.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide">
              <img
                src={slide.image}
                alt={slide.title}
                className="slide-image"
                loading="lazy"
              />
              <div className="slide-content">
                <p className="slide-subtitle">{slide.subtitle}</p>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-desc">{slide.description}</p>
                <button className="order-btn">Order Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
