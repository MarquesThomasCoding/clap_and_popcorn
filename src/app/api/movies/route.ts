import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    let url = process.env.TMDB_BASE_URL + '/movie';
    let url2;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const query = searchParams.get('query');
    
    if (id) {
        url2 = `${url}/${id}/recommendations?append_to_response`;
        url += `/${id}?append_to_response=videos,credits`;
    }
    else if(query) {
        url += `/${query}?append_to_response=`;
    }
    const options = {
        headers: {
            'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
        },
    };
    const response = await fetch(url+'&language=fr-FR', options);
    let response2;
    if(url2) {
        response2 = await fetch(url2+'&language=fr-FR', options);
        console.log(response2);
    }
    const data = await response.json();
    if(response2) data.recommendations = await response2.json();
    return NextResponse.json(data);
}