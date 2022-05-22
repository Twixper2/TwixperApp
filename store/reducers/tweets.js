import { SET_FEED_TWEETS, SET_SEARCH_TWEETS_RESULTS } from "../actions/tweets";

const initialState = {
	feedTweets: [],
	search: {
		query: "",
		tweetsResults: [],
		peopleResults: [],
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_FEED_TWEETS:
			return {
				...state,
				feedTweets: action.feedTweets,
			};
		case SET_SEARCH_TWEETS_RESULTS:
			return {
				...state,
				search: {
					...state.search,
					query: action.query,
					tweetsResults: action.tweetsResults,
				},
			};
		default:
			return state;
	}
};
