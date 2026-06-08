import React from 'react';
import Marquee from "react-fast-marquee";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
const Banner = () => {
    return (
       <div className="bg-[#0f172a] text-white overflow-hidden">

      {/* Top Marquee */}
      <marquee speed={50} className="border-b border-purple-500 py-3">
        <span className="mx-8">🚀 5000+ Problems</span>
        <span className="mx-8">💻 Mock Interviews</span>
        <span className="mx-8">📚 DSA Roadmaps</span>
        <span className="mx-8">🏆 Weekly Contests</span>
        <span className="mx-8">🎯 Track Progress</span>
      </marquee>

      <div className="max-w-7xl mx-auto py-16 px-4">

        <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-10">
          Practice. Prepare.
          <span className="text-[#8b5cf6]"> Ace.</span>
        </h1>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
        clickable: true,
      }}
          loop={true}
          className="rounded-3xl"
        >
          <SwiperSlide>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-16 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Practice Daily.
              </h2>
              <p className="text-xl text-gray-300">
                Track Progress. Stay Consistent.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-16 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Mock Interviews
              </h2>
              <p className="text-xl text-gray-300">
                With Real Questions.
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-16 text-center">
              <h2 className="text-4xl font-bold mb-4">
                From Beginner
              </h2>
              <p className="text-xl text-gray-300">
                To Job Ready.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#8b5cf6]">5000+</h3>
            <p>Coding Problems</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#8b5cf6]">100+</h3>
            <p>Mock Tests</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#8b5cf6]">50K+</h3>
            <p>Users</p>
          </div>

          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#8b5cf6]">95%</h3>
            <p>Success Rate</p>
          </div>
        </div> */}
      </div>

      {/* Bottom Marquee */}
      <marquee speed={50} direction="right" className="border-t border-purple-500 py-3">
        <span className="mx-8">React</span>
        <span className="mx-8">Node.js</span>
        <span className="mx-8">MongoDB</span>
        <span className="mx-8">JavaScript</span>
        <span className="mx-8">Python</span>
        <span className="mx-8">DSA</span>
        <span className="mx-8">System Design</span>
      </marquee>

    </div>
    );
};

export default Banner;

