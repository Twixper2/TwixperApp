import { POST_TWEET, SET_FEED_TWEETS, SET_TWEET_SCREEN, SET_WHO_TO_FOLLOW, SET_NOTIFICATIONS } from "../actions/tweets";

const initialState = {
	feedTweets: [],
	whoToFollow: [],
	notifications: [],
	tweetScreen: {
		mainTweet: null,
		tweetsComments: [],
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case POST_TWEET:
			return {
				...state,
				feedTweets: [action.postedTweet].concat(state.feedTweets),
			};
		case SET_FEED_TWEETS:
			return {
				...state,
				feedTweets: action.feedTweets,
			};
		case SET_TWEET_SCREEN:
			return {
				...state,
				tweetScreen: {
					...state.tweetScreen,
					mainTweet: action.mainTweet,
					tweetsComments: action.tweetsComments,
				},
			};
		case SET_WHO_TO_FOLLOW:
			return {
				...state,
				whoToFollow: action.whoToFollow,
			};
		case SET_NOTIFICATIONS:
			return {
				...state,
				notifications: action.notifications,
			};
		default:
			return state;
	}
};
