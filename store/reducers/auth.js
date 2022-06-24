import { LOGIN, LOGOUT, AUTHENTICATE } from "../actions/auth";

const initialState = {
	username: "",
	userTwitterEntity: null,
	providedCredentials: false,
	registeredToExperiment: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				providedCredentials: true,
				registeredToExperiment: action.registeredToExperiment,
			};
		case LOGOUT:
			return {
				username: "",
				userTwitterEntity: null,
				providedCredentials: false,
				registeredToExperiment: false,
			};
		case AUTHENTICATE:
			return {
				...state,
				username: action.username,
				providedCredentials: true,
				userTwitterEntity: action.userTwitterEntity,
				registeredToExperiment: action.registeredToExperiment,
			};
		default:
			return state;
	}
};
