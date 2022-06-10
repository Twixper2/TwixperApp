export const serverEndpoints = {
	/* Twitter Auth */
	twitterRequestTokenEndpoint: "/twitterAuthRequestToken",
	twitterAccessTokenEndpoint: "/twitterAuthAccessToken",
	checkCredentialsEndpoint: "/checkUserByCredentials",

	/* User Login - username & password */
	participantLogin: "//twitterSeleniumAuth",

	/* Experiment Register */
	registerToExperimentEndpoint: "/registerToExperiment",

	/* Data to Display */
	feedEndpoint: "/participants/getFeed",
	userLikes: "/participants/getUserLikes",
	searchPeople: "/participants/searchUsers",
	searchTweets: "/participants/searchTweets",
	usersTweets: "/participants/getUserTimeline",
	userFollowing: "/participants/getUserFriends",
	userFollowers: "/participants/getUserFollowers",
};

/* Twitter Endpoint */
export const twitterEndpoints = {
	twitterOauthPath: "https://api.twitter.com/oauth/authorize?oauth_token=",
};
