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
    videos: { results: TeaserVideo[] };
    recommendations: { results: Movie[] };
    credits: {
        cast: Person[];
        crew: Person[];
    };
    production_companies: Company[];
}

export interface Serie {
    id: number;
    media_type: string;
    name: string;
    backdrop_path: string;
    overview: string;
    genres: { id: number, name: string }[];
    first_air_date: string;
    last_air_date: string;
    episode_run_time: number[];
    vote_average: number;
    vote_count: number;
    popularity: number;
    poster_path: string;
    origin_country: string[];
    videos: { results: TeaserVideo[] };
    recommendations: { results: Serie[] };
    credits: {
        cast: Person[];
        crew: Person[];
    };
    production_companies: Company[];
}

export interface Person {
    id: number;
    media_type: string;
    name: string;
    // job?: string;
    profile_path: string;
    biography: string;
    birthday: string;
    deathday: string;
    place_of_birth: string;
    popularity: number;
    // known_for_department: string;
    movie_credits: {
        cast: Movie[];
    };
    tv_credits: {
        cast: Serie[];
    };
}

export interface Crew extends Person {
    job: string;
    known_for_department: string;
    character: string;
}

export interface Company {
    id: number;
    name: string;
    logo_path: string;
}

export interface TeaserVideo {
    key: string;
    type: string;
}