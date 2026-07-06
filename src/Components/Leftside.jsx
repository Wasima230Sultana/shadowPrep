import React from "react";
import {
  FaCode,
  FaCheckCircle,
  FaLaptopCode,
  FaChartLine,
  FaFire,
} from "react-icons/fa";

const Leftside = () => {
  return (
    <div className="relative py-2">

      {/* Glow Effect */}
      <div className="absolute -top-10 -left-10 w-44 h-45 bg-violet-600/20 blur-3xl rounded-full"></div>

      <div className="relative bg-[#111827] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-slate-700">

          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            coding-terminal
          </span>
        </div>

        {/* Terminal */}
        <div className="p-6 font-mono">

          <p className="text-green-400">
            $ npm run practice
          </p>

          <div className="mt-5 space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-400" />
              <span className="text-slate-300">
                Solving Array Problems...
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaLaptopCode className="text-blue-400" />
              <span className="text-slate-300">
                Mock Interview Ready
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCode className="text-purple-400" />
              <span className="text-slate-300">
                Building Portfolio Projects
              </span>
            </div>

          </div>

          {/* Progress */}

          <div className="mt-8">

            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">
                Overall Progress
              </span>

              <span className="text-green-400 font-semibold">
                87%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-violet-500"
                style={{ width: "87%" }}
              />

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-3 mt-8">

            <div className="bg-slate-800 rounded-xl p-4 text-center">

              <FaFire className="mx-auto text-orange-400 mb-2 text-xl" />

              <h2 className="text-xl font-bold text-white">
                120+
              </h2>

              <p className="text-xs text-slate-400">
                Problems
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-4 text-center">

              <FaChartLine className="mx-auto text-cyan-400 mb-2 text-xl" />

              <h2 className="text-xl font-bold text-white">
                35
              </h2>

              <p className="text-xs text-slate-400">
                Projects
              </p>

            </div>

            <div className="bg-slate-800 rounded-xl p-4 text-center">

              <FaLaptopCode className="mx-auto text-violet-400 mb-2 text-xl" />

              <h2 className="text-xl font-bold text-white">
                10
              </h2>

              <p className="text-xs text-slate-400">
                Interviews
              </p>

            </div>

          </div>

          {/* Quote */}

          <div className="mt-8 border-l-4 border-violet-500 pl-4">

            <p className="text-slate-300 italic">
              "Practice every day. Small improvements lead to big success."
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Leftside;