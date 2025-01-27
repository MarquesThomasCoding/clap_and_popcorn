"use client";

import Link from "next/link";
import { Info, Play, Eye } from "lucide-react";
import TeaserPlayer from "./TeaserPlayer";
import { Movie, Serie } from "@/types/types";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { addToSeeMedia } from "@/lib/utils";
import { JSX, useEffect, useState } from "react";

interface MediaBannerProps {
  media: Movie | Serie;
  isMediaPage?: boolean;
  type: "movie" | "serie";
}

export default function MediaBanner({
  media,
  isMediaPage,
  type,
}: MediaBannerProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [showOverview, setShowOverview] = useState<boolean>(false);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleShowTeaser: () => void = () => {
    setShowTeaser(!showTeaser);
  };

  const handleShowOverview = () => {
    setShowOverview(!showOverview);
  };

  const handleAddToSeeMedia = () => {
    addToSeeMedia(media, type);
  };

  return (
    <div
      className={`
            relative ${!isMediaPage ? "-mb-28" : ""}
            w-full h-screen
            [background-size:cover]
            [background-position:top]
            [background-repeat:no-repeat]
            bg-fixed
            `}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${media.backdrop_path})`,
      }}
    >
      <div
        className={`absolute inset-0 flex flex-col justify-end gap-8 p-8 ${
          isMediaPage ? "" : "pb-40"
        }`}
        style={{ background: "linear-gradient(360deg, black, transparent)" }}
      >
        <h2 className="text-6xl font-bold mx-20 mb-2">
          {type === "movie" ? (media as Movie).title : (media as Serie).name}
        </h2>
        <p className="mx-20 text-lg max-w-96">
          {media.overview.slice(0, 300)}...
          <button
            onClick={() => handleShowOverview()}
            className="text-white underline"
          >
            Voir plus
          </button>
        </p>
        <div className="flex gap-4 mx-20">
          {isMediaPage && (
            <button
              onClick={() => handleShowTeaser()}
              className={
                "flex items-center gap-2 rounded-lg px-8 py-3 bg-[#F7CC23] text-black"
              }
            >
              <Play />
              Bande annonce
            </button>
          )}
          {!isMediaPage && (
            <Link
              href={`${
                type === "movie" ? "movies/" + media.id : "tv/" + media.id
              }`}
              className={
                "flex items-center gap-2 rounded-lg px-8 py-3 bg-white bg-opacity-30 backdrop-blur-sm"
              }
            >
              <Info />
              Découvrir
            </Link>
          )}
          {isMediaPage && user && (
            <button
              onClick={() => handleAddToSeeMedia()}
              className={
                "flex items-center gap-2 rounded-lg px-8 py-3 bg-white bg-opacity-30 backdrop-blur-sm"
              }
            >
              <Eye />
              Je veux le voir
            </button>
          )}
        </div>
        {isMediaPage && (
          <>
            <div className="flex gap-2 mx-20">
              {media.genres.map((genre: { id: number; name: string }) => (
                <span
                  key={genre.id}
                  className="rounded-sm px-2 bg-black bg-opacity-30 backdrop-blur-sm"
                >
                  {genre.name}
                </span>
              ))}
              {type === "movie" && (
                <span className="ml-4">
                  {Math.floor((media as Movie).runtime / 60)}h{" "}
                  {(media as Movie).runtime % 60}min
                </span>
              )}
            </div>
            <div className="flex gap-2 mx-20">
              <span className="rounded-sm px-2 bg-black bg-opacity-30 backdrop-blur-sm">
                {"le " +
                  new Date(
                    type === "movie"
                      ? (media as Movie).release_date
                      : (media as Serie).first_air_date
                  ).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
              </span>
              {media.origin_country.map((country: string) => (
                <span key={country}>{country}</span>
              ))}
            </div>
            <div className="flex items-center mx-20">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${
                    index < Math.round(media.vote_average / 2)
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
              <span className="ml-2 text-sm">
                {media.vote_average.toFixed(1)} ({media.vote_count} votes)
              </span>
            </div>
            {media.videos.results.filter(
              (video: { type: string }) => video.type === "Trailer"
            )[0] &&
              showTeaser && (
                <TeaserPlayer
                  videoId={
                    media.videos.results.filter(
                      (video: { type: string }) => video.type === "Trailer"
                    )[0].key
                  }
                />
              )}
          </>
        )}
      </div>
      {showOverview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={() => handleShowOverview()}
        >
          <span className="flex flex-col gap-2 w-1/2 h-1/2 overflow-y-auto rounded-md bg-zinc-900 p-8">
            <h4 className="text-xl font-bold border-b border-zinc-400 p-2">
              Synopsis
            </h4>
            {media.overview}
          </span>
        </div>
      )}
    </div>
  );
}
