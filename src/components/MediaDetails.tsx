import { fetchMovieById, fetchSerieById } from "@/lib/fetchData";
import { Movie, Crew, Serie } from "@/types/types";
import MediaBanner from "@/components/MediaBanner";
import SeeAndShareButtons from "@/components/SeeAndShareButtons";
import MediaListPreview from "@/components/MediaListPreview";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MovieStats from "./MovieStats";

export default async function MediaDetails({
  slug,
  type,
}: {
  slug: string;
  type: "movie" | "serie";
}) {
  const mediaData:
    | (Movie & { credits: { cast: Crew[]; crew: Crew[] } })
    | (Serie & { credits: { cast: Crew[]; crew: Crew[] } }) =
    type === "movie" ? await fetchMovieById(slug) : await fetchSerieById(slug);

  return (
    <>
      {/* Movie banner loads first */}
      <MediaBanner media={mediaData} type={type} isMediaPage />

      <section className="flex flex-col gap-8 lg:mx-20 p-8">
        {/* Buttons */}
        <SeeAndShareButtons media={mediaData} type={type} />

        {/* Production Companies */}
        <Suspense fallback={<div>Loading production info...</div>}>
          <ProductionCompanies companies={mediaData.production_companies} />
        </Suspense>

        {/* Crew (Directors & Producers) */}
        <Suspense fallback={<div>Loading crew details...</div>}>
          <CrewSection crew={mediaData.credits.crew as Crew[]} />
        </Suspense>

        {/* Cast */}
        <Suspense fallback={<div>Loading cast...</div>}>
          <CastSection cast={mediaData.credits.cast as Crew[]} />
        </Suspense>

        {/* Budget & Revenue */}
        {type === "movie" && (
          <Suspense fallback={<div>Loading statistics...</div>}>
            <MovieStats revenue={(mediaData as Movie).revenue} budget={(mediaData as Movie).budget}
            />
          </Suspense>
        )}

        {/* Recommendations */}
        <Suspense fallback={<div>Loading similar movies...</div>}>
          <MediaListPreview
            medias={mediaData.recommendations.results}
            type={type}
            title="Similaire"
          />
        </Suspense>
      </section>
    </>
  );
}

function ProductionCompanies({
  companies,
}: {
  companies: { id: number; name: string; logo_path: string }[];
}) {
  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <h2 className="text-3xl">Produit par</h2>
      <div className="w-full overflow-auto">
        <ul className="flex gap-8 w-fit">
          {companies.map((company) => (
            <li className="min-w-fit w-fit" key={company.id}>
              {company.logo_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                  alt={company.name}
                  width={500}
                  height={500}
                  className="min-w-fit w-auto h-10 invert-0 dark:invert"
                />
              ) : (
                <span className="text-center">{company.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CrewSection({ crew }: { crew: Crew[] }) {
  const uniqueCrew = crew
    .filter((member) => member.job === "Director" || member.job === "Producer")
    .reduce((acc: Crew[], member: Crew) => {
      if (!acc.find((el) => el.id === member.id)) acc.push(member);
      else {
        const existingMember = acc.find((el) => el.id === member.id);
        if (existingMember)
          existingMember.job = member.job + ", " + existingMember.job;
      }
      return acc;
    }, []);

  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <h2 className="text-3xl">Réalisation</h2>
      <ul className="flex gap-8 overflow-auto">
        {uniqueCrew.map((member) => (
          <li key={member.id} className="flex flex-col items-center min-w-20">
            <span className="text-center">{member.name}</span>
            <span className="text-center">{member.job}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CastSection({ cast }: { cast: Crew[] }) {
  const uniqueCast = cast
    .filter((member) => member.known_for_department === "Acting")
    .reduce((acc: Crew[], member: Crew) => {
      if (!acc.find((el) => el.id === member.id)) acc.push(member);
      else {
        const existingMember = acc.find((el) => el.id === member.id);
        if (existingMember)
          existingMember.character =
            member.character + ", " + existingMember.character;
      }
      return acc;
    }, []);

  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <h2 className="text-3xl">Distribution</h2>
      <div className="overflow-x-auto overflow-y-hidden">
        <ul className={`flex w-fit gap-4`}>
          {uniqueCast.map((member) => (
            <li
              key={member.id}
              className="relative flex flex-col items-center w-36 group"
            >
              <Link href={`/persons/${member.id}`}>
                {member.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                    alt={member.name}
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <span className="w-full h-48 rounded-md bg-zinc-800"></span>
                )}
                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col gap-1 opacity-0 translate-y-full bg-black bg-opacity-80 p-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-center">{member.name}</span>
                  <span className="text-center">{member.character}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
