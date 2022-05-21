import { SET_FEED_TWEETS, SET_SEARCH_TWEETS } from "../actions/tweets";

const initialState = {
	feedTweets: [],
	searchTweets: [],
	searchPeople: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_FEED_TWEETS:
			return {
				...state,
				feedTweets: action.feedTweets,
			};
		case SET_SEARCH_TWEETS:
			return {
				...state,
				searchTweets: action.searchTweets,
			};
		default:
			return state;
	}
};
