import { SET_FEED_TWEETS, SET_SEARCH_TWEETS_RESULTS, SET_USERS_TWEETS_RESULTS } from "../actions/tweets";

const initialState = {
	feedTweets: [],
	search: {
		query: "",
		tweetsResults: [],
		peopleResults: [],
	},
	profile: {
		username: "",
		usersTweets: [],
		usersLikes: [],
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
		case SET_USERS_TWEETS_RESULTS:
			return {
				...state,
				profile: {
					...state.profile,
					username: action.username,
					usersTweets: action.usersTweets,
				},
			};
		default:
			return state;
	}
};
