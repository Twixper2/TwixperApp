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
};

/* Twitter Endpoint */
export const twitterEndpoints = {
	twitterOauthPath: "https://api.twitter.com/oauth/authorize?oauth_token=",
};
