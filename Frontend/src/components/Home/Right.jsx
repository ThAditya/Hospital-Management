import React from 'react';

const Left = ({ heading1, heading2, para, source, webLink, webText }) => {
  return (
    <div className="relative w-full h-150 flex flex-col items-center">
      {/* Background image with low opacity */}
      
      
      {/* Content container */}
      <div className="container relative z-10 flex justify-around items-center mt-10">
        {/* Left section with text and link */}
        <div className="flex flex-col space-y-5 ml-25">
          
          <img className="w-120" src={source} alt="Content" />
        </div>
        
        {/* Right section with image */}
        <div className='flex flex-col space-y-5 ml-25'>
          <h3>{heading1}</h3>
        <h1 className=" text-5xl w-[60%]">{heading2}</h1>
          <p className="w-150 text-justify">{para}</p>
          <a 
            href={webLink} 
            className="p-2 w-25 text-center font-bold bg-purple-900 text-amber-50 rounded-xl"
          >
            {webText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Left;