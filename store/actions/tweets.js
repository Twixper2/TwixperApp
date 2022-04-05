import TweetData from "../../models/tweet-data";

import { getFeed } from "../../utils/serverService";

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
				feedTweetsArr.push(...tweetsFromServer);

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
