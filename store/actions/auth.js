import AsyncStorage from "@react-native-async-storage/async-storage";

import UserTwitterEntity from "../../models/user-twitter-entity";

import { insertCredentials } from "../../utils/config";
import { storageKeys } from "../../constants/commonKeys";
import { emptyLs, saveItem } from "../../utils/storageFunctions";
import { participantLogin, registerToExperiment } from "../../utils/serverService";
import { parseTwitterUserEntity, parseParticipantTwitterInfo } from "../../utils/helperFunctions";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const REGISTER_TO_EXPERIMENT = "REGISTER_TO_EXPERIMENT";

/**********          User Login          **********/

export const user_login = (username, password) => {
	return async (dispatch) => {
		try {
			if (insertCredentials) {
				username = "Twixper_App";
				password = "LiadMosheDini";
			}

			const participantLoginResponse = await participantLogin(username, password);

			if (participantLoginResponse.status == 200) {
				const { access_token, user_registered_to_experiment } = participantLoginResponse.data;

				// Valid Credentials - save in SecureStore
				if (access_token) {
					await saveItem(storageKeys.USERNAME, username);
					await saveItem(storageKeys.PASSWORD, password);
					await saveItem(storageKeys.ACCESS_TOKEN, access_token);
					await saveItem(storageKeys.REGISTERED_EXPERIMENT, JSON.stringify(user_registered_to_experiment));
				}

				if (!user_registered_to_experiment) {
					dispatch({
						type: LOGIN,
						registeredToExperiment: user_registered_to_experiment,
					});
				} else {
					const { participant_twitter_info, initial_content } = participantLoginResponse.data;

					dispatch(authenticate(participant_twitter_info, user_registered_to_experiment, initial_content));
				}
			} else if (participantLoginResponse.status == 401) {
				let message = "No params supplied.\nPlease Login again.";
				throw new Error(message);
			} else if (participantLoginResponse.status == 400) {
				let message = "This user has already been authenticated.\nPlease Login again.";
				throw new Error(message);
			} else if (participantLoginResponse.status == 502) {
				let message = "Something went wrong in the server.\nPlease Login again.";
				dispatch({ type: LOGOUT });
				throw new Error(message);
			} else if (participantLoginResponse.status == 500) {
				let message = "Something went wrong, Server unreachable.\nPlease try again later.";
				throw new Error(message);
			} else if (participantLoginResponse.status == 0) {
				let message = "Something went wrong, Server unreachable.\nPlease try again later.";
				throw new Error(participantLoginResponse.data);
			} else {
				console.log("error in user_login - got to final else...");
				let message = "Something went wrong.\nPlease Try again Login again.";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in user_login");
			console.log(err);
			throw err;
		}
	};
};

/**********     Register Experiment     **********/

export const register_to_experiment = (expCode) => {
	return async (dispatch) => {
		try {
			if (insertCredentials) {
				// expCode = "e044c6";
				expCode = "0d42b0";
			}

			const registerToExpResponse = await registerToExperiment(expCode);

			if (registerToExpResponse.status == 200) {
				const { initial_content, participant_twitter_info, user_registered_to_experiment } =
					registerToExpResponse.data;

				await saveItem(storageKeys.REGISTERED_EXPERIMENT, JSON.stringify(user_registered_to_experiment));

				dispatch(authenticate(participant_twitter_info, user_registered_to_experiment, initial_content));
			} else if (registerToExpResponse.status == 400) {
				await emptyLs();
				await AsyncStorage.removeItem("providedCredentials");
				let message = "Unauthorized. Login with twitter first";
				throw new Error(message);
			} else if (registerToExpResponse.status == 401 || registerToExpResponse.status == 428) {
				await emptyLs();
				await AsyncStorage.removeItem("providedCredentials");
				let message = "Unauthorized. Login with twitter first";
				throw new Error(message);
			} else {
				if (registerToExpResponse.data && registerToExpResponse.data.message) {
					if (registerToExpResponse.data.name == "UserAlreadyRegistered") {
						// Setting the registration in local storage
						await AsyncStorage.setItem("registeredToExperiment", JSON.stringify(true));

						// Telling the root the session validated (so it will start to collect actions)
						// this.$root.sessionValidated()
						// this.$router.replace('feed')
						// window.location.reload();
					} else if (registerToExpResponse.data.name == "InvalidAuthInfo") {
						await emptyLs();
						await AsyncStorage.removeItem("providedCredentials");
						let message = "Unauthorized. Login with twitter first";
						throw new Error(message);
					} else {
						let message = registerToExpResponse.data.message;
						throw new Error(message);
					}
				} else if (typeof registerToExpResponse.data === "string") {
					let message = registerToExpResponse.data;
					throw new Error(message);
				} else {
					let message = "Network error. Please try again later.";
					throw new Error(message);
				}
			}
		} catch (err) {
			console.log("error in register_to_experiment");
			console.log(err);
			let message = "Error while loading the sign-in button. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

/**********     Register Experiment     **********/

export const authenticate = (participantTwitterInfo, registeredToExperiment, initialContent) => {
	return (dispatch) => {
		//  TODO: Which one you return?
		const parsedInfo = parseTwitterUserEntity(initialContent.entity_details);
		// const parsedInfo = parseParticipantTwitterInfo(participantTwitterInfo);

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
		dispatch({
			type: AUTHENTICATE,
			username: parsedInfo.user_handle,
			userTwitterEntity: userTwitterEntity,
			registeredToExperiment: registeredToExperiment,
		});
	};
};
