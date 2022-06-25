import {
	SET_SEARCH_QUERY,
	CLEAR_SEARCH_QUERY,
	SET_SEARCH_TWEETS_RESULTS,
	SET_SEARCH_PEOPLE_RESULTS,
} from "../actions/search";

const initialState = {
	query: "",
	tweetsResults: [],
	peopleResults: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SEARCH_QUERY:
			return {
				...state,
				query: action.query,
			};
		case CLEAR_SEARCH_QUERY:
			return {
				query: "",
				tweetsResults: [],
				peopleResults: [],
			};
		case SET_SEARCH_TWEETS_RESULTS:
			return {
				...state,
				query: action.query,
				tweetsResults: action.tweetsResults,
			};
		case SET_SEARCH_PEOPLE_RESULTS:
			return {
				...state,
				query: action.query,
				peopleResults: action.peopleResults,
			};
		default:
			return state;
	}
};
