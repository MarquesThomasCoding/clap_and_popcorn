import { Person } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
    let url: string = process.env.TMDB_BASE_URL + '/person';
    const { searchParams }: URL = new URL(request.url);
    const id: string | null = searchParams.get('id');
    const query: string | null = searchParams.get('query');
    
    if (id) {
        url += `/${id}?append_to_response=movie_credits`;
    }
    else if(query) {
        url += `/${query}?append_to_response=movie_credits`;
    }
    else {
        url = `${process.env.TMDB_BASE_URL}/person/popular?sort_by=popularity.desc`;
    }
    const options = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response: Response = await fetch(url+'&language=fr-FR', options);
    const data: Person = await response.json();
    return NextResponse.json(data);
}