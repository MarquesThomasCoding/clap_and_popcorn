"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getToSeeMovies, getSeenMovies } from "@/lib/utils";
import { Movie } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";
import MediaListPreview from "@/components/MediaListPreview";

const ListsPage = (): JSX.Element => {
  const { user, loading } = useAuth();
  const [toSeeMovies, setToSeeMovies] = useState<Movie[]>([]);
  const [seenMovies, setSeenMovies] = useState<Movie[]>([]);
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
          const toSeeMovies: Movie[] = await getToSeeMovies(10);
          const seenMovies: Movie[] = await getSeenMovies(10);
          setToSeeMovies(toSeeMovies);
          setSeenMovies(seenMovies);
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
    <section className="m-5 mt-20 lg:m-20 flex flex-col gap-16">
      <MediaListPreview medias={toSeeMovies} type="movie" title="My To See Movies" seeMore href="/profile/lists/to-see" />
      <MediaListPreview medias={seenMovies} type="movie" title="My Seen Movies" seeMore href="/profile/lists/seen" />
    </section>
  );
};

export default ListsPage;