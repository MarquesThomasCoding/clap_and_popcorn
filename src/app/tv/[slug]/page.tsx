import MediaBanner from "@/components/MediaBanner";
import MediaListPreview from "@/components/MediaListPreview";
import SeeAndShareButtons from "@/components/SeeAndShareButtons";
import { fetchSerieById } from "@/lib/fetchData";
import { Company, Crew, Serie } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  const slug = (await params).slug;

  const serie: Serie = await fetchSerieById(slug);

  return (
    <>
      <MediaBanner media={serie} type="serie" isMediaPage />
      <main className="flex flex-col gap-8 mx-20 p-8">
        <SeeAndShareButtons media={serie} type="serie" />
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">Produit par</h2>
          <ul className="flex justify-between">
            {serie.production_companies.map((company: Company) => (
              <li key={company.id}>
                {company.logo_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                    alt={company.name}
                    width={500}
                    height={500}
                    className="w-auto h-10 invert-0 dark:invert"
                  />
                ) : (
                  <span className="text-center">{company.name}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl">Réalisation</h2>
          <ul className="flex justify-between">
            {(serie.credits.crew as Crew[])
              .filter(
                (member: Crew) =>
                  member.job === "Director" || member.job === "Producer"
              )
              .reduce((acc: Crew[], member: Crew) => {
                if (!acc.find((el: { id: number }) => el.id === member.id))
                  acc.push(member);
                else {
                  const existingMember = acc.find(
                    (el: { id: number }) => el.id === member.id
                  );
                  if (existingMember)
                    existingMember.job = member.job + ", " + existingMember.job;
                }
                return acc;
              }, [])
              .map((member: Crew) => (
                <li key={member.id} className="flex flex-col items-center">
                  <span className="text-center">{member.name}</span>
                  <span className="text-center">{member.job}</span>
                </li>
              ))}
          </ul>
        </section>
        <section className="flex flex-col gap-4 overflow-hidden">
          <h2 className="text-3xl">Distribution</h2>
          <div className="overflow-x-auto overflow-y-hidden">
            <ul className={`flex w-fit gap-4`}>
              {(serie.credits.cast as Crew[])
                .filter(
                  (member: Crew) => member.known_for_department === "Acting"
                )
                .reduce((acc: Crew[], member: Crew) => {
                  if (!acc.find((el: { id: number }) => el.id === member.id))
                    acc.push(member);
                  else {
                    const existingMember: Crew | undefined = acc.find(
                      (el: { id: number }) => el.id === member.id
                    );
                    if (existingMember)
                      existingMember.character =
                        member.character + ", " + existingMember.character;
                  }
                  return acc;
                }, [])
                .map((member: Crew) => (
                  <li
                    key={member.id}
                    className="relative flex flex-col items-center w-36 group"
                  >
                    <Link href="/persons/[slug]" as={`/persons/${member.id}`}>
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
        <section className="flex flex-col gap-4 overflow-hidden">
          <h2 className="text-3xl">Saisons et episodes</h2>
        </section>
        <MediaListPreview
          medias={serie.recommendations.results}
          type="serie"
          title="Similaire"
        />
      </main>
    </>
  );
}
