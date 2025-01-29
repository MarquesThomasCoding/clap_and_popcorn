import { fetchActor } from "@/lib/fetchData";
import ActorBanner from "@/components/ActorBanner";
import MediaListPreview from "@/components/MediaListPreview";
import { Suspense } from "react";

export default async function ActorDetails({ slug }: { slug: string }) {
  const actor = await fetchActor(slug);

  return (
    <>
      <ActorBanner {...actor} />

      {/* Lazy-load Movie List */}
      <Suspense fallback={<div>Loading movies...</div>}>
        <MediaListPreview
          medias={actor.movie_credits.cast}
          type="movie"
          title="Connu pour"
        />
      </Suspense>
    </>
  );
}
