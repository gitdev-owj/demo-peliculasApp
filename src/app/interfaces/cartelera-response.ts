export interface CarteleraResponse {
    total_pages:   number;
    dates:         Dates;
    page:          number;
    total_results: number;
    results:       Movie[];
}

export interface Dates {
    minimum: Date;
    maximum: Date;
}

export interface Movie {
    vote_average:      number;
    id:                number;
    overview:          string;
    release_date:      Date;
    adult:             boolean;
    backdrop_path:     string;
    title:             string;
    genre_ids:         number[];
    popularity:        number;
    original_language: string;
    original_title:    string;
    poster_path:       string;
    vote_count:        number;
    video:             boolean;
}