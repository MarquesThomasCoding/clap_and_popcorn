"use client";

import { useEffect, useState } from "react";
import SerieBanner from "@/components/SerieBanner";
import SeriesListPreview from "@/components/SeriesListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Serie } from "@/types/types";
import LoadingMovieList from "@/components/LoadingMovieList";

export default function Home() {
  const [USSeries, setUSSeries] = useState<Serie[]>([]);
  const [frenchSeries, setFrenchSeries] = useState<Serie[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<Serie[]>([]);
  const [popularSeries, setPopularSeries] = useState<Serie[]>([]);
  const [loadingUS, setLoadingUS] = useState(true);
  const [loadingFrench, setLoadingFrench] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?origin_country=US")
      .then((response) => response.json())
      .then((data) => {
        setUSSeries(data.results);
        setLoadingUS(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?origin_country=FR")
      .then((response) => response.json())
      .then((data) => {
        setFrenchSeries(data.results);
        setLoadingFrench(false);
      });
      
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?query=top_rated")
    .then((response) => response.json())
    .then((data) => {
        setTopRatedSeries(data.results);
        setLoadingTopRated(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?query=popular")
    .then((response) => response.json())
    .then((data) => {
        setPopularSeries(data.results);
        setLoadingPopular(false);
      });
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingTopRated ? (
        <LoadingBanner />
      ) : (
        topRatedSeries.length > 0 && <SerieBanner serie={topRatedSeries[0]} />
      )}
      <section className="ml-20 flex flex-col gap-16">
        {loadingTopRated ? (
            <LoadingMovieList />
        ) : (
            <SeriesListPreview series={topRatedSeries.slice(1, 100)} title="Le public adore" />
        )}
        {loadingPopular ? (
            <LoadingMovieList />
        ) : (
            <SeriesListPreview series={popularSeries.slice(0, 100)} title="Les plus populaires" />
        )}
        {loadingUS ? (
            <LoadingMovieList />
        ) : (
            <SeriesListPreview series={USSeries.slice(0, 100)} title="Tout droit des États-Unis" />
        )}
        {loadingFrench ? (
            <LoadingMovieList />
        ) : (
            <SeriesListPreview series={frenchSeries.slice(0, 100)} title="Séries françaises" />
        )}
      </section>
    </div>
  );
}