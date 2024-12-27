"use client";

import { useEffect, useState } from "react";
import MovieBanner from "@/components/MovieBanner";
import MoviesListPreview from "@/components/moviesListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie } from "@/types/types";
import LoadingMovieList from "@/components/LoadingMovieList";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/movies?query=popular")
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoadingPopular(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/movies?query=upcoming")
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results);
        setLoadingUpcoming(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/api/movies?query=top_rated")
      .then((response) => response.json())
      .then((data) => {
        setTopRatedMovies(data.results);
        setLoadingTopRated(false);
      });
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingPopular ? (
      <LoadingBanner />
      ) : (
      popularMovies.length > 0 && <MovieBanner movie={popularMovies[0]} />
      )}
      <section className="ml-20 flex flex-col gap-16">
      {loadingPopular ? (
        <LoadingMovieList />
      ) : (
        <MoviesListPreview movies={popularMovies.slice(1, 100)} title="Les plus populaires" />
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
      </section>
    </div>
  );
}