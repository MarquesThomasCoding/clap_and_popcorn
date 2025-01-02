// components/SeeAndShareButtons.tsx
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { Eye, EyeClosed, Share2 } from "lucide-react";
import { Movie } from "@/types/types";
import ShareButtons from "./ShareButtons"; // Import the ShareButtons component

// Function to check if a movie is in the user's seen list
const checkMovieInSeenList = async (userId: string, movieId: number) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    const seenMovies = userData.seen_movies || [];
    return seenMovies.some((movie: Movie) => movie.id === movieId);
  } else {
    return false; // Movie ID not found in seen_movies list
  }
};

export default function SeeAndShareButtons({ movie }: { movie: Movie }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSeen, setIsSeen] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false); // State to control visibility of ShareButtons

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      // Check if the movie is already in the user's 'seen_movies' list from Firestore
      const checkSeen = async () => {
        const isSeen = await checkMovieInSeenList(user.uid, movie.id);
        setIsSeen(isSeen);
      };
      checkSeen();
    }
  }, [user, movie.id]);

  const handleAddSeen = (movie: Movie) => {
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
      updateDoc(userRef, {
        seen_movies: arrayUnion(movieSeen),
      })
        .then(() => {
          console.log("Movie added to 'to_see' list");
        })
        .catch((error) => {
          console.error("Error adding movie to 'to_see' list: ", error);
        });
      setIsSeen(true);
    } else {
      console.log("User not logged in");
    }
  };

  const handleShareClick = () => {
    document.body.classList.toggle("overflow-hidden");
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className="flex gap-8 items-end">
      {user && (
        <>
          {isSeen ? (
            <button className="flex flex-col items-center">
              <EyeClosed className="w-8 h-8" />
              Pas vu
            </button>
          ) : (
            <button className="flex flex-col items-center">
              <Eye onClick={() => handleAddSeen(movie)} className="w-8 h-8" />
              Vu
            </button>
          )}
          <button className="flex flex-col items-center" onClick={handleShareClick}>
            <Share2 className="w-8 h-8" />
            Partager
          </button>
          {showShareButtons && <ShareButtons url={window.location.href} title={movie.title} />} {/* Conditionally render ShareButtons */}
        </>
      )}
    </div>
  );
}
