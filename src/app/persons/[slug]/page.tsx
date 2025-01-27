import MediaListPreview from "@/components/MediaListPreview";
import { JSX } from "react";
import { fetchActor } from "@/lib/fetchData";
import ActorBanner from "@/components/ActorBanner";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {

  const actor = await fetchActor((await params).slug);

  return (
    <main className="flex flex-col gap-8 m-20 p-8">
      <ActorBanner {...actor} />
      <MediaListPreview
        medias={actor.movie_credits.cast}
        type="movie"
        title="Connu pour"
      />
    </main>
  );
}
