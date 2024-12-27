import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    let url = process.env.TMDB_BASE_URL + '/person';
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
        url += `/${id}?append_to_response=movie_credits`;
    }
    const options = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response = await fetch(url+'&language=fr-FR', options);
    const data = await response.json();
    return NextResponse.json(data);
}