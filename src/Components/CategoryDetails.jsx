import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
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

 const CategoryDetails = () => {

    const {id} = useParams();
    const data = useLoaderData();
    const [category,setCategory] = useState({})
    useEffect(()=>{
        const details = data.find(cat=>cat.id === parseInt(id));
        setCategory(details);
    },[id,data])
      const IconComponent = iconMap[category.icon];

    return (
//         <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-sm overflow-hidden">
//             <div
//           className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
//           style={{ backgroundColor: category.color }}
//         >
//           {IconComponent && <IconComponent size={28} />}
//         </div>

//         <div>
//           <h2 className="font-bold text-lg text-white">
//             {category.title}
//           </h2>

//           <p className="text-sm text-gray-400">
//             {category.questions} Questions
//           </p>
//         </div>

//       {/* Description */}
//       <p className="mt-4 text-gray-300 text-sm leading-relaxed">
//         {category.description}
//       </p>

//       {/* Difficulty */}
//       <div className="flex flex-wrap gap-2 mt-4">
//        {category.difficulty?.map((level, index) => (
//   <span
//     key={index}
//     className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
//   >
//     {level}
//   </span>
// ))}
//       </div>

//       {/* Footer */}
//       <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/10 text-sm">
//         <span className="text-yellow-400">
//           ⭐ {category.rating}
//         </span>

//         <span className="text-gray-400">
//           ⏱ {category.duration}
//         </span>
//       </div>
//         </div>
<div className="max-w-4xl mx-auto px-4 py-10">
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl">

    {/* Header */}
    <div
      className="p-8 text-white"
      style={{ backgroundColor: category.color }}
    >
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
          {IconComponent && <IconComponent size={40} />}
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            {category.title}
          </h1>

          <p className="mt-2 opacity-90">
            {category.description}
          </p>
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="p-8">

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-slate-100 p-4 rounded-xl text-center">
          <h3 className="font-bold text-xl">
            {category.questions}
          </h3>
          <p className="text-gray-500 text-sm">
            Questions
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl text-center">
          <h3 className="font-bold text-xl">
            ⭐ {category.rating}
          </h3>
          <p className="text-gray-500 text-sm">
            Rating
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl text-center">
          <h3 className="font-bold text-xl">
            {category.duration}
          </h3>
          <p className="text-gray-500 text-sm">
            Duration
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl text-center">
          <h3 className="font-bold text-xl">
            {category.level}
          </h3>
          <p className="text-gray-500 text-sm">
            Level
          </p>
        </div>

      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Required Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {category.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          Difficulty Levels
        </h2>

        <div className="flex gap-3">
          {category.difficulty?.map((level, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-lg bg-gray-100"
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
        style={{ backgroundColor: category.color }}
      >
        Start DevOps Interview Practice →
      </button>

    </div>
  </div>
</div>
    );
};

export default CategoryDetails;