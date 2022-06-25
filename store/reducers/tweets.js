import {
	SET_FEED_TWEETS,
	SET_USERS_LIKES,
	SET_USERS_TWEETS,
	SET_TWEET_SCREEN,
	SET_WHO_TO_FOLLOW,
	SET_NOTIFICATIONS,
	SET_USER_FOLLOWING,
	SET_USER_FOLLOWERS,
} from "../actions/tweets";

const initialState = {
	feedTweets: [],
	whoToFollow: [],
	notifications: [],
	profile: {
		username: "",
		usersTweets: [],
		usersLikes: [],
	},
	userFollows: {
		userFollowing: [],
		userFollowers: [],
	},
	tweetScreen: {
		mainTweet: null,
		tweetsComments: [],
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_FEED_TWEETS:
			return {
				...state,
				feedTweets: action.feedTweets,
			};
		case SET_USERS_LIKES:
			return {
				...state,
				profile: {
					...state.profile,
					username: action.username,
					usersLikes: action.usersLikes,
				},
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
		case SET_USERS_TWEETS:
			return {
				...state,
				profile: {
					...state.profile,
					username: action.username,
					usersTweets: action.usersTweets,
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
