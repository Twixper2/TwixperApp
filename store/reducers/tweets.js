import { SET_FEED_TWEETS } from "../actions/tweets";

const initialState = {
	feedTweets: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_FEED_TWEETS:
			return {
				feedTweets: action.feedTweets,
			};
		default:
			return state;
	}
};
