import { Movie, Person, Serie } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
    const { searchParams }: URL = new URL(request.url);
    const query: string | null = searchParams.get('query');
    let url: string = process.env.TMDB_BASE_URL + '/search/multi';
    url += `?query=${query}`;
    const options: RequestInit = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response: Response = await fetch(url+'&language=fr-FR', options);
    const data: Movie | Serie | Person = await response.json();

    return NextResponse.json(data);
}