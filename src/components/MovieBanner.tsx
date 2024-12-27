"use client"

import Image from "next/image";
import Link from "next/link";
import { Info, Play, Eye } from 'lucide-react';
import TeaserPlayer from "./TeaserPlayer";
import { Movie } from "@/types/types";

interface MovieBannerProps {
  movie: Movie;
  isMoviePage?: boolean;
}

export default function MovieBanner({ movie, isMoviePage }: MovieBannerProps) {

  const showTeaser = () => {
    const teaser = document.querySelector('#teaser-container');
    if(teaser) {
      document.querySelector('#teaser-container')?.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }

  const showOverview = () => {
    const overview = document.getElementById("overview");
    overview?.classList.toggle("hidden");
};

  return (
    <div className={`relative ${!isMoviePage?'-mb-28':''}`}>
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        width={1920}
        height={1080}
        className="w-full h-screen object-cover"
      />
      <div className={`absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end gap-8 p-8 ${isMoviePage?'':'pb-40'}`}>
        <h2 className="text-6xl font-bold mx-20 mb-2">{movie.title}</h2>
        <p className="mx-20 text-lg max-w-96">{movie.overview.slice(0,300)}...
          <button onClick={() => showOverview()} className="text-white underline">
              Voir plus
          </button>
        </p>
        <div className="flex gap-4 mx-20">
          <button onClick={() => isMoviePage && showTeaser()} className={'flex items-center gap-2 rounded-lg px-8 py-3 bg-[#F7CC23] text-black'}><Play />Bande annonce</button>
          {!isMoviePage && <Link href={`/movies/${movie.id}`} className={'flex items-center gap-2 rounded-lg px-8 py-3 bg-white bg-opacity-30 backdrop-blur-sm'}><Info />Découvrir</Link>}
          {isMoviePage && <Link href={`/movies/${movie.id}`} className={'flex items-center gap-2 rounded-lg px-8 py-3 bg-white bg-opacity-30 backdrop-blur-sm'}><Eye />Je veux le voir</Link>}
        </div>
        {isMoviePage &&
        <>
          <div className="flex gap-2 mx-20">
            {movie.genres.map((genre: { id: number, name: string }) => (
              <span key={genre.id} className="rounded-sm px-2 bg-black bg-opacity-30 backdrop-blur-sm">{genre.name}</span>
            ))}
            <span className="ml-4">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min</span>
          </div>
          <div className="flex gap-2 mx-20">
            <span className="rounded-sm px-2 bg-black bg-opacity-30 backdrop-blur-sm">{'le ' + new Date(movie.release_date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            {movie.origin_country.map((country: string) => (
              <span key={country}>{country}</span>
            ))}
          </div>
          <div className="flex items-center mx-20">
              {Array.from({ length: 5 }, (_, index) => (
                  <svg
                      key={index}
                      className={`w-6 h-6 ${index < Math.round(movie.vote_average / 2) ? 'text-yellow-400' : 'text-gray-400'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.175 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
              ))}
              <span className="ml-2 text-sm">{movie.vote_average.toFixed(1)} ({movie.vote_count} votes)</span>
          </div>
          {movie.videos.results.filter((video: { type: string }) => video.type === 'Trailer')[0] && <TeaserPlayer videoId={movie.videos.results.filter((video: { type: string }) => video.type === 'Trailer')[0].key} />}
        </>
        }
      </div>
      <div id="overview" className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10" onClick={() => showOverview()}>
          <span className="flex flex-col gap-2 w-1/2 h-1/2 overflow-y-auto rounded-md bg-zinc-900 p-8">
              <h4 className="text-xl font-bold border-b border-zinc-400 p-2">Description</h4>
              {movie.overview}
          </span>
      </div>
    </div>
  );
}
