/* ----------------------------------------
	Storage Keys
   ---------------------------------------- */

export const storageKeys = {
	/* User Credentials */
	USERNAME: "username",
	PASSWORD: "password",

	/* User Statues */
	REGISTERED_EXPERIMENT: "registeredToExperiment",

	/* data for server */
	ACCESS_TOKEN: "access_token",
};

/* ----------------------------------------
	Headers Keys
   ---------------------------------------- */

export const headerKeys = {
	USER_KEY: "user",
	ACCESS_TOKEN_KEY: "accesstoken",
};

/* ----------------------------------------
	Local Storage Keys
   ---------------------------------------- */

export const collationNames = {
	TWEETS: "tweets_",
	SEARCH: "search_",
	PROFILE: "profile_",
	FOLLOWS: "follows_",
};

export const localStorageKeys = {
	USERNAME: "username",
	USER_TWITTER_ENTITY: "userTwitterEntity",
	PROVIDED_CREDENTIALS: "providedCredentials",
	REGISTERED_TO_EXPERIMENT: "registeredToExperiment",
};

export const tweetsKeys = {
	FEED_TWEETS: "feedTweets",
	TWEET_SCREEN: "tweetScreen_", // + tweetId
	WHO_TO_FOLLOW: "whoToFollow",
	NOTIFICATIONS: "notifications",
};

export const followsKeys = {
	USERNAME: "username",
	USER_FOLLOWING: "userFollowing_", // + username
	USER_FOLLOWERS: "userFollowers_", // + username
};

export const profileKeys = {
	USERNAME: "username",
	USER_LIKES: "usersLikes_", // + username
	USER_ENTITY: "userEntity_", // + username
	USER_TWEETS: "usersTweets_", // + username
};

export const searchKeys = {
	QUERY: "query",
	TWEETS_RESULTS: "tweetsResults_", // + query
	PEOPLE_RESULTS: "peopleResults_", // + query
};
