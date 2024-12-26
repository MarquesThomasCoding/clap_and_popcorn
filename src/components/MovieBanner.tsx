import Image from "next/image";
import Link from "next/link";
import { Info, Play } from 'lucide-react';

interface MovieBannerProps {
  movie: {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
  };
}

export default function MovieBanner({ movie }: MovieBannerProps) {
  return (
    <div className="relative -mb-28">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        width={1920}
        height={1080}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center gap-8 p-4">
        <h2 className="text-6xl font-bold mx-20 mb-2">{movie.title}</h2>
        <p className="mx-20 text-lg max-w-96">{movie.overview}</p>
        <div className="flex gap-4 mx-20">
          <Link href={`/movies/${movie.id}`} className={'flex items-center gap-2 rounded-lg px-8 py-3 bg-[#F7CC23] text-black transition-all duration-300'}><Play />Bande annonce</Link>
          <Link href={`/movies/${movie.id}`} className={'flex items-center gap-2 rounded-lg px-8 py-3 bg-white bg-opacity-30 backdrop-blur-sm'}><Info />Découvrir</Link>
        </div>
      </div>
    </div>
  );
}
