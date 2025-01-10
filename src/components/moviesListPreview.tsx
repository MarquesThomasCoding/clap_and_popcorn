import { Movie } from '@/types/types';
import MoviePreview from './MoviePreview';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function MoviesListPreview(
    { movies, title, seeMore, href, grid }: Readonly<{ movies: Movie[], title: string, seeMore?: boolean, href?: string, grid?: boolean }>
) {
    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold z-[1]">{title}</h1>
                {seeMore && (
                    <Link href={href || ""} className='flex items-center gap-2'>Voir plus <ChevronRight /></Link>
                )}
            </div>
            <div className='overflow-x-auto'>
                <div className={`grid gap-4`} style={!grid ? { gridTemplateColumns: `repeat(${movies.length}, 200px)` } : { gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))` }}>
                    {movies.slice(0,100).map((movie) => (
                        <MoviePreview movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}