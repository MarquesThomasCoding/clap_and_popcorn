import { Movie, Serie, Person } from '@/types/types';
import MoviePreview from './MoviePreview';
import SeriePreview from './SeriePreview';
import PersonPreview from './PersonPreview';

export default function AllListPreview(
    { elements, title }: Readonly<{ elements: (Movie | Serie | Person)[], title: string }>
) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold z-[1]">{title}</h1>
            <div className='overflow-x-auto'>
                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${elements.length}, 200px)` }}>
                    {elements.slice(0,100).map((element) => (
                        <div key={element.id} className='overflow-hidden'>
                            {
                                element.media_type === 'movie' ? (
                                    <MoviePreview movie={element as Movie} />
                                ) : element.media_type === 'tv' ? (
                                    <SeriePreview serie={element as Serie} />
                                ) : (
                                    <PersonPreview person={element as Person} />
                                )
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}