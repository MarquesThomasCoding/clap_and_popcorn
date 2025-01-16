"use client";

import { useEffect, useState } from "react";
import MediaBanner from "@/components/MediaBanner";
import MediaListPreview from "@/components/MediaListPreview";
import LoadingBanner from "@/components/LoadingBanner";
import { Serie } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";

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
        setUSSeries(data.results.map((serie: Serie) => {
          serie.title = serie.name;
          serie.release_date = serie.first_air_date;
          return serie;
        }));
        setLoadingUS(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?origin_country=FR")
      .then((response) => response.json())
      .then((data) => {
        setFrenchSeries(data.results.map((serie: Serie) => {
          serie.title = serie.name;
          serie.release_date = serie.first_air_date;
          return serie;
        }));
        setLoadingFrench(false);
      });
      
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?query=top_rated")
    .then((response) => response.json())
    .then((data) => {
        setTopRatedSeries(data.results.map((serie: Serie) => {
          serie.title = serie.name;
          serie.release_date = serie.first_air_date;
          return serie;
        }));
        setLoadingTopRated(false);
      });

    fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?query=popular")
    .then((response) => response.json())
    .then((data) => {
        setPopularSeries(data.results.map((serie: Serie) => {
          serie.title = serie.name;
          serie.release_date = serie.first_air_date;
          return serie;
        }));
        setLoadingPopular(false);
      });
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingTopRated ? (
        <LoadingBanner />
      ) : (
        topRatedSeries.length > 0 && <MediaBanner media={topRatedSeries[0]} type="serie" />
      )}
      <section className="ml-20 flex flex-col gap-16">
        {loadingTopRated ? (
            <LoadingMediaList />
        ) : (
            <MediaListPreview medias={topRatedSeries.slice(1, 100)} type="serie" title="Le public adore" />
        )}
        {loadingPopular ? (
            <LoadingMediaList />
        ) : (
            <MediaListPreview medias={popularSeries.slice(0, 100)} type="serie" title="Les plus populaires" />
        )}
        {loadingUS ? (
            <LoadingMediaList />
        ) : (
            <MediaListPreview medias={USSeries.slice(0, 100)} type="serie" title="Tout droit des États-Unis" />
        )}
        {loadingFrench ? (
            <LoadingMediaList />
        ) : (
            <MediaListPreview medias={frenchSeries.slice(0, 100)} type="serie" title="Séries françaises" />
        )}
      </section>
    </div>
  );
}