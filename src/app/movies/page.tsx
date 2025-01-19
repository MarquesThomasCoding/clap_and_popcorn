"use client";

import { JSX, useEffect, useState } from "react";
import MediaBanner from "@/components/MediaBanner";
import MediaListPreview from "@/components/MediaListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Movie } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";
import {
  fetchFrenchMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "@/lib/fetchData";

export default function Page(): JSX.Element {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [frenchMovies, setFrenchMovies] = useState<Movie[]>([]);

  const [loadingPopular, setLoadingPopular] = useState<boolean>(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState<boolean>(true);
  const [loadingTopRated, setLoadingTopRated] = useState<boolean>(true);
  const [loadingTrendingMovies, setLoadingTrendingMovies] =
    useState<boolean>(true);
  const [loadingFrenchMovies, setLoadingFrenchMovies] = useState<boolean>(true);

  const getPopularMovies: () => void = async () => {
    const data: Movie[] = await fetchPopularMovies();
    setPopularMovies(data);
    setLoadingPopular(false);
  };

  const getUpcomingMovies: () => void = async () => {
    const data: Movie[] = await fetchUpcomingMovies();
    setUpcomingMovies(data);
    setLoadingUpcoming(false);
  };

  const getTopRatedMovies: () => void = async () => {
    const data: Movie[] = await fetchTopRatedMovies();
    setTopRatedMovies(data);
    setLoadingTopRated(false);
  };

  const getTrendingMovies: () => void = async () => {
    const data: Movie[] = await fetchTrendingMovies();
    setTrendingMovies(data);
    setLoadingTrendingMovies(false);
  };

  const getFrenchMovies: () => void = async () => {
    const data: Movie[] = await fetchFrenchMovies();
    setFrenchMovies(data);
    setLoadingFrenchMovies(false);
  };

  useEffect(() => {
    getPopularMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getTrendingMovies();
    getFrenchMovies();
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingTrendingMovies ? (
        <LoadingBanner />
      ) : (
        trendingMovies.length > 0 && (
          <MediaBanner media={trendingMovies[0]} type="movie" />
        )
      )}
      <section className="ml-20 flex flex-col gap-16">
        {loadingPopular ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview
            medias={popularMovies.slice(0, 100)}
            type="movie"
            title="Les plus populaires"
          />
        )}
        {loadingTrendingMovies ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview
            medias={trendingMovies.slice(0, 100)}
            type="movie"
            title="En tendance"
          />
        )}
        {loadingUpcoming ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview
            medias={upcomingMovies.slice(0, 100)}
            type="movie"
            title="À venir"
          />
        )}
        {loadingTopRated ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview
            medias={topRatedMovies.slice(0, 100)}
            type="movie"
            title="Le public a adoré"
          />
        )}
        {loadingFrenchMovies ? (
          <LoadingMediaList />
        ) : (
          <MediaListPreview
            medias={frenchMovies.slice(0, 100)}
            type="movie"
            title="Made in France"
          />
        )}
      </section>
    </div>
  );
}
