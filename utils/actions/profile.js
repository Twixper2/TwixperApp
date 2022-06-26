import TweetObject from "../../models/tweet-object";
import TweetAuthor from "../../models/tweet-author";
import TweetBarData from "../../models/tweet-bar-data";
import UserTwitterEntity from "../../models/user-twitter-entity";

import { getUserLikes, getUserTimeline, getUserDetails } from "../serverService";
import { parseTwitterUserEntity } from "../helperFunctions";

import { setObjectValue } from "../storageFunctions";
import { collationNames, profileKeys } from "../../constants/commonKeys";

export const SET_USERS_LIKES = "SET_USERS_LIKES";
export const SET_USERS_TWEETS = "SET_USERS_TWEETS";
export const SET_USERS_DETAILS = "SET_USERS_DETAILS";

/* ----------------------------------------
	Profile Data
   ---------------------------------------- */

export const get_user_details = async (username) => {
	try {
		const response = await getUserDetails(username);

		if (response.status == 200) {
			const { entity_details } = response.data;

			const parsedInfo = parseTwitterUserEntity(entity_details);

			const userTwitterEntity = new UserTwitterEntity(
				parsedInfo.user_name,
				parsedInfo.user_handle,
				parsedInfo.friends_count,
				parsedInfo.followers_count,
				parsedInfo.profile_image_url,
				parsedInfo.cover_image_url,
				parsedInfo.user_description,
				parsedInfo.user_location,
				parsedInfo.when_joined,
				parsedInfo.user_url,
				parsedInfo.user_profession
			);

			await setObjectValue(collationNames.PROFILE + profileKeys.USER_ENTITY + username, {
				username: username,
				userEntity: userTwitterEntity,
			});
		} else if (response.status == 401 || response.status == 428) {
			// Unauthorized
			console.log("Unauthorized get_user_details");
		} else if (response.status == 502) {
			console.log("error in get_user_details");
			let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
			throw new Error(message);
		} else {
			console.log("error in get_user_details");
			let message = "Sorry, There was an error. Please try again later";
			throw new Error(message);
		}
	} catch (err) {
		console.log("error in get_user_details");
		console.log(err);
		let message = "Error while getting search tweets. Please refresh to try again.";
		throw new Error(message);
	}
};

export const get_user_tweets = async (username) => {
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

			await setObjectValue(collationNames.PROFILE + profileKeys.USER_TWEETS + username, {
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

export const get_user_likes = async (username) => {
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

			await setObjectValue(collationNames.PROFILE + profileKeys.USER_LIKES + username, {
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
