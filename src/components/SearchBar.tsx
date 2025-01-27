"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, UserCircle2Icon } from "lucide-react";
import { Movie, Person, Serie } from "@/types/types";

export default function SearchBar(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<{
    person: Person[];
    movie: Movie[];
    tv: Serie[];
  }>({
    person: [],
    movie: [],
    tv: [],
  });
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 2 && !isCooldown) {
      setIsCooldown(true);
      const fetchResults: () => void = async () => {
        const response: Response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?query=${query}`
        );
        const data: {
          results: { media_type: string }[];
        } = await response.json();

        if (data && Array.isArray(data.results)) {
          const sortedResults = {
            person: data.results.filter(
              (item: { media_type: string }) => item.media_type === "person"
            ) as Person[],
            movie: data.results.filter(
              (item: { media_type: string }) => item.media_type === "movie"
            ) as Movie[],
            tv: data.results.filter(
              (item: { media_type: string }) => item.media_type === "tv"
            ) as Serie[],
          };
          setResults(sortedResults);
        } else {
          setResults({ person: [], movie: [], tv: [] });
        }
        setTimeout(() => setIsCooldown(false), 1000);
      };
      fetchResults();
    }
  }, [query]);

  const displayExtendedSearchBar: () => void = () => {
    setShowSearchBar(true);
    document.body.classList.add("overflow-hidden");
  };

  const hideExtendedSearchBar: () => void = () => {
    console.log("hideExtendedSearchBar");
    setShowSearchBar(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div>
      <div className="flex items-center px-4 w-full max-w-96 m-auto rounded-lg border-none bg-zinc-600 bg-opacity-50 backdrop-blur-sm">
        <Search
          className="w-6 h-6 text-white"
          onClick={() => displayExtendedSearchBar()}
        />
        <Input
          type="text"
          onClick={() => displayExtendedSearchBar()}
          placeholder="Rechercher..."
          className="bg-transparent text-white border-none"
        />
      </div>
      {showSearchBar && (
        <>
          <div
            className="fixed inset-0 h-screen bg-black bg-opacity-50 z-40"
            id="overlay"
            onClick={() => hideExtendedSearchBar()}
          ></div>
          <div
            className="fixed top-[25dvh] left-1/2 transform -translate-x-1/2 flex flex-col gap-2 w-full max-w-xl max-h-96 overflow-auto m-auto rounded-lg p-4 text-base bg-zinc-700 bg-opacity-50 backdrop-blur-md z-50"
            id="searchBar"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-none text-lg bg-zinc-600 bg-opacity-50 backdrop-blur-sm"
              placeholder="Rechercher..."
              autoFocus
            />
            <h4 className="text-lg">Personnes</h4>
            <ul className="flex flex-col gap-2">
              {results.person.map((person: Partial<Person>) => (
                <li key={person.id} className="w-full">
                  <Link
                    href={`/persons/${person.id}`}
                    className="flex items-center gap-2 rounded-sm px-4 hover:bg-zinc-600"
                  >
                    {person.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                        alt="Image de profil"
                        width={200}
                        height={200}
                        className="w-8 h-8 object-cover object-top rounded-full"
                      />
                    ) : (
                      <UserCircle2Icon className="w-8 h-8 text-white" />
                    )}
                    {person.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Separator className="bg-white" />
            <h4 className="text-lg">Films</h4>
            <ul className="flex flex-col gap-2">
              {results.movie.map((movie: Partial<Movie>) => (
                <li key={movie.id} className="w-full">
                  <Link
                    href={`/movies/${movie.id}`}
                    className="flex items-center gap-2 rounded-sm px-4 hover:bg-zinc-600"
                  >
                    {movie.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Separator className="bg-white" />
            <h4 className="text-lg">Séries</h4>
            <ul className="flex flex-col gap-2">
              {results.tv.map((tv: Partial<Serie>) => (
                <li key={tv.id} className="w-full">
                  <Link
                    href={`/tv/${tv.id}`}
                    className="flex items-center gap-2 rounded-sm px-4 hover:bg-zinc-600"
                  >
                    {tv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
