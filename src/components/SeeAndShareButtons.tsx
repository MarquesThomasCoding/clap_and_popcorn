// components/SeeAndShareButtons.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { Eye, EyeClosed, Share2 } from "lucide-react";
import { Movie, Serie } from "@/types/types";
import ShareButtons from "./ShareButtons"; // Import the ShareButtons component
import { addSeenMedia, checkMediaInSeenList } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function SeeAndShareButtons({
  media,
  type,
}: {
  media: Movie | Serie;
  type: "movie" | "serie";
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isSeen, setIsSeen] = useState<boolean>(false);
  const [showShareButtons, setShowShareButtons] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const checkSeen = async () => {
        const isSeen = await checkMediaInSeenList(media.id, type);
        setIsSeen(isSeen);
      };
      checkSeen();
    }
  }, [user, media.id, type]);

  const handleAddSeenMedia = () => {
    addSeenMedia(media, type).then((data: { success: boolean; message: string }) => {
      if (data?.success) {
        toast({
          title: "Média ajouté",
          description: `${
            type === "movie" ? (media as Movie).title : (media as Serie).name
          } a été ajouté à votre liste`,
        });
      } else {
        toast({
          title: "Erreur",
          description: data?.message,
          variant: "destructive",
        });
      }
    });
    setIsSeen(!isSeen);
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
              <Eye onClick={() => handleAddSeenMedia()} className="w-8 h-8" />
              Vu
            </button>
          )}
          <button
            className="flex flex-col items-center"
            onClick={handleShareClick}
          >
            <Share2 className="w-8 h-8" />
            Partager
          </button>
          {showShareButtons && (
            <ShareButtons url={window.location.href} title={type === 'movie' ? (media as Movie).title : (media as Serie).name} />
          )}
        </>
      )}
    </div>
  );
}
