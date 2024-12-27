import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    let url = process.env.TMDB_BASE_URL + '/search/multi';
    url += `?query=${query}`;
    const options = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response = await fetch(url+'&language=fr-FR', options);
    const data = await response.json();

    return NextResponse.json(data);
}