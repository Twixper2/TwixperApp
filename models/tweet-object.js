class TweetObject {
	constructor(tweetId, time, fullText, media, pixelMedia, tweetAuthor, isQuotedStatus, quotedStatus, actionsBarData) {
		this.time = time;
		this.media = media;
		this.tweetId = tweetId;
		this.fullText = fullText;
		this.pixelMedia = pixelMedia;
		this.tweetAuthor = tweetAuthor;
		this.quotedStatus = quotedStatus;
		this.isQuotedStatus = isQuotedStatus;
		this.actionsBarData = actionsBarData;
	}
}

export default TweetObject;
