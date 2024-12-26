"use client";

import { useEffect, useState } from "react";
import MovieBanner from "@/components/MovieBanner";
import Loader from "@/components/Loader";
import MoviesListPreview from "@/components/moviesListPreview";

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  useEffect(() => {
    fetch("/api/movies?query=popular")
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
        setLoadingPopular(false);
      });

    fetch("/api/movies?query=upcoming")
      .then((response) => response.json())
      .then((data) => {
        setUpcomingMovies(data.results);
        setLoadingUpcoming(false);
      });

    fetch("/api/movies?query=top_rated")
      .then((response) => response.json())
      .then((data) => {
        setTopRatedMovies(data.results);
        setLoadingTopRated(false);
      });
  }, []);

  return (
    <div className="min-h-screen text-white">
      {popularMovies.length > 0 && <MovieBanner movie={popularMovies[0]} />}
      <section className="ml-20 flex flex-col gap-16">
        {loadingPopular ? (
          <Loader message="Chargement des films populaires..." />
        ) : (
          <MoviesListPreview movies={popularMovies.slice(1, 10)} title="Les plus populaires" />
        )}
        {loadingUpcoming ? (
          <Loader message="Chargement des films à venir..." />
        ) : (
          <MoviesListPreview movies={upcomingMovies.slice(0, 10)} title="À venir" />
        )}
        {loadingTopRated ? (
          <Loader message="Chargement des films mieux notés..." />
        ) : (
          <MoviesListPreview movies={topRatedMovies.slice(0, 10)} title="Le public a adoré" />
        )}
      </section>
    </div>
  );
}