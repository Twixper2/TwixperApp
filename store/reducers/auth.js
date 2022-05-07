import { USER_LOGIN } from "../actions/auth";

const initialState = {
	username: "",
	userTwitterEntity: null,

	// TODO: Maybe save in LocalStorage
	registeredToExperiment: false,
	providedCredentials: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				username: action.username,
				providedCredentials: true,
				...state,
			};
		default:
			return state;
	}
};
