import TweetObject from "../../models/tweet-object";
import TweetAuthor from "../../models/tweet-author";
import TweetBarData from "../../models/tweet-bar-data";

import { getFeed, searchForTweets } from "../../utils/serverService";

export const SET_FEED_TWEETS = "SET_FEED_TWEETS";
export const SET_SEARCH_TWEETS_RESULTS = "SET_SEARCH_TWEETS_RESULTS";

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

				for (const tweet_idx in tweetsFromServer) {
					const tweet = tweetsFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user_name,
						tweet.user_url_name,
						tweet.profile_link,
						tweet.profile_img_url,
						tweet.is_profile_verified
					);

					const tweetBarData = new TweetBarData(
						[true, false].random(),
						[true, false].random(),
						[true, false].random(),
						tweet.likes_count,
						tweet.retweets_count,
						tweet.comments_count
					);

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweetAuthor,
						tweet.shared_tweet,
						tweet.is_retweet,
						tweet.is_promoted,
						tweetBarData
					);

					if (tweet?.tweet_id) {
						feedTweetsArr.push(tweetObject);
					}
				}

				dispatch({
					type: SET_FEED_TWEETS,
					feedTweets: feedTweetsArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get feed");
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
		}
	};
};

export const get_search_tweets = (searchQuery) => {
	return async (dispatch) => {
		let searchTweetsArr = [];

		try {
			const response = await searchForTweets(searchQuery);

			if (response.status == 200) {
				let tweetsFromServer = JSON.parse(JSON.stringify(response.data));

				for (const tweet_idx in tweetsFromServer) {
					const tweet = tweetsFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user_name,
						tweet.user_url_name,
						tweet.profile_link,
						tweet.profile_img_url,
						tweet.is_profile_verified
					);

					const tweetBarData = new TweetBarData(
						[true, false].random(),
						[true, false].random(),
						[true, false].random(),
						tweet.likes_count,
						tweet.retweets_count,
						tweet.comments_count
					);

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweetAuthor,
						tweet.shared_tweet,
						tweet.is_retweet,
						tweet.is_promoted,
						tweetBarData
					);

					if (tweet?.tweet_id) {
						searchTweetsArr.push(tweetObject);
					}
				}

				dispatch({
					type: SET_SEARCH_TWEETS_RESULTS,
					query: searchQuery,
					tweetsResults: searchTweetsArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get feed");
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
			console.log("error in get_search_tweets");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

//  TODO: Delete!  Random for info Bar
Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};
