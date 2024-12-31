"use client";

import { useEffect, useState } from "react";
import MovieBanner from "@/components/MovieBanner";
import MoviesListPreview from "@/components/moviesListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie } from "@/types/types";
import LoadingMovieList from "@/components/LoadingMovieList";

export default function Page() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [frenchMovies, setFrenchMovies] = useState<Movie[]>([]);

  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState(true);
  const [loadingFrenchMovies, setLoadingFrenchMovies] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/movies?query=popular")
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoadingPopular(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/movies?query=upcoming")
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results);
        setLoadingUpcoming(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/movies?query=top_rated")
      .then((response) => response.json())
      .then((data) => {
        setTopRatedMovies(data.results);
        setLoadingTopRated(false);
      });
      
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/trending?type=movie")
    .then((response) => response.json())
    .then((data) => {
      setTrendingMovies(data.results);
      setLoadingTrendingMovies(false);
    });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/movies?origin_country=FR")
    .then((response) => response.json())
    .then((data) => {
      setFrenchMovies(data.results);
      setLoadingFrenchMovies(false);
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
        {loadingPopular ? (
            <LoadingMovieList />
        ) : (
            <MoviesListPreview movies={popularMovies.slice(1, 100)} title="Les plus populaires" />
        )}
        {loadingTrendingMovies ? (
        <LoadingMovieList />
        ) : (
        <MoviesListPreview movies={trendingMovies.slice(0, 100)} title="En tendance" />
        )}
        {loadingUpcoming ? (
            <LoadingMovieList />
        ) : (
            <MoviesListPreview movies={upcomingMovies.slice(0, 100)} title="À venir" />
        )}
        {loadingTopRated ? (
            <LoadingMovieList />
        ) : (
            <MoviesListPreview movies={topRatedMovies.slice(0, 100)} title="Le public a adoré" />
        )}
        {loadingFrenchMovies ? (
            <LoadingMovieList />
        ) : (
            <MoviesListPreview movies={frenchMovies.slice(0, 100)} title="Made in France" />
        )}
      </section>
    </div>
  );
}