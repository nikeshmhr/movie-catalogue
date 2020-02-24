import "regenerator-runtime/runtime";

export const SEARCH_MOVIE = "SEARCH_MOVIE";
export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
export const LOADING = "LOADING";
export const SEARCH_COMPLETE = "SEARCH_COMPLETE";
export const SET_ERROR = "SET_ERROR";
export const SET_TOTAL_RESULTS = "SET_TOTAL_RESULTS";

export const searchMovie = (searchTerm, pageNo = 1) => async dispatch => {
	dispatch(setLoading(true));
	dispatch(setError());

	// Call api to search movies
	const res = await fetch(
		`http://www.omdbapi.com/?apikey=c32f98b8&type=movie&s=${searchTerm}&page=${pageNo}`
	);
	const json = await res.json();
	let movies = [];
	let error = "";
	let totalResults = 0;
	if (json.Response === "True") {
		movies = [
			...json.Search.sort(({ Title: a }, { Title: b }) =>
				a < b ? -1 : a > b ? 1 : 0
			)
		];
		totalResults = json.totalResults;
	} else {
		error = json.Error;
	}
	dispatch(receiveMovies(movies));
	dispatch(setError(error));
	dispatch(setTotalResults(totalResults));
};

const receiveMovies = movies => ({
	type: RECEIVE_MOVIES,
	payload: {
		movies
	}
});

const setError = (error = "") => ({ type: SET_ERROR, payload: { error } });

const setTotalResults = totalResults => ({
	type: SET_TOTAL_RESULTS,
	payload: { totalResults }
});

const setLoading = value => ({
	type: LOADING,
	payload: {
		value
	}
});
