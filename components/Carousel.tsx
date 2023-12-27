'use client';

import { useState } from 'react';
import Link from 'next/link';

import { getRoute } from '~lib/getRoute';

import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const Carousel = ({ data }: { data: Banner[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 4 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 4 ? 0 : prevSlide + 1));
  };

  const handleSlideTo = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Render each carousel item */}
        {data.map((banner, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <Link href={getRoute(banner)}>
              <Image
                src={banner.imageUrl}
                alt={banner.typeTitle}
                title={banner.typeTitle}
                priority={true}
                width={1080}
                className="hover:cursor-pointer rounded w-full transition-all duration-500 shadow"
                height={480}
              />
            </Link>
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(9)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onMouseEnter={() => handleSlideTo(index)}
            onClick={() => handleSlideTo(index)}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      {/* <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={handlePrevSlide}>
        <IoIosArrowBack className="bg-white/10 w-4 h-4 rounded-full backdrop-blur-md p-2" />
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={handleNextSlide}>
        <IoIosArrowForward />
      </button> */}
    </div>
  );
};

export default Carousel;
