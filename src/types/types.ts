export interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    genres: { id: number, name: string }[];
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    runtime: number;
    poster_path: string;
    tagline: string;
    origin_country: string[];
    videos: { results: { key: string, type: string }[] };
}

export interface Actor {
    profile_path: string;
    name: string;
    biography: string;
    movie_credits: {
        cast: Array<Movie>;
    };
}