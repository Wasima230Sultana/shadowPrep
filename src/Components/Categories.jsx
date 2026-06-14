import React from "react";
import {
  FaReact,
  FaServer,
  FaLayerGroup,
  FaMobileAlt,
  FaPaintBrush,
  FaChartBar,
  FaDatabase,
  FaRobot,
  FaBrain,
  FaInfinity,
  FaCloud,
  FaShieldAlt,
  FaBug,
  FaBriefcase,
  FaBusinessTime,
  FaCode,
  FaJava,
  FaPython,
  FaMobile,
} from "react-icons/fa";
import { Link } from "react-router";

const iconMap = {
  FaReact,
  FaServer,
  FaLayerGroup,
  FaMobileAlt,
  FaPaintBrush,
  FaChartBar,
  FaDatabase,
  FaRobot,
  FaBrain,
  FaInfinity,
  FaCloud,
  FaShieldAlt,
  FaBug,
  FaBriefcase,
  FaBusinessTime,
  FaCode,
  FaJava,
  FaPython,
  FaMobile,
};

const Categories = ({ cat }) => {
  const {
    id,
    title,
    icon,
    questions,
    difficulty,
    description,
    color,
    rating,
    badge,
    duration,
  } = cat;

  const IconComponent = iconMap[icon];

  return (
    <div className="relative bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 p-2">
      
      {/* Badge */}
      {badge && (
        <span className="absolute top-2 right-3 px-2 py-1 text-xs font-medium rounded-full bg-[#8b5cf6] text-white">
          {badge}
        </span>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 ">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          {IconComponent && <IconComponent size={28} />}
        </div>

        <div>
          <h2 className="font-bold text-sm md:text-lg text-white mt-4">
            {title}
          </h2>

          <p className="text-sm text-gray-400">
            {questions} Questions
          </p>
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex flex-wrap gap-2 mt-4">
        {difficulty.map((level, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
          >
            {level}
          </span>
        ))}
      </div>
<Link to={`/category/${id}`} className="inline-block mt-6 text-sm font-medium text-[#8b5cf6] hover:underline border-2 border-[#8b5cf6] px-3 py-1 rounded-full transition-colors duration-300">
  View Details →
</Link>
    </div>
  );
};

export default Categories;