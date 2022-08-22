import TweetObject from "../../models/tweet-object";
import TweetAuthor from "../../models/tweet-author";
import PersonEntity from "../../models/person-entity";
import TweetBarData from "../../models/tweet-bar-data";

import { searchForTweets, searchForPeople } from "../../utils/serverService";

export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const CLEAR_SEARCH_QUERY = "CLEAR_SEARCH_QUERY";
export const SET_SEARCH_TWEETS_RESULTS = "SET_SEARCH_TWEETS_RESULTS";
export const SET_SEARCH_PEOPLE_RESULTS = "SET_SEARCH_PEOPLE_RESULTS";

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
