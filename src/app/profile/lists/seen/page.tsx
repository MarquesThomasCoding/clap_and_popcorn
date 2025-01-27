"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getSeenMovies, getSeenSeries } from "@/lib/utils";
import { Movie } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";
import MediaListPreview from "@/components/MediaListPreview";

const SeenPage = (): JSX.Element => {
  const { user, loading } = useAuth();
  const [seenMovies, setSeenMovies] = useState<Movie[]>([]);
  const [seenSeries, setSeenSeries] = useState<Movie[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      // Si l'état de chargement est en cours, ne rien faire
      return;
    }

    if (!user) {
      router.push("/signin");
    } else {
      const fetchMovies = async (): Promise<void> => {
        if (user.uid) {
          const seenMovies: Movie[] = await getSeenMovies();
          const seenSeries: Movie[] = await getSeenSeries();
          setSeenMovies(seenMovies);
          setSeenSeries(seenSeries);
          setPageLoading(false);
        }
      };

      fetchMovies();
    }
  }, [user, loading, router]);

  if (pageLoading) {
    return <LoadingMediaList />;
  }

  return (
    <section className="m-20 flex flex-col gap-16">
      <MediaListPreview medias={seenMovies} type="movie" title="Les films que j'ai vu" grid />
      <MediaListPreview medias={seenSeries} type="serie" title="Les séries que j'ai vu" grid />
    </section>
  );
};

export default SeenPage;