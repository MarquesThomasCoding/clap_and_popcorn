import { Serie } from '@/types/types';
import SeriePreview from './SeriePreview';

export default function SeriesListPreview(
    { series, title }: Readonly<{ series: Serie[], title: string }>
) {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold z-[1]">{title}</h1>
            <div className='overflow-x-auto'>
                <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${series.length}, 200px)` }}>
                    {series.slice(0,100).map((serie) => (
                        <SeriePreview serie={serie} key={serie.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}