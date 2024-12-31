"use client";

import { useEffect, useState } from "react";
import MovieBanner from "@/components/MovieBanner";
import AllListPreview from "@/components/AllListPreview";
import MoviesListPreview from "@/components/moviesListPreview";
import SeriesListPreview from "@/components/SeriesListPreview";
import PersonsListPreview from "@/components/PersonsListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie, Serie, Person } from "@/types/types";
import LoadingMovieList from "@/components/LoadingMovieList";

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
      trendingMovies.length > 0 && <MovieBanner movie={trendingMovies[0]} />
      )}
      <section className="ml-20 flex flex-col gap-16">
      {loadingTrendingAll ? (
        <LoadingMovieList />
      ) : (
        <AllListPreview elements={trendingAll.slice(0, 100)} title="Tendance" />
      )}
      {loadingTrendingMovies ? (
        <LoadingMovieList />
      ) : (
        <MoviesListPreview movies={trendingMovies.slice(0, 100)} title="Films tendance" />
      )}
      {loadingTrendingTV ? (
        <LoadingMovieList />
      ) : (
        <SeriesListPreview series={trendingTV.slice(0, 100)} title="Séries tendance" />
      )}
      {loadingTrendingPersons ? (
        <LoadingMovieList />
      ) : (
        <PersonsListPreview persons={trendingPersons.slice(0, 100)} title="Personnalités tendance" />
      )}
      </section>
    </div>
  );
}