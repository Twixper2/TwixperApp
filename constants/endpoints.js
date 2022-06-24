export const serverEndpoints = {
	/* Twitter Auth */
	twitterRequestTokenEndpoint: "/twitterAuthRequestToken",
	twitterAccessTokenEndpoint: "/twitterAuthAccessToken",
	checkCredentialsEndpoint: "/checkUserByCredentials",

	/* User Login - username & password */
	participantLogin: "//twitterSeleniumAuth",

	/* Experiment Register */
	registerToExperimentEndpoint: "//registerToExperiment",

	/* Data to Display */
	getTweet: "/participants/getTweet",
	feedEndpoint: "/participants/getFeed",
	userLikes: "/participants/getUserLikes",
	searchPeople: "/participants/searchUsers",
	searchTweets: "/participants/searchTweets",
	whoToFollow: "/participants/getWhoToFollow",
	usersTweets: "/participants/getUserTimeline",
	userFollowing: "/participants/getUserFriends",
	userFollowers: "/participants/getUserFollowers",

	getNotifications: "/participants/notifications",
};

/* Twitter Endpoint */
export const twitterEndpoints = {
	twitterOauthPath: "https://api.twitter.com/oauth/authorize?oauth_token=",
};
