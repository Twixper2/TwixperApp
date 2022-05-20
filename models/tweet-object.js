class TweetObject {
	constructor(tweetId, time, fullText, tweetAuthor, sharedTweet, isRetweet, isPromoted, actionsBarData) {
		this.time = time;
		this.tweetId = tweetId;
		this.fullText = fullText;
		this.tweetAuthor = tweetAuthor;
		this.sharedTweet = sharedTweet;
		this.isRetweet = isRetweet;
		this.isPromoted = isPromoted;
		this.actionsBarData = actionsBarData;
	}
}

export default TweetObject;
