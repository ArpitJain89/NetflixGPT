import React, { useEffect } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* <div className="mainContainer">
        <div className="videoContainer"></div>
        <div className="videoTitle"></div>
      </div>
      <div className="secondCOntainer">
        <div className="movieList">
          <div className="cards"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Browse;
