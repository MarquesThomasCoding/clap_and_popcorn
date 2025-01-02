"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { getToSeeMovies, getSeenMovies } from "@/lib/utils";
import { Movie } from "@/types/types";
import LoadingMovieList from "@/components/LoadingMovieList";
import MoviesListPreview from "@/components/moviesListPreview";

const ListsPage = () => {
  const { user, loading } = useAuth();
  const [toSeeMovies, setToSeeMovies] = useState<Movie[]>([]);
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
          const toSeeMovies = await getToSeeMovies(user.uid, 10);
          const seenMovies = await getSeenMovies(user.uid, 10);
          setToSeeMovies(toSeeMovies);
          setSeenMovies(seenMovies);
          setPageLoading(false);
        }
      };

      fetchMovies();
    }
  }, [user, loading, router]);

  if (pageLoading) {
    return <LoadingMovieList />;
  }

  return (
    <section className="m-20 flex flex-col gap-16">
      <MoviesListPreview movies={toSeeMovies} title="My To See Movies" seeMore href="/profile/lists/to-see" />
      <MoviesListPreview movies={seenMovies} title="My Seen Movies" seeMore href="/profile/lists/seen" />
    </section>
  );
};

export default ListsPage;