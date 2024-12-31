"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, UserCircle2Icon } from 'lucide-react';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        person: [],
        movie: [],
        tv: [],
    });
    const [isCooldown, setIsCooldown] = useState(false);

    useEffect(() => {
        if (query.length > 2 && !isCooldown) {
            setIsCooldown(true);
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && Array.isArray(data.results)) {
                    const sortedResults = {
                        person: data.results.filter((item: { media_type: string }) => item.media_type === 'person'),
                        movie: data.results.filter((item: { media_type: string }) => item.media_type === 'movie'),
                        tv: data.results.filter((item: { media_type: string }) => item.media_type === 'tv'),
                    };
                    setResults(sortedResults);
                } else {
                    setResults({ person: [], movie: [], tv: [] });
                }
            })
            .finally(() => {
                setTimeout(() => setIsCooldown(false), 1000); // 1 second cooldown
            });
        } else {
            setResults({ person: [], movie: [], tv: [] });
        }
    }, [query]);

    useEffect(() => {
        console.log('Results have changed:', results);
    }, [results]);

    const displayExtenedSearchBar = () => {
        const searchBar = document.getElementById('searchBar');
        const overlay = document.getElementById('overlay');
        if (searchBar) {
            searchBar.classList.remove('hidden');
            searchBar.querySelector('input')?.focus();
            overlay?.classList.remove('hidden');
            searchBar.classList.add('flex');
            overlay?.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    };

    return (
        <div>
            <div className="flex items-center px-4 w-full max-w-96 m-auto rounded-lg border-none bg-zinc-600 bg-opacity-50 backdrop-blur-sm">
                <Search className="w-6 h-6 text-white" onClick={() => displayExtenedSearchBar()} />
                <Input
                type="text"
                onClick={() => displayExtenedSearchBar()}
                placeholder="Rechercher..."
                className="bg-transparent text-white border-none"
                />
            </div>
            <div className='fixed inset-0 h-screen bg-black bg-opacity-50 z-40 hidden' id="overlay" onClick={() => {
            const searchBar = document.getElementById('searchBar');
            const overlay = document.getElementById('overlay');
            if (searchBar && overlay) {
                searchBar.classList.add('hidden');
                searchBar.classList.remove('flex');
                overlay.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
            }}></div>
            <div className='fixed top-[25dvh] left-1/2 transform -translate-x-1/2 flex-col gap-2 w-full max-w-xl max-h-96 overflow-auto m-auto rounded-lg p-4 text-base bg-zinc-700 bg-opacity-50 backdrop-blur-md z-50 hidden' id="searchBar">
            <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className='w-full border-none text-lg bg-zinc-600 bg-opacity-50 backdrop-blur-sm' placeholder="Rechercher..." />
            <h4 className="text-lg">Personnes</h4>
            <ul className='flex flex-col gap-2'>
                {results.person.map((person: { id: number; profile_path: string; name: string }) => (
                <li key={person.id} className="w-full">
                    <Link href={`/persons/${person.id}`} className="flex items-center gap-2 rounded-sm px-4 hover:bg-zinc-600">
                        {person.profile_path ? (
                            <Image src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt='Image de profil' width={200} height={200} className='w-8 h-8 object-cover object-top rounded-full' />
                        ) : (
                            <UserCircle2Icon className='w-8 h-8 text-white' />
                        )}
                        {person.name}
                    </Link>
                </li>
                ))}
            </ul>
            <Separator className='bg-white' />
            <h4 className="text-lg">Films</h4>
            <ul className='flex flex-col gap-2'>
                {results.movie.map((movie: { id: number; title: string }) => (
                <li key={movie.id} className="w-full">
                    <Link href={`/movies/${movie.id}`} className="flex items-center gap-2 rounded-sm px-4 hover:bg-zinc-600">{movie.title}</Link>
                </li>
                ))}
            </ul>
            <Separator className='bg-white' />
            <h4 className="text-lg">Séries</h4>
            <ul className='flex flex-col gap-2'>
                {results.tv.map((tv: { id: number; name: string; }) => (
                <li key={tv.id} className="w-full">
                    <Link href={`/tv/${tv.id}`} className="flex items-center gap-2 rounded-sm px-4 hover:bg-zinc-600">{tv.name}</Link>
                </li>
                ))}
            </ul>
            </div>
        </div>
    );
}