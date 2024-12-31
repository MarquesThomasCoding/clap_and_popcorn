import { Movie } from '@/types/types';
import MoviePreview from './MoviePreview';

export default function MoviesListPreview(
    { movies, title }: Readonly<{ movies: Movie[], title: string }>
) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold z-[1]">{title}</h1>
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