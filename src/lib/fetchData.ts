import { Crew, Movie, Person, Serie } from "@/types/types";

// MOVIE

export async function fetchMovieById(
  id: string
): Promise<Movie & { credits: { cast: Crew[]; crew: Crew[] } }> {
  const movie: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies?id=${id}`
  );
  const movieData: Movie & { credits: { cast: Crew[]; crew: Crew[] } } =
    await movie.json();
  return movieData;
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/movies?query=popular"
  );
  const data = await response.json();
  return data.results;
}

export async function fetchUpcomingMovies(): Promise<Movie[]> {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/movies?query=upcoming"
  );
  const data: { results: Movie[] } = await response.json();
  return data.results;
}

export async function fetchTopRatedMovies(): Promise<Movie[]> {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/movies?query=top_rated"
  );
  const data: { results: Movie[] } = await response.json();
  return data.results;
}

export async function fetchTrendingMovies(): Promise<Movie[]> {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/trending?type=movie"
  );
  const data: { results: Movie[] } = await response.json();
  return data.results;
}

export async function fetchFrenchMovies(): Promise<Movie[]> {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/movies?origin_country=FR"
  );
  const data: { results: Movie[] } = await response.json();
  return data.results;
}

// PERSON

export async function fetchActor(id: string): Promise<Person> {
  const actorResponse: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/person?id=${id}`
  );
  const actorData: Person = await actorResponse.json();
  return actorData;
}

export const fetchTrendingAll = async (): Promise<(Movie | Serie | Person)[]> => {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/trending?type=all"
  );
  const data: { results: (Movie | Serie | Person)[] } = await response.json();
  return data.results;
};

export const fetchTrendingTV = async (): Promise<Serie[]> => {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/trending?type=tv"
  );
  const data: { results: Serie[] } = await response.json();
  return data.results;
};

export const fetchTrendingPersons = async (): Promise<Person[]> => {
  const response: Response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/person?query=popular"
  );
  const data: { results: Person[] } = await response.json();
  return data.results;
};