import { Movie } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) : Promise<Response> {
    let url: string = process.env.TMDB_BASE_URL + '/movie';
    let moreURL: string | null = null;
    const { searchParams }: URL = new URL(request.url);
    const id: string | null = searchParams.get('id');
    const query: string | null = searchParams.get('query');
    const origin_country: string | null = searchParams.get('origin_country');
    
    if (id) {
        moreURL = `${url}/${id}/recommendations?append_to_response`;
        url += `/${id}?append_to_response=videos,credits`;
    }
    else if(query) {
        url += `/${query}?append_to_response=`;
    }
    else if(origin_country) {
        url = `${process.env.TMDB_BASE_URL}/discover/movie?with_origin_country=${origin_country}`;
    }
    else {
        url = `${process.env.TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    }
    const options = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response: Response = await fetch(url+'&language=fr-FR', options);
    let moreResponse: Response | null = null;
    if(moreURL) {
        moreResponse = await fetch(moreURL+'&language=fr-FR', options);
    }
    const data: Movie = await response.json();
    if(moreResponse) data.recommendations = await moreResponse.json();
    return NextResponse.json(data);
}