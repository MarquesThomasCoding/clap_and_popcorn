"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { Eye, EyeClosed, Share2 } from "lucide-react";
import { Movie } from "@/types/types";

const checkMovieInSeenList = async (userId: string, movieId: number) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    const seenMovies = userData.seen_movies || [];
    return seenMovies.some((movie: Movie) => movie.id === movieId);
  } else {
    return false;
  }
};

export default function SeeAndShareButtons({ movie }: { movie: Movie }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSeen, setIsSeen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const checkSeen = async () => {
        const isSeen = await checkMovieInSeenList(user.uid, movie.id);
        setIsSeen(isSeen);
      };
      checkSeen();
    }
  }, [user, movie.id]);

const handleAddSeen = async (movie: Movie) => {
    const movieSeen = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview,
    };
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const seenMovies = userData.seen_movies || [];
            const movieIndex = seenMovies.findIndex((m: Movie) => m.id === movie.id);
            if (movieIndex > -1) {
                // Movie is already in the list, remove it
                seenMovies.splice(movieIndex, 1);
                await updateDoc(userRef, {
                    seen_movies: seenMovies,
                });
                setIsSeen(false);
            } else {
                // Movie is not in the list, add it
                await updateDoc(userRef, {
                    seen_movies: arrayUnion(movieSeen),
                });
                setIsSeen(true);
            }
        }
    }
  };

  return (
    <div className="flex gap-8 items-end">
      {user && (
        <>
          {isSeen ? (
            <button className="flex flex-col items-center">
              <EyeClosed onClick={() => handleAddSeen(movie)} className="w-8 h-8" />
              Pas vu
            </button>
          ) : (
            <button className="flex flex-col items-center">
              <Eye onClick={() => handleAddSeen(movie)} className="w-8 h-8" />
              Vu
            </button>
          )}
          <button className="flex flex-col items-center">
            <Share2 className="w-8 h-8" />
            Partager
          </button>
        </>
      )}
    </div>
  );
}
