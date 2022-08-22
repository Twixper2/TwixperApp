import { SET_USER_FOLLOWING, SET_USER_FOLLOWERS } from "../actions/follows";

const initialState = {
	username: "",
	userFollowing: [],
	userFollowers: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_FOLLOWING:
			return {
				...state,
				username: action.username,
				userFollowing: action.userFollowing,
			};
		case SET_USER_FOLLOWERS:
			return {
				...state,
				username: action.username,
				userFollowers: action.userFollowers,
			};
		default:
			return state;
	}
};
