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
  const [loadingTrendingAll, setLoadingTrendingAll] = useState(true);
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState(true);
  const [loadingTrendingTV, setLoadingTrendingTV] = useState(true);
  const [loadingTrendingPersons, setLoadingTrendingPersons] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=all")
    .then((response) => response.json())
    .then((data) => {
      setTrendingAll(data.results);
      setLoadingTrendingAll(false);
    });
      
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=movie")
    .then((response) => response.json())
    .then((data) => {
      setTrendingMovies(data.results);
      setLoadingTrendingMovies(false);
    });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=tv")
    .then((response) => response.json())
    .then((data) => {
      setTrendingTV(data.results);
      setLoadingTrendingTV(false);
    });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/person?query=popular")
    .then((response) => response.json())
    .then((data) => {
      setTrendingPersons(data.results);
      setLoadingTrendingPersons(false);
    });
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