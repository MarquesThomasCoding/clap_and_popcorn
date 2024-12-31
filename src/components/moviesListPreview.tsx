import { Movie } from '@/types/types';
import MoviePreview from './MoviePreview';
import Link from 'next/link';

export default function MoviesListPreview(
    { movies, title, seeMore, href }: Readonly<{ movies: Movie[], title: string, seeMore?: boolean, href?: string }>
) {
    return (
        <div className="flex flex-col gap-4">
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold z-[1]">{title}</h1>
                {seeMore && (
                    <Link href={href || ""}>Voir plus</Link>
                )}
            </div>
            <div className='overflow-x-auto'>
                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${movies.length}, 200px)` }}>
                    {movies.slice(0,100).map((movie) => (
                        <MoviePreview movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}