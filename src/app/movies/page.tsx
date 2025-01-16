"use client";

import { useEffect, useState } from "react";
import MediaBanner from "@/components/MediaBanner";
import MediaListPreview from "@/components/MediaListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";

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
          trendingMovies.length > 0 && <MediaBanner media={trendingMovies[0]} type="movie" />
        )}
        <section className="ml-20 flex flex-col gap-16">
        {loadingPopular ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview medias={popularMovies.slice(0, 100)} title="Les plus populaires" />
        )}
        {loadingTrendingMovies ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview medias={trendingMovies.slice(0, 100)} title="En tendance" />
        )}
        {loadingUpcoming ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview medias={upcomingMovies.slice(0, 100)} title="À venir" />
        )}
        {loadingTopRated ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview medias={topRatedMovies.slice(0, 100)} title="Le public a adoré" />
        )}
        {loadingFrenchMovies ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview medias={frenchMovies.slice(0, 100)} title="Made in France" />
        )}
      </section>
    </div>
  );
}