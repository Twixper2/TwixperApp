import TweetObject from "../../models/tweet-object";
import TweetAuthor from "../../models/tweet-author";
import PersonEntity from "../../models/person-entity";
import TweetBarData from "../../models/tweet-bar-data";

import {
	getFeed,
	getTweetPage,
	getUserLikes,
	getWhoToFollow,
	searchForTweets,
	searchForPeople,
	getUserTimeline,
	getUserFollowing,
	getUserFollowers,
} from "../../utils/serverService";

export const SET_FEED_TWEETS = "SET_FEED_TWEETS";
export const SET_USERS_LIKES = "SET_USERS_LIKES";
export const SET_USERS_TWEETS = "SET_USERS_TWEETS";
export const SET_TWEET_SCREEN = "SET_TWEET_SCREEN";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_WHO_TO_FOLLOW = "SET_WHO_TO_FOLLOW";
export const CLEAR_SEARCH_QUERY = "CLEAR_SEARCH_QUERY";
export const SET_USER_FOLLOWING = "SET_USER_FOLLOWING";
export const SET_USER_FOLLOWERS = "SET_USER_FOLLOWERS";
export const SET_SEARCH_TWEETS_RESULTS = "SET_SEARCH_TWEETS_RESULTS";
export const SET_SEARCH_PEOPLE_RESULTS = "SET_SEARCH_PEOPLE_RESULTS";

/* ----------------------------------------
	Participant's  Data
   ---------------------------------------- */

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

				const curTweetsArrLen = feedTweetsArr?.length;
				if (curTweetsArrLen > 0) {
					// Sometimes the first tweet already exists in the tweet array
					if (feedTweetsArr[curTweetsArrLen - 1].id_str == tweetsFromServer[0].id_str) {
						tweetsFromServer.shift(); // Remove the first tweet from the server
					}
				}

				for (let tweet_idx = 0; tweet_idx < tweetsFromServer.length; tweet_idx++) {
					const tweet = tweetsFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user.name,
						"@" + tweet.user.screen_name,
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

					let quotedStatus = null;
					if (tweet.quoted_status !== null) {
						const quotedStatusAuthor = new TweetAuthor(
							tweet.quoted_status.user.name,
							"@" + tweet.quoted_status.user.screen_name,
							tweet.quoted_status.profile_link,
							tweet.quoted_status.profile_img_url,
							tweet.quoted_status.is_profile_verified
						);

						const quotedStatusTweet = new TweetObject(
							tweet.quoted_status.tweet_id,
							tweet.quoted_status.created_at,
							tweet.quoted_status.full_text,
							tweet.quoted_status.entities.media,
							tweet.quoted_status.pixel_media,
							quotedStatusAuthor,
							false,
							null,
							null
						);

						quotedStatus = quotedStatusTweet;
					}

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweet.entities.media,
						tweet.pixel_media,
						tweetAuthor,
						tweet.is_quote_status,
						quotedStatus,
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

export const get_who_to_follow = (username) => {
	return async (dispatch) => {
		let userWhoToFollowArr = [];

		try {
			const response = await getWhoToFollow(username);

			if (response.status == 200) {
				let whoToFollowFromServer = JSON.parse(JSON.stringify(response.data));

				for (let person_idx = 0; person_idx < whoToFollowFromServer.length; person_idx++) {
					const person = whoToFollowFromServer[person_idx];

					const personEntity = new PersonEntity(
						person.name,
						person.screen_name,
						person.img,
						person.description,
						person.FollowingStatus,
						person.is_profile_verified
					);

					if (person?.screen_name) {
						userWhoToFollowArr.push(personEntity);
					}
				}

				dispatch({
					type: SET_WHO_TO_FOLLOW,
					whoToFollow: userWhoToFollowArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_who_to_follow");
			} else if (response.status == 502) {
				console.log("error in get_who_to_follow");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_who_to_follow");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_who_to_follow");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

/* ----------------------------------------
	Search  Data
   ---------------------------------------- */

export const set_search_query = (searchQuery) => {
	return { type: searchQuery === "" ? CLEAR_SEARCH_QUERY : SET_SEARCH_QUERY, query: searchQuery };
};

export const get_search_tweets = (searchQuery) => {
	return async (dispatch) => {
		let searchTweetsArr = [];

		try {
			const response = await searchForTweets(searchQuery);

			if (response.status == 200) {
				let tweetsFromServer = JSON.parse(JSON.stringify(response.data));

				for (let tweet_idx = 0; tweet_idx < tweetsFromServer.length; tweet_idx++) {
					const tweet = tweetsFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user.name,
						"@" + tweet.user.screen_name,
						tweet.profile_link,
						tweet.profile_img_url,
						tweet.is_profile_verified
					);

					const tweetBarData = new TweetBarData(
						false,
						false,
						false,
						tweet.likes_count,
						tweet.retweets_count,
						tweet.comments_count
					);

					let quotedStatus = null;
					if (tweet.quoted_status !== null) {
						const quotedStatusAuthor = new TweetAuthor(
							tweet.quoted_status.user.name,
							"@" + tweet.quoted_status.user.screen_name,
							tweet.quoted_status.profile_link,
							tweet.quoted_status.profile_img_url,
							tweet.quoted_status.is_profile_verified
						);

						const quotedStatusTweet = new TweetObject(
							tweet.quoted_status.tweet_id,
							tweet.quoted_status.created_at,
							tweet.quoted_status.full_text,
							tweet.quoted_status.entities.media,
							tweet.quoted_status.pixel_media,
							quotedStatusAuthor,
							false,
							null,
							null
						);

						quotedStatus = quotedStatusTweet;
					}

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweet.entities.media,
						tweet.pixel_media,
						tweetAuthor,
						tweet.is_quote_status,
						quotedStatus,
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
				console.log("Unauthorized get_search_tweets");
			} else if (response.status == 502) {
				console.log("error in get_search_tweets");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_search_tweets");
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

export const get_search_people = (searchQuery) => {
	return async (dispatch) => {
		let searchPeopleArr = [];

		try {
			const response = await searchForPeople(searchQuery);

			if (response.status == 200) {
				let peopleFromServer = JSON.parse(JSON.stringify(response.data));

				for (let person_idx = 0; person_idx < peopleFromServer.length; person_idx++) {
					const person = peopleFromServer[person_idx];

					const personEntity = new PersonEntity(
						person.name,
						person.screen_name,
						person.img,
						person.description,
						person.FollowingStatus,
						person.is_profile_verified
					);

					if (person?.screen_name) {
						searchPeopleArr.push(personEntity);
					}
				}

				dispatch({
					type: SET_SEARCH_PEOPLE_RESULTS,
					query: searchQuery,
					peopleResults: searchPeopleArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_search_people");
			} else if (response.status == 502) {
				console.log("error in get_search_people");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_search_people");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_search_people");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

/* ----------------------------------------
	Profile Data
   ---------------------------------------- */

export const get_tweet_screen = (tweetData) => {
	return async (dispatch) => {
		let tweetsCommentsArr = [];

		const tweetId = tweetData.tweetId;
		const username = tweetData.tweetAuthor.userHandle.split("@")[1];

		try {
			const response = await getTweetPage(tweetId, username);

			if (response.status == 200) {
				let commentsFromServer = JSON.parse(JSON.stringify(response.data));

				for (let tweet_idx = 0; tweet_idx < commentsFromServer.length; tweet_idx++) {
					const tweet = commentsFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user.name,
						"@" + tweet.user.screen_name,
						tweet.profile_link,
						tweet.profile_img_url,
						tweet.is_profile_verified
					);

					const tweetBarData = new TweetBarData(
						tweet.favorited,
						tweet.retweeted,
						[true, false].random(),
						tweet.likes_count,
						tweet.retweets_count,
						tweet.comments_count
					);

					let quotedStatus = null;
					if (tweet.quoted_status !== null) {
						const quotedStatusAuthor = new TweetAuthor(
							tweet.quoted_status.user.name,
							"@" + tweet.quoted_status.user.screen_name,
							tweet.quoted_status.profile_link,
							tweet.quoted_status.profile_img_url,
							tweet.quoted_status.is_profile_verified
						);

						const quotedStatusTweet = new TweetObject(
							tweet.quoted_status.tweet_id,
							tweet.quoted_status.created_at,
							tweet.quoted_status.full_text,
							tweet.quoted_status.entities.media,
							tweet.quoted_status.pixel_media,
							quotedStatusAuthor,
							false,
							null,
							null
						);

						quotedStatus = quotedStatusTweet;
					}

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweet.entities.media,
						tweet.pixel_media,
						tweetAuthor,
						tweet.is_quote_status,
						quotedStatus,
						tweetBarData
					);

					if (tweet?.tweet_id) {
						tweetsCommentsArr.push(tweetObject);
					}
				}

				dispatch({
					type: SET_TWEET_SCREEN,
					mainTweet: tweetData,
					tweetsComments: tweetsCommentsArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_tweet_screen");
			} else if (response.status == 502) {
				console.log("error in get_tweet_screen");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_tweet_screen");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_tweet_screen");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

/* ----------------------------------------
	Profile Data
   ---------------------------------------- */

export const get_user_tweets = (username) => {
	return async (dispatch) => {
		let usersTweetsArr = [];

		try {
			const response = await getUserTimeline(username);

			if (response.status == 200) {
				let tweetsFromServer = JSON.parse(JSON.stringify(response.data));

				for (let tweet_idx = 0; tweet_idx < tweetsFromServer.length; tweet_idx++) {
					const tweet = tweetsFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user.name,
						"@" + tweet.user.screen_name,
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

					let quotedStatus = null;
					if (tweet.quoted_status !== null) {
						const quotedStatusAuthor = new TweetAuthor(
							tweet.quoted_status.user.name,
							"@" + tweet.quoted_status.user.screen_name,
							tweet.quoted_status.profile_link,
							tweet.quoted_status.profile_img_url,
							tweet.quoted_status.is_profile_verified
						);

						const quotedStatusTweet = new TweetObject(
							tweet.quoted_status.tweet_id,
							tweet.quoted_status.created_at,
							tweet.quoted_status.full_text,
							tweet.quoted_status.entities.media,
							tweet.quoted_status.pixel_media,
							quotedStatusAuthor,
							false,
							null,
							null
						);

						quotedStatus = quotedStatusTweet;
					}

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweet.entities.media,
						tweet.pixel_media,
						tweetAuthor,
						tweet.is_quote_status,
						quotedStatus,
						tweetBarData
					);

					if (tweet?.tweet_id) {
						usersTweetsArr.push(tweetObject);
					}
				}

				dispatch({
					type: SET_USERS_TWEETS,
					username: username,
					usersTweets: usersTweetsArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_user_tweets");
			} else if (response.status == 502) {
				console.log("error in get_user_tweets");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_user_tweets");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_user_tweets");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

export const get_user_likes = (username) => {
	return async (dispatch) => {
		let usersLikesArr = [];

		try {
			const response = await getUserLikes(username);

			if (response.status == 200) {
				let likesFromServer = JSON.parse(JSON.stringify(response.data));

				for (let tweet_idx = 0; tweet_idx < likesFromServer.length; tweet_idx++) {
					const tweet = likesFromServer[tweet_idx];

					const tweetAuthor = new TweetAuthor(
						tweet.user.name,
						"@" + tweet.user.screen_name,
						tweet.profile_link,
						tweet.profile_img_url,
						tweet.is_profile_verified
					);

					const tweetBarData = new TweetBarData(
						true,
						[true, false].random(),
						[true, false].random(),
						tweet.likes_count,
						tweet.retweets_count,
						tweet.comments_count
					);

					let quotedStatus = null;
					if (tweet.quoted_status !== null) {
						const quotedStatusAuthor = new TweetAuthor(
							tweet.quoted_status.user.name,
							"@" + tweet.quoted_status.user.screen_name,
							tweet.quoted_status.profile_link,
							tweet.quoted_status.profile_img_url,
							tweet.quoted_status.is_profile_verified
						);

						const quotedStatusTweet = new TweetObject(
							tweet.quoted_status.tweet_id,
							tweet.quoted_status.created_at,
							tweet.quoted_status.full_text,
							tweet.quoted_status.entities.media,
							tweet.quoted_status.pixel_media,
							quotedStatusAuthor,
							false,
							null,
							null
						);

						quotedStatus = quotedStatusTweet;
					}

					const tweetObject = new TweetObject(
						tweet.tweet_id,
						tweet.created_at,
						tweet.full_text,
						tweet.entities.media,
						tweet.pixel_media,
						tweetAuthor,
						tweet.is_quote_status,
						quotedStatus,
						tweetBarData
					);

					if (tweet?.tweet_id) {
						usersLikesArr.push(tweetObject);
					}
				}

				dispatch({
					type: SET_USERS_LIKES,
					username: username,
					usersLikes: usersLikesArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_user_likes");
			} else if (response.status == 502) {
				console.log("error in get_user_likes");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_user_likes");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_user_likes");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

export const get_user_following = (username) => {
	return async (dispatch) => {
		let userFollowingArr = [];

		try {
			const response = await getUserFollowing(username);

			if (response.status == 200) {
				let followingFromServer = JSON.parse(JSON.stringify(response.data));

				for (let person_idx = 0; person_idx < followingFromServer.length; person_idx++) {
					const person = followingFromServer[person_idx];

					const personEntity = new PersonEntity(
						person.name,
						person.screen_name,
						person.img,
						person.description,
						person.FollowingStatus,
						person.is_profile_verified
					);

					if (person?.screen_name) {
						userFollowingArr.push(personEntity);
					}
				}

				dispatch({
					type: SET_USER_FOLLOWING,
					query: username,
					userFollowing: userFollowingArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_user_following");
			} else if (response.status == 502) {
				console.log("error in get_user_following");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_user_following");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_user_following");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

export const get_user_followers = (username) => {
	return async (dispatch) => {
		let userFollowersArr = [];

		try {
			const response = await getUserFollowers(username);

			if (response.status == 200) {
				let followersFromServer = JSON.parse(JSON.stringify(response.data));

				for (let person_idx = 0; person_idx < followersFromServer.length; person_idx++) {
					const person = followersFromServer[person_idx];

					const personEntity = new PersonEntity(
						person.name,
						person.screen_name,
						person.img,
						person.description,
						person.FollowingStatus,
						person.is_profile_verified
					);

					if (person?.screen_name) {
						userFollowersArr.push(personEntity);
					}
				}

				dispatch({
					type: SET_USER_FOLLOWERS,
					query: username,
					userFollowers: userFollowersArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized get_user_followers");
			} else if (response.status == 502) {
				console.log("error in get_user_followers");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in get_user_followers");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in get_user_followers");
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
