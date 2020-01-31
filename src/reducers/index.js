import { combineReducers } from "redux";
import {
	SET_ERROR,
	SET_TOTAL_RESULTS,
	RECEIVE_MOVIES,
	LOADING
} from "../actions";

const movies = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_MOVIES:
			return action.payload.movies;

		default:
			return state;
	}
};

const errorReducer = (state = "", action) => {
	switch (action.type) {
		case SET_ERROR:
			return action.payload.error;

		default:
			return state;
	}
};

const loadingReducer = (state = false, action) => {
	switch (action.type) {
		case LOADING:
			return action.payload.value;

		case RECEIVE_MOVIES:
			return false;

		default:
			return state;
	}
};

const totalResults = (state = 0, action) => {
	switch (action.type) {
		case SET_TOTAL_RESULTS:
			return action.payload.totalResults;

		default:
			return state;
	}
};

export default combineReducers({
	movies,
	error: errorReducer,
	loading: loadingReducer,
	totalResults
});
