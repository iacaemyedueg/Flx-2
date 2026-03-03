import React from 'react';

export const MusicBanner = () => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <div className="bg-black rounded-sm p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="flex-1 z-10">
          <span className="text-[#00FF66] font-semibold mb-4 block">Categories</span>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
            Enhance Your <br /> Music Experience
          </h2>
          
          <div className="flex gap-4 mb-8">
            <div className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="font-bold text-sm">23</span>
              <span className="text-[10px] font-medium">Hours</span>
            </div>
            <div className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="font-bold text-sm">05</span>
              <span className="text-[10px] font-medium">Days</span>
            </div>
            <div className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="font-bold text-sm">59</span>
              <span className="text-[10px] font-medium">Minutes</span>
            </div>
            <div className="bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center">
              <span className="font-bold text-sm">35</span>
              <span className="text-[10px] font-medium">Seconds</span>
            </div>
          </div>

          <button className="bg-[#00FF66] text-white px-10 py-3 rounded-sm font-medium hover:bg-[#00cc52] transition-colors">
            Buy Now!
          </button>
        </div>

        <div className="flex-1 relative z-10 flex justify-center">
           {/* Glow effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 blur-[100px] rounded-full"></div>
           <img 
             src="https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SX679_.jpg" 
             alt="JBL Speaker" 
             className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl"
           />
        </div>
      </div>
    </section>
  );
};
