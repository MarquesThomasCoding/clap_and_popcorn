"use client";

import MediaListPreview from "@/components/MediaListPreview";
import Image from "next/image";
import { useState, useEffect, JSX } from "react";
import { Person } from "@/types/types";
import { fetchActor } from "@/lib/fetchData";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}): JSX.Element {
  const [actor, setActor] = useState<Person | null>(null);
  const [showBiography, setShowBiography] = useState<boolean>(false);

  useEffect(() => {
    const getActor: () => void = async () => {
      const actorData: Person = await fetchActor((await params).slug);
      setActor(actorData);
    };
    getActor();
  }, [params]);

  const handleShowBiography: () => void = () => {
    setShowBiography(!showBiography);
  };

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col gap-8 m-20 p-8">
      <div className="flex items-end gap-8">
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
      </div>
      <MediaListPreview
        medias={actor.movie_credits.cast}
        type="movie"
        title="Connu pour"
      />

      {showBiography && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
          onClick={() => handleShowBiography()}
        >
          <span className="flex flex-col gap-2 w-1/2 h-1/2 overflow-y-auto rounded-md bg-zinc-900 p-8">
            <h4 className="text-xl font-bold border-b border-zinc-400 p-2">
              Biographie
            </h4>
            {actor.biography}
          </span>
        </div>
      )}
    </main>
  );
}
