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
  const [loadingUS, setLoadingUS] = useState<boolean>(true);
  const [loadingFrench, setLoadingFrench] = useState<boolean>(true);
  const [loadingTopRated, setLoadingTopRated] = useState<boolean>(true);
  const [loadingPopular, setLoadingPopular] = useState<boolean>(true);

  useEffect(() => {
    const fetchUSSeries = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?origin_country=US");
      const data: { results: Serie[] } = await response.json();
      setUSSeries(data.results);
      setLoadingUS(false);
    };
    
    const fetchFrenchSeries = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?origin_country=FR");
      const data: { results: Serie[] } = await response.json();
      setFrenchSeries(data.results);
      setLoadingFrench(false);
    };
      
    const fetchTopRatedSeries = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?query=top_rated");
      const data: { results: Serie[] } = await response.json();
      setTopRatedSeries(data.results);
      setLoadingTopRated(false);
    };

    const fetchPopularSeries = async (): Promise<void> => {
      const response: Response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/tv?query=popular");
      const data: { results: Serie[] } = await response.json();
      setPopularSeries(data.results);
      setLoadingPopular(false);
    };

    fetchUSSeries();
    fetchFrenchSeries();
    fetchTopRatedSeries();
    fetchPopularSeries();
  }, []);

  return (
    <div className="min-h-screen text-white">
      {loadingTopRated ? (
        <LoadingBanner />
      ) : (
        topRatedSeries.length > 0 && <MediaBanner media={topRatedSeries[0]} type="serie" />
      )}
      <section className="m-5 lg:ml-20 flex flex-col gap-16">
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