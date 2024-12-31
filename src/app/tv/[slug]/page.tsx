import SerieBanner from "@/components/SerieBanner";
import SeriesListPreview from "@/components/SeriesListPreview";
import { EyeClosed, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug

    const serie = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tv?id=${slug}`)
    .then((response) => response.json())
    .then((data) => {
        return data
    });

    return (
        <>
            <SerieBanner serie={serie} isSeriePage />
            <main className="flex flex-col gap-8 mx-20 p-8">
                <div className="flex gap-8 items-end">
                    <button className="flex flex-col items-center">
                        <EyeClosed className="w-8 h-8" />
                        Vu
                    </button>
                    <button className="flex flex-col items-center">
                        <Share2 className="w-8 h-8" />
                        En cours
                    </button>
                </div>
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl">Produit par</h2>
                    <ul className="flex justify-between">
                        {serie.production_companies.map((company: { id: number, name: string, logo_path: string }) => (
                            <li key={company.id}>
                                {company.logo_path ?
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                                        alt={company.name}
                                        width={500}
                                        height={500}
                                        className="w-auto h-10 invert-0 dark:invert"
                                    /> : 
                                    <span className="text-center">{company.name}</span>
                                }
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl">Réalisation</h2>
                    <ul className="flex justify-between">
                        {serie.credits.crew.filter((member: { job: string }) => member.job === "Director" || member.job === "Producer").reduce((acc: { id: number, name: string, job: string }[], member: { id: number, name: string, job: string }) => { 
                            if (!acc.find((el: { id: number }) => el.id === member.id)) acc.push(member)
                            else {
                                const existingMember = acc.find((el: { id: number }) => el.id === member.id)
                                if (existingMember) existingMember.job = member.job + ', ' + existingMember.job
                            }
                            return acc
                         }, []).map((member: { id: number, name: string, job: string }) => (
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
                            {serie.credits.cast.filter((member: { known_for_department: string }) => member.known_for_department === "Acting").reduce((acc: { id: number, character: string }[], member: { id: number, character: string }) => {
                                if (!acc.find((el: { id: number }) => el.id === member.id)) acc.push(member)
                                else {
                                    const existingMember = acc.find((el: { id: number }) => el.id === member.id)
                                    if (existingMember) existingMember.character = member.character + ', ' + existingMember.character
                                }
                                return acc
                             }, []).map((member: { id: number, name: string, character: string, profile_path: string }) => (
                                <li key={member.id} className="relative flex flex-col items-center w-36 group">
                                    <Link href="/persons/[slug]" as={`/persons/${member.id}`}>
                                        {member.profile_path ?
                                        <Image
                                        src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
                                        alt={member.name}
                                        width={500}
                                        height={500}
                                        className="w-full h-auto rounded-md"
                                        /> :
                                        <span className="w-full h-48 rounded-md bg-zinc-800"></span>
                                        }
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
                    {/* <span className="flex items-center gap-2"><HandCoins /> {serie.revenue.toLocaleString()} $ <span className="text-sm text-muted-foreground px-2 rounded-sm bg-white bg-opacity-5 backdrop-blur-sm">Revenus</span></span>
                    <span className="flex items-center gap-2"><PiggyBank /> {serie.budget.toLocaleString()} $ <span className="text-sm text-muted-foreground px-2 rounded-sm bg-white bg-opacity-5 backdrop-blur-sm">Budget</span></span> */}
                </section>
                <SeriesListPreview series={serie.recommendations.results} title="Vous aimerez sans doute" />
            </main>
        </>
    )
}