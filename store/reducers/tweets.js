import {
	SET_FEED_TWEETS,
	SET_USER_FOLLOWING,
	SET_USER_FOLLOWERS,
	SET_SEARCH_TWEETS_RESULTS,
	SET_USERS_TWEETS_RESULTS,
	SET_SEARCH_PEOPLE_RESULTS,
} from "../actions/tweets";

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
	userFollows: {
		userFollowing: [],
		userFollowers: [],
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_FEED_TWEETS:
			return {
				...state,
				feedTweets: action.feedTweets,
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
		case SET_SEARCH_TWEETS_RESULTS:
			return {
				...state,
				search: {
					...state.search,
					query: action.query,
					tweetsResults: action.tweetsResults,
				},
			};
		case SET_SEARCH_PEOPLE_RESULTS:
			return {
				...state,
				search: {
					...state.search,
					query: action.query,
					peopleResults: action.peopleResults,
				},
			};
		case SET_USER_FOLLOWING:
			return {
				...state,
				userFollows: {
					...state.userFollows,
					userFollowing: action.userFollowing,
				},
			};
		case SET_USER_FOLLOWERS:
			return {
				...state,
				userFollows: {
					...state.userFollows,
					userFollowers: action.userFollowers,
				},
			};
		default:
			return state;
	}
};
