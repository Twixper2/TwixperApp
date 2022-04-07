import TweetData from "../../models/tweet-data";

import { getFeed } from "../../utils/serverService";
import { parseTwitterDate } from "../../utils/helperFunctions";

export const SET_FEED_TWEETS = "SET_FEED_TWEETS";

export const get_feed_tweets = (maxID = null) => {
	return async (dispatch, getState) => {
		let feedTweetsArr;

		if (maxID === null) {
			feedTweetsArr = [];
		} else {
			feedTweetsArr = getState().tweets.feedTweets;
		}

		try {
			const response = await getFeed(maxID);

			if (response.status == 200) {
				let tweetsFromServer = JSON.parse(JSON.stringify(response.data));

				const curTweetsArrLen = feedTweetsArr.length;

				if (curTweetsArrLen > 0) {
					// Sometimes the first tweet already exists in the tweet array
					if (feedTweetsArr[curTweetsArrLen - 1].id_str == tweetsFromServer[0].id_str) {
						tweetsFromServer.shift(); // Remove the first tweet from the server
					}
				}

				for (const tweet in tweetsFromServer) {
					let myTweetPreview = null;
					let tweetId = "";
					let time = "";
					let retweet_details = {
						is_retweet: false,
						retweet_author_username: "",
						retweet_author_fullName: "",
						retweet_author_idStr: "",
					};
					let author = {
						userFullName: "",
						userName: "",
						idStr: "",
						profileImgUrl: "",
						isVerified: false,
					};

					myTweetPreview = tweetsFromServer[tweet];
					let tweetPrev = myTweetPreview;
					tweetId = tweetPrev.id_str;
					time = parseTwitterDate(tweetPrev.created_at);

					// If this is a retweet, the tweetPrev should be the original tweet
					if (tweetPrev.retweeted_status) {
						retweet_details = {
							is_retweet: true,
							retweet_author_username: tweetPrev.user.screen_name,
							retweet_author_fullName: tweetPrev.user.name,
							retweet_author_idStr: tweetPrev.user.id_str,
						};
						tweetPrev = tweetPrev.retweeted_status;
						/* The time of the retweet: */
						// this.time = parseTwitterDateFunc(tweetPrev.created_at);
						/* The id of the retweet: */
						// this.tweetId = tweetPrev.id;

						/* The time of the original tweet: */
						time = parseTwitterDate(tweetPrev.created_at);
						/* The id of the original tweet: */
						// Should be in comment for later use
						const original_retweeted_id = tweetPrev.id;
						myTweetPreview = tweetPrev;
					}

					const userJson = tweetPrev.user;

					author.idStr = userJson?.id_str;
					author.userFullName = userJson?.name;
					author.userName = userJson?.screen_name;
					// In order to get high quality img:  replace("_normal", "").
					author.profileImgUrl = userJson?.profile_image_url_https.replace("_normal", "");
					author.isVerified = userJson?.verified;

					feedTweetsArr.push(new TweetData(tweetId, time, retweet_details, author));
				}

				// feedTweetsArr.push(...tweetsFromServer);

				dispatch({
					type: SET_FEED_TWEETS,
					feedTweets: feedTweetsArr,
				});

				//  TODO: Need This?

				// Add tweets and users to local storage
				// addToLsByList("tweet", feedTweetsArr, "feedTweetsOrder");

				// Observe when the user scroll to bottom
				// this.$refs.tpl.setObserver();
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get feed");

				//  TODO: Need This?
				// localStorage.removeItem("registeredToExperiment");
				// window.location.reload();
			} else if (response.status == 502) {
				console.log("error in get_feed_tweets");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_feed_tweets");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_feed_tweets");
			console.log(err);
			let message = "Error while getting feed tweets. Please refresh to try again.";
			throw new Error(message);

			// if (err.includes("Sorry,")) {
			// 	throw new Error(err);
			// } else {
			// 	console.log("error in get_feed_tweets");
			// 	console.log(err);
			// 	let message = "Error while getting feed tweets. Please refresh to try again.";
			// 	throw new Error(message);
			// }
		}
	};
};
