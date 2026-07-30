
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import practiceImg from "../assets/practice.jpg";
import mockImg from "../assets/mock_interview.jpg";
import laptopImg from "../assets/using_laptop.jpg";

import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const slides = [
  {
    image: practiceImg,
    badge: "🔥 Daily Practice",
    title: "Practice Every Day",
    description:
      "Build strong problem-solving skills through consistent coding practice.",
    features: [
      "Solve real coding challenges",
      "Improve logical thinking",
      "Stay consistent every day",
    ],
    quote: "Small progress each day leads to big success.",
    button: "Start Practicing",
  },
  {
    image: mockImg,
    badge: "🎯 Mock Interview",
    title: "Crack Your Interview",
    description:
      "Prepare with realistic technical interview experiences.",
    features: [
      "Company-style questions",
      "Timed interview sessions",
      "Boost confidence",
    ],
    quote: "Practice like it's your real interview.",
    button: "Take Interview",
  },
  {
    image: laptopImg,
    badge: "🚀 Career Journey",
    title: "Become Job Ready",
    description:
      "Learn, build projects, and create a portfolio that stands out.",
    features: [
      "Build real projects",
      "Portfolio guidance",
      "Career roadmap",
    ],
    quote: "Turn your skills into opportunities.",
    button: "Explore Roadmap",
  },
];

const Rightside = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className="relative py-2">

      {/* Glow */}
      <div className="absolute -top-12 right-0 w-56 h-56 bg-violet-600/20 blur-3xl rounded-full"></div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl">

              {/* Image */}
              <div className="relative">

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-65 w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/20 to-transparent"></div>

                <span className="absolute top-5 left-5 px-4 py-1 rounded-full bg-violet-600 text-white text-sm font-semibold">
                  {slide.badge}
                </span>

              </div>

              {/* Content */}

              <div className="p-8">

                <h2 className="text-2xl font-bold text-white mb-3">
                  {slide.title}
                </h2>

                <p className="text-slate-300 leading-relaxed mb-2">
                  {slide.description}
                </p>


                <p className="italic text-center text-slate-400 mb-4">
                  "{slide.quote}"
                </p>

                {/* Button */}
                {
                  user ?
                  <>
                   <Link to={`/category`} className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold flex justify-center items-center gap-3 hover:scale-[1.02] transition">

                  {slide.button}

                  <FaArrowRight />

                </Link>
                  
                  </>
                   :
                   <> <Link to={`/auth/login`} className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold flex justify-center items-center gap-3 hover:scale-[1.02] transition">

                  {slide.button}

                  <FaArrowRight />

                </Link></>
                }

               


              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default Rightside;