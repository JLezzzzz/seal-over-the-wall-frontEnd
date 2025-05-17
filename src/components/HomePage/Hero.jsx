
import animation from "/assets/images/videos/hero-section_1920x900.mp4";
import { Link } from 'react-router-dom'; // ✅ FIXED IMPORT


const Hero = () => {
  return (
    <div className="w-full h-[900px] relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={animation}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10  text-white h-[576px] w-400 mx-auto">
        <div className="mt-40 max-w-xl p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 shadow-xl ">
          <h2 className="text-5xl font-bold">Create Collect & Express</h2>
          <p className="text-2xl mt-2">Make your own design in just a few clicks</p>
          <Link to="/create">
            <button className="text-xl bg-[#334DD8] px-8 py-2 rounded-full mt-4 transform duration-300 hover:scale-110 hover:bg-blue-600 active:scale-75 transition-transform cursor-pointer">
              Let’s Create
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
