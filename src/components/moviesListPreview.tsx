import Image from 'next/image';
import Link from 'next/link';

interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
}

export default function MoviesListPreview(
    { movies, title }: Readonly<{ movies: Movie[], title: string }>
) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold z-10">{title}</h1>
            <div className='overflow-x-auto'>
                <div className="grid grid-cols-[repeat(10,minmax(240px,1fr))] gap-4">
                    {movies.map((movie) => (
                        <Link href={`/movies/${movie.id}`} key={movie.id} className="relative group overflow-hidden">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={500}
                                height={750}
                                className="w-full h-auto"
                            />
                            <div className="absolute h-1/2 w-full bottom-0 bg-black bg-opacity-50 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 flex flex-col justify-end p-4 transition-all duration-500">
                                <h2 className="text-lg font-semibold">{movie.title}</h2>
                                <p>{new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>
                                <div className="flex items-center mt-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <svg
                                            key={index}
                                            className={`w-4 h-4 ${index < Math.round(movie.vote_average / 2) ? 'text-yellow-400' : 'text-gray-400'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-sm">{movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</span>
                                </div>
                                <p className="mt-2 text-sm">{movie.overview.slice(0, 50)}...</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}