import { Movie, Person, Serie } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
    let url: string = process.env.TMDB_BASE_URL + '/trending';
    const { searchParams }: URL = new URL(request.url);
    const type: string | null = searchParams.get('type');
    
    if (type) {
        url += `/${type}/week`;
    }
    const options = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response: Response = await fetch(url+'?language=fr-FR', options);
    const data: Movie | Serie | Person = await response.json();

    return NextResponse.json(data);
}