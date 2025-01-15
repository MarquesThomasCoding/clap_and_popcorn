// components/SeeAndShareButtons.tsx
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Eye, EyeClosed, Share2 } from "lucide-react";
import { Movie } from "@/types/types";
import ShareButtons from "./ShareButtons"; // Import the ShareButtons component
import { addSeenMedia, checkMovieInSeenList } from "@/lib/utils";

export default function SeeAndShareButtons({ movie, type }: { movie: Movie, type: "movie" | "serie" }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSeen, setIsSeen] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const checkSeen = async () => {
        const isSeen = await checkMovieInSeenList(movie.id);
        setIsSeen(isSeen);
      };
      checkSeen();
    }
  }, [user, movie.id]);

  const handleAddSeenMedia = () => {
    addSeenMedia(movie, type);
    setIsSeen(true);
  }

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
              <Eye onClick={() => handleAddSeenMedia()} className="w-8 h-8" />
              Vu
            </button>
          )}
          <button className="flex flex-col items-center" onClick={handleShareClick}>
            <Share2 className="w-8 h-8" />
            Partager
          </button>
          {showShareButtons && <ShareButtons url={window.location.href} title={movie.title} />}
        </>
      )}
    </div>
  );
}
