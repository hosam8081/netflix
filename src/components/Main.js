import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../requestes";
const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)]

  const fetchData = async () => {
    await axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(movie);
  return (
    <div className="w-full h-[550px] text-white">
      <div className="absolute w-full h-[600px] bg-gradient-to-r from-black"></div>
      <div className="w-full h-full block">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        />
      </div>
      <div className="absolute w-full top-[20%] p-4 md:8">
        <button className="border py-2 px-5 bg-gray-300 border-gray-300 text-black mb-5 mr-4">
          Play
        </button>
        <button className="border py-2 px-5 border-gray-300 text-white">
          Watch Later
        </button>
        <p className="text-gray-400 text-sm">{movie?.title}</p>
        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
          {truncateString(movie?.overview, 150)}
        </p>
      </div>
    </div>
  );
};

export default Main;
