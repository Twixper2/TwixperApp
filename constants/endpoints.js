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
	getTweet: "//participants/getTweet",
	feedEndpoint: "//participants/getFeed",
	userLikes: "//participants/getUserLikes",
	searchPeople: "//participants/search/people",
	searchTweets: "//participants/search/tweets",
	whoToFollow: "//participants/getWhoToFollow",
	usersTweets: "//participants/getUserTimeline",
	userFollowing: "//participants/getUserFriends",
	userFollowers: "//participants/getUserFollowers",
	getNotifications: "//participants/notifications",
	userDetails: "//participants/getUserEntityDetails",

	/*  Actions in Twitter */
	postTweet: "//participants/postTweet",

	likeTweet: "//participants/addAction/like",
	replyTweet: "//participants/addAction/reply",
	retweetTweet: "//participants/addAction/retweet",
};

/* Twitter Endpoint */
export const twitterEndpoints = {
	twitterOauthPath: "https://api.twitter.com/oauth/authorize?oauth_token=",
};
