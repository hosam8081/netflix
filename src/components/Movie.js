import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { auth, db } from "../firebase";
import {
  arrayUnion,
  doc,
  updateDoc,
  arrayRemove,
  collection,
  addDoc,
} from "firebase/firestore";
import { useGlobalContext } from "../context/AuthContext";
const Movie = ({ movie }) => {
  const { userData } = useGlobalContext();
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(true);
  const washingtonRef = doc(db, "users", userData?.email);
  let addMovie = async () => {
    if (userData?.email) {
      setLike(!like);
      setSaved(true);

      const movieID = doc(db, "users", userData?.email);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("please log in");
    }
  };
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {movie?.title}
        </p>
        <p onClick={addMovie}>
          {like ? (
            <FaHeart className='absolute top-4 left-4 text-gray-300' />
          ) : (
            <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
