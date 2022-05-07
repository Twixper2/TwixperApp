import { USER_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
	username: "",
	userTwitterEntity: null,

	// TODO: Maybe save in LocalStorage
	providedCredentials: false,
	registeredToExperiment: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				username: action.username,
				providedCredentials: true,
				userTwitterEntity: action.userTwitterEntity,
				registeredToExperiment: action.registeredToExperiment,
				...state,
			};
		case LOGOUT:
			return {
				username: "",
				userTwitterEntity: null,
				providedCredentials: false,
				registeredToExperiment: false,
			};
		default:
			return state;
	}
};
