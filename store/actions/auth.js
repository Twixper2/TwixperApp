import AsyncStorage from "@react-native-async-storage/async-storage";

import { emptyLs, emptyStorageFromLs } from "../../utils/storageFunctions";
import { participantLogin, registerToExperiment } from "../../utils/serverService";

export const USER_LOGIN = "USER_LOGIN";
export const REGISTER_TO_EXPERIMENT = "REGISTER_TO_EXPERIMENT";

/**********          User Login          **********/

export const user_login = (username, password) => {
	return async (dispatch) => {
		try {
			const participantLoginResponse = await participantLogin(username, password);

			if (participantLoginResponse.status == 200) {
				//  TODO: What To I receive after successful login?

				let resData = participantLoginResponse.data;
				console.log(resData);

				//  NOTE: Old Version off Auth - Need This??

				// Setting the registration in local storage
				// await AsyncStorage.setItem("registeredToExperiment", JSON.stringify(true));
				// await AsyncStorage.setItem("user_twitter_entity", JSON.stringify(registerToExpResponse.data.participant_twitter_info));

				// Reset local storage twitter data
				// await emptyStorageFromLs();

				// Telling the root the session validated (so it will start to collect actions)
				// this.$root.sessionValidated()
				// this.$router.replace('feed')
				// window.location.reload();
			} else if (registerToExpResponse.status == 502) {
				// Tab is closed for some reason. Please authenticate again.
				//	Or
				// error thrown from the api
				let message = "Something went wrong.\nPlease Login again.";
				throw new Error(message);
			} else if (registerToExpResponse.status == 500) {
				let message = "Something went wrong, Server unreachable.\nPlease try again later.";
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
			const registerToExpResponse = await registerToExperiment(expCode);

			if (registerToExpResponse.status == 200) {
				// Setting the registration in local storage
				await AsyncStorage.setItem("registeredToExperiment", JSON.stringify(true));
				await AsyncStorage.setItem("user_twitter_entity", JSON.stringify(registerToExpResponse.data.participant_twitter_info));

				// Reset local storage twitter data
				await emptyStorageFromLs();

				// Telling the root the session validated (so it will start to collect actions)
				// this.$root.sessionValidated()
				// this.$router.replace('feed')
				// window.location.reload();
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