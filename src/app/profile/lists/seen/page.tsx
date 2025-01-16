"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getSeenMovies } from "@/lib/utils";
import { Movie } from "@/types/types";
import LoadingMediaList from "@/components/LoadingMediaList";
import MediaListPreview from "@/components/MediaListPreview";

const SeenPage = () => {
  const { user, loading } = useAuth();
  const [seenMovies, setSeenMovies] = useState<Movie[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      // Si l'état de chargement est en cours, ne rien faire
      return;
    }

    if (!user) {
      router.push("/signin");
    } else {
      const fetchMovies = async () => {
        if (user.uid) {
          const toSeeMovies = await getSeenMovies(user.uid);
          setSeenMovies(toSeeMovies);
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
      <MediaListPreview medias={seenMovies} title="My Seen Movies" grid />
    </section>
  );
};

export default SeenPage;