export interface Movie {
    id: number;
    media_type: string;
    title: string;
    backdrop_path: string;
    overview: string;
    genres: { id: number, name: string }[];
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    runtime: number;
    revenue: number;
    budget: number;
    poster_path: string;
    tagline: string;
    origin_country: string[];
    videos: { results: { key: string, type: string }[] };
}

export interface Serie {
    id: number;
    media_type: string;
    title: string;
    name: string;
    backdrop_path: string;
    overview: string;
    genres: { id: number, name: string }[];
    first_air_date: string;
    release_date: string;
    last_air_date: string;
    episode_run_time: number[];
    vote_average: number;
    vote_count: number;
    popularity: number;
    poster_path: string;
    origin_country: string[];
    videos: { results: { key: string, type: string }[] };
}

export interface Person {
    id: number;
    media_type: string;
    name: string;
    profile_path: string;
    biography: string;
    birthday: string;
    deathday: string;
    place_of_birth: string;
    popularity: number;
    known_for_department: string;
    movie_credits: {
        cast: Array<Movie>;
    };
    tv_credits: {
        cast: Array<Serie>;
    };
}