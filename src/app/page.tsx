"use client";

import { useEffect, useState } from "react";
import MediaBanner from "@/components/MediaBanner";
import AllListPreview from "@/components/AllListPreview";
import MediaListPreview from "@/components/MediaListPreview";
import PersonsListPreview from "@/components/PersonsListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie, Serie, Person } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";

export default function Home() {
  const [trendingAll, setTrendingAll] = useState<(Movie | Serie | Person)[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<Serie[]>([]);
  const [trendingPersons, setTrendingPersons] = useState<Person[]>([]);
  const [loadingTrendingAll, setLoadingTrendingAll] = useState<boolean>(true);
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState<boolean>(true);
  const [loadingTrendingTV, setLoadingTrendingTV] = useState<boolean>(true);
  const [loadingTrendingPersons, setLoadingTrendingPersons] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrendingAll = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=all");
      const data: { results: (Movie | Serie | Person)[] } = await response.json();
      setTrendingAll(data.results);
      setLoadingTrendingAll(false);
    };
      
    const fetchTrendingMovies = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=movie");
      const data: { results: Movie[] } = await response.json();
      setTrendingMovies(data.results);
      setLoadingTrendingMovies(false);
    };

    const fetchTrendingTV = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=tv");
      const data: { results: Serie[] } = await response.json();
      setTrendingTV(data.results);
      setLoadingTrendingTV(false);
    };

    const fetchTrendingPersons = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/person?query=popular");
      const data: { results: Person[] } = await response.json();
      setTrendingPersons(data.results);
      setLoadingTrendingPersons(false);
    };
    
    fetchTrendingAll();
    fetchTrendingMovies();
    fetchTrendingTV();
    fetchTrendingPersons();
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingTrendingMovies ? (
      <LoadingBanner />
      ) : (
      trendingMovies.length > 0 && <MediaBanner media={trendingMovies[0]} type="movie" />
      )}
      <section className="ml-20 flex flex-col gap-16">
      {loadingTrendingAll ? (
        <LoadingMediaList />
      ) : (
        <AllListPreview elements={trendingAll.slice(0, 100)} title="Tendance" />
      )}
      {loadingTrendingMovies ? (
        <LoadingMediaList />
      ) : (
        <MediaListPreview medias={trendingMovies.slice(0, 100)} type="movie" title="Films tendance" />
      )}
      {loadingTrendingTV ? (
        <LoadingMediaList />
      ) : (
        <MediaListPreview medias={trendingTV.slice(0, 100)} type="serie" title="Séries tendance" />
      )}
      {loadingTrendingPersons ? (
        <LoadingMediaList />
      ) : (
        <PersonsListPreview persons={trendingPersons.slice(0, 100)} title="Personnalités tendance" />
      )}
      </section>
    </div>
  );
}