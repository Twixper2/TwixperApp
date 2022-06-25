export const POST_TWEET = "POST_TWEET";

import { postTweet } from "../../utils/serverService";

export const post_tweet = (tweetToPost) => {
	return async (dispatch) => {
		try {
			const payload = {
				tweetContext: tweetToPost,
			};
			const response = await postTweet(payload);

			if (response.status == 200) {
				// TODO: !! Need tweet object !!
				console.log("TODO !! Need tweet object");
				dispatch({
					type: POST_TWEET,
					username: username,
					usersTweets: usersTweetsArr,
				});
			} else if (response.status == 401 || response.status == 428) {
				// Unauthorized
				console.log("Unauthorized post_tweet");
			} else if (response.status == 400) {
				console.log("error in post_tweet");
				let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
				throw new Error(message);
			} else {
				console.log("error in post_tweet");
				let message = "Sorry, There was an error. Please try again later";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in post_tweet");
			console.log(err);
			let message = "Error while getting search tweets. Please refresh to try again.";
			throw new Error(message);
		}
	};
};
