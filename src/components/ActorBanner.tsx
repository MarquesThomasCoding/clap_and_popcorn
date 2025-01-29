"use client";

import { JSX, useState } from "react";
import { Person } from "@/types/types";
import Image from "next/image";

export default function ActorBanner(actor: Person): JSX.Element {
  const [showBiography, setShowBiography] = useState<boolean>(false);

  const handleShowBiography: () => void = () => {
    setShowBiography(!showBiography);
  };

  return (
    <>
      <header className="flex flex-col lg:flex-row items-end gap-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          width={200}
          height={200}
          className="rounded-full"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{actor.name}</h1>
          <p className="text-muted-foreground">
            {actor.biography.slice(0, 500)}...
            <button
              onClick={() => handleShowBiography()}
              className="text-white underline"
            >
              Voir plus
            </button>
          </p>
        </div>
      </header>
      {showBiography && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={() => handleShowBiography()}
        >
          <span className="flex flex-col gap-2 lg:w-1/2 h-1/2 overflow-y-auto rounded-md bg-zinc-900 p-8">
            <h4 className="text-xl font-bold border-b border-zinc-400 p-2">
              Biographie
            </h4>
            {actor.biography}
          </span>
        </div>
      )}
    </>
  );
}
