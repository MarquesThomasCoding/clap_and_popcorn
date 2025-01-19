import { Movie, Serie, Person } from '@/types/types';
import MediaPreview from './MediaPreview';
import PersonPreview from './PersonPreview';
import { JSX } from 'react';

export default function AllListPreview(
    { elements, title }: Readonly<{ elements: (Movie | Serie | Person)[], title: string }>
): JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold z-[1]">{title}</h1>
            <div className='overflow-x-auto'>
                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${elements.length}, 200px)` }}>
                    {elements.slice(0,100).map((element) => (
                        <div key={element.id} className='overflow-hidden'>
                            {
                                element.media_type === 'movie' ? (
                                    <MediaPreview media={element as Movie} type="movie" />
                                ) : element.media_type === 'tv' ? (
                                    <MediaPreview media={element as Serie} type="serie" />
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