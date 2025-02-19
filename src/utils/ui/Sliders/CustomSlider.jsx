import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CustomSlider = ({
  slides,
  slidesPerView ,
  width = "100%", 
  height = "400px",
  autoplay = true,
  loop = true,
  navigation = true,
  pagination = false,
  
  shape = "rectangle", // Options: "circle", "square", "rectangle"
}) => {
  // Shape Styles
  const shapeStyles = {
    circle: "rounded-full overflow-hidden",
    square: "rounded-lg",
    rectangle: "rounded-md"
  };

  return (
    <div style={{ width, height }} className="overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        loop={loop}
        autoplay={autoplay ? { delay: 2000, disableOnInteraction: false } : false}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        className="w-full h-full"
        breakpoints={{
          320: { slidesPerView: 1 }, // Mobile
          640: { slidesPerView: 2 }, // Tablet
          1024: { slidesPerView: slidesPerView}, // Desktop
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="flex justify-center items-center">
            <div className={`relative w-full h-full ${shapeStyles[shape]}`}>
              <img
                src={slide.image}
                alt={slide.title || "Slide"}
                className="w-full h-full object-cover"
              />
              {slide?.title && (
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-1 rounded">
                  <h2 className="text-xs font-bold">{slide?.title}</h2>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSlider;