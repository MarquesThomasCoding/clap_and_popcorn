"use client";

import MoviesListPreview from "@/components/moviesListPreview";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Person } from "@/types/types";

export default function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {

    const [actor, setActor] = useState<Person | null>(null);

    useEffect(() => {
        const fetchActor = async () => {
            const slug = (await params).slug;
            const actorData = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/person?id=${slug}`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
            setActor(actorData);
        };
        fetchActor();
    }, [params]);

    const showBiography = () => {
        const biography = document.getElementById("biography");
        biography?.classList.toggle("hidden");
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
                        {actor.biography.substring(0, 500)}...
                        <button onClick={() => showBiography()} className="text-white underline">
                            Voir plus
                        </button>
                    </p>
                </div>
            </div>
            <MoviesListPreview movies={actor.movie_credits.cast} title="Connu pour" />

            <div id="biography" className="hidden fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center" onClick={() => showBiography()}>
                <span className="flex flex-col gap-2 w-1/2 h-1/2 overflow-y-auto rounded-md bg-zinc-900 p-8">
                    <h4 className="text-xl font-bold border-b border-zinc-400 p-2">Biographie</h4>
                    {actor.biography}
                </span>
            </div>
        </main>
    )
}