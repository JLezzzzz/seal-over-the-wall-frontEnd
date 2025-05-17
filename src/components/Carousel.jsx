import React, { useEffect } from "react";
import { useState } from "react";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {

  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr ((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr ((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, )


  return (
    <div className="overflow-hidden relative bg-[#ECEFE8] w-full h-full ">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex w-full gap-90 transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 150}%)`}}
        >{slides}</div>
      </div>
      <div className="absolute inset-0 flex justify-between items-center p-4">
        <img src="/assets/images/chevron-left.svg" onClick={prev}
        className="w-[30px] h-[30px] hover:cursor-pointer"/>
        <img src="/assets/images/chevron-right.svg" onClick={next}
        className="w-[30px] h-[30px] hover:cursor-pointer"/>
      </div>
      <div className="absolute bottom-15 right-10">
        <div className="flex item-center justify-center gap-2">
        {slides.map((_, i) => (
            <div
              className={`
              transition-all w-[8px] h-[8px] rounded-full
              ${curr === i ? "bg-primary-blue-500 w-[72px]" : "bg-white bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-15 left-10 flex ">
        <img src="/assets/images/custommike-navbar-logo.svg"
        className="w-[139px] h-[18px]"/>
      </div>
    </div>
  )
}