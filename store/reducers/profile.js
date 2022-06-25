import { SET_USERS_LIKES, SET_USERS_TWEETS, SET_USERS_DETAILS } from "../actions/profile";

const initialState = {
	username: "",
	usersLikes: [],
	usersTweets: [],
	userEntity: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS_LIKES:
			return {
				...state,
				username: action.username,
				usersLikes: action.usersLikes,
			};
		case SET_USERS_TWEETS:
			return {
				...state,
				username: action.username,
				usersTweets: action.usersTweets,
			};
		case SET_USERS_DETAILS:
			return {
				...state,
				username: action.username,
				userEntity: action.userEntity,
			};
		default:
			return state;
	}
};
