import { Movie, Serie } from "@/types/types";
import MediaPreview from "./MediaPreview";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JSX } from "react";

export default function MediaListPreview({
  medias,
  type,
  title,
  seeMore,
  href,
  grid,
}: Readonly<{
  medias: (Movie | Serie)[];
  type: "movie" | "serie";
  title: string;
  seeMore?: boolean;
  href?: string;
  grid?: boolean;
}>): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold z-[1]">{title}</h1>
        {seeMore && (
          <Link href={href || ""} className="flex items-center gap-2">
            Voir plus <ChevronRight />
          </Link>
        )}
      </div>
      <div className="overflow-x-auto">
        <div
          className={`grid gap-4`}
          style={
            !grid
              ? { gridTemplateColumns: `repeat(${medias.length}, 200px)` }
              : { gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))` }
          }
        >
          {medias.slice(0, 100).map((media: Movie | Serie) => (
            <MediaPreview media={media} type={type} key={media.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
