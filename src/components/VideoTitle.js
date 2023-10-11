import React from "react";

const VideoTitle = (props) => {
  const { title, overview } = props;
  return (
    <div className="absolute px-12 pt-[25%] text-white bg-gradient-to-r from-black right-0 w-screen aspect-video">
      <div className="relative w-1/3">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="text-lg">{overview}</p>
        <div className="flex justify-start items-center my-5">
          <button className="pointer px-6 py-2 rounded-lg bg-white text-black text-xl hover:bg-opacity-80">
            ▶️Play
          </button>
          <button className="pointer mx-3 px-6 py-2 rounded-lg  bg-gray-500 text-white text-xl bg-opacity-50 hover:bg-opacity-80">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
