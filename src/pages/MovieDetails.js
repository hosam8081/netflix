import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Row from "../components/Row";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const apiMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US`;
  const similar = `
  https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1`;
  const vedioMovie = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US`;


  let fetchMovie = async () => {
    setLoading(true);
    try {
      await axios.get(apiMovie).then((res) => {
        setMovie(res.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="center">
        <Loading />
      </div>
    );
  }
  return (
    <div className="px-4 py-24">
      <div className="md:flex justify-between md:space-x-8">
        <div className="md:w-4/12 mb-5">
          <img
            className="h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          />
        </div>
        <div className="md:w-8/12 text-gray-100 mb-5">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-3xl md:text-4xl">{movie.title}</h1>
            <span className=" flex justify-between items-center">
              <span className="inline-block pr-1">{movie.vote_average}</span>
              {<FaStar />}
            </span>
          </div>
          <div className="flex items-center text-gray-500 mb-5">
            <span className="pr-4">2018 </span>
            <span className="pr-4">|</span>
            <span className="pr-8">2 h 3min</span>
            <span className="pr-4">|</span>
            <span className="pr-8">16+</span>
          </div>
          <div className="mb-3">
            <p className="text-xl md:text-2xl mb-3">Overview</p>
            <p className="text-gray-400">{movie.overview}</p>
          </div>
          <div>
            <div className="flex mb-3">
              <span className="w-36 text-gray-500 font-bold">vote</span>
              <span>{movie.vote_count}</span>
            </div>
            <div className="flex mb-3">
              <span className="w-36 text-gray-500 font-bold">tagline</span>
              <span>{movie.tagline}</span>
            </div>
            <div className="flex mb-3">
              <span className="w-36 text-gray-500 font-bold">geners</span>
              {movie?.genres?.map((genere, index) => {
                return (
                  <span className="pr-2" key={index}>
                    {genere.name},
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Row rowID="6" title="simillar Movies" fetchUrl={similar} />
    </div>
  );
};

export default MovieDetails;
