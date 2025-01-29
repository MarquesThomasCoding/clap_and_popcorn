"use client";

import { useEffect, useState } from "react";
import MediaBanner from "@/components/MediaBanner";
import AllListPreview from "@/components/AllListPreview";
import MediaListPreview from "@/components/MediaListPreview";
import PersonsListPreview from "@/components/PersonsListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie, Serie, Person } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";
import { fetchTrendingAll, fetchTrendingMovies, fetchTrendingPersons, fetchTrendingTV } from "@/lib/fetchData";

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
    const getTrendingAll = async (): Promise<void> => {
      const data: (Movie | Serie | Person)[] = await fetchTrendingAll();
      setTrendingAll(data);
      setLoadingTrendingAll(false);
    };
      
    const getTrendingMovies = async (): Promise<void> => {
      const data: Movie[] = await fetchTrendingMovies();
      setTrendingMovies(data);
      setLoadingTrendingMovies(false);
    }

    const getTrendingTV = async (): Promise<void> => {
      const data: Serie[] = await fetchTrendingTV();
      setTrendingTV(data);
      setLoadingTrendingTV(false);
    };

    const getTrendingPersons = async (): Promise<void> => {
      const data: Person[] = await fetchTrendingPersons();
      setTrendingPersons(data);
      setLoadingTrendingPersons(false);
    };
    
    getTrendingAll();
    getTrendingMovies();
    getTrendingTV();
    getTrendingPersons();
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingTrendingMovies ? (
      <LoadingBanner />
      ) : (
      trendingMovies.length > 0 && <MediaBanner media={trendingMovies[0]} type="movie" />
      )}
      <section className="ml-5 lg:ml-20 flex flex-col gap-16">
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