import { Serie } from '@/types/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<Response> {
    let baseURL: string = process.env.TMDB_BASE_URL + '/tv';
    let moreURL: string | null = null;
    const { searchParams }: URL = new URL(request.url);
    const id: string | null = searchParams.get('id');
    const query: string | null = searchParams.get('query');
    const origin_country: string | null = searchParams.get('origin_country');
    
    if (id) {
        moreURL = `${baseURL}/${id}/recommendations?append_to_response`;
        baseURL += `/${id}?append_to_response=videos,credits`;
    }
    else if(query) {
        baseURL += `/${query}?append_to_response=`;
    }
    else if(origin_country) {
        baseURL = `${process.env.TMDB_BASE_URL}/discover/tv?with_origin_country=${origin_country}`;
    }
    else {
        baseURL = `${process.env.TMDB_BASE_URL}/discover/tv?sort_by=popularity.desc`;
    }
    const options: RequestInit = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response: Response = await fetch(baseURL+'&language=fr-FR', options);
    let moreResponse: Response | null = null;
    if(moreURL) {
        moreResponse = await fetch(moreURL+'&language=fr-FR', options);
    }
    const data: Serie = await response.json();
    if(moreResponse) data.recommendations = await moreResponse.json();

    return NextResponse.json(data);
}