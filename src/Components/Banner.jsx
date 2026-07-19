import Leftside from "./Leftside";
import Rightside from "./Rightside";

const Banner = () => {
  return (
    <div className="bg-[#0f172a] text-white overflow-hidden ">

      <h1 className="text-3xl md:text-4xl font-extrabold text-center my-5">
        Practice. Prepare.
        <span className="text-[#8b5cf6]"> Ace.</span>
      </h1>

      {/* Top Marquee */}
      <marquee speed={50} className="border-b border-purple-500 py-2">
        <span className="mx-8">🚀 5000+ Problems</span>
        <span className="mx-8">💻 Mock Interviews</span>
        <span className="mx-8">📚 DSA Roadmaps</span>
        <span className="mx-8">🏆 Weekly Contests</span>
        <span className="mx-8">🎯 Track Progress</span>
      </marquee>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 px-4 md:px-20">
        <div>
          <Leftside></Leftside>
        </div>
        <div>
          <Rightside></Rightside>
        </div>




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

