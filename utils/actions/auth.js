import AsyncStorage from "@react-native-async-storage/async-storage";

import UserTwitterEntity from "../../models/user-twitter-entity";

import { insertCredentials } from "../config";
import { emptyLs, saveItem } from "../storageFunctions";
import { setStringValue, setObjectValue, clearAsyncStorage, clearSecureStore } from "../storageFunctions";
import { participantLogin, registerToExperiment } from "../serverService";
import { localStorageKeys, storageKeys } from "../../constants/commonKeys";
import { parseTwitterUserEntity } from "../helperFunctions";

/**********          User Login          **********/

export const user_login = async (username, password) => {
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
				await setObjectValue(localStorageKeys.REGISTERED_TO_EXPERIMENT, user_registered_to_experiment);
			} else {
				const { participant_twitter_info, initial_content } = participantLoginResponse.data;

				await authenticate(participant_twitter_info, user_registered_to_experiment, initial_content);
			}
		} else if (participantLoginResponse.status == 401) {
			let message = "Wrong username or password.\nPlease Login again.";
			throw new Error(message);
		} else if (participantLoginResponse.status == 400) {
			let message = "Something went wrong.\nPlease Login again.";
			throw new Error(message);
		} else if (participantLoginResponse.status == 502) {
			let message = "Something went wrong in the server.\nPlease Login again.";
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
		await clearAsyncStorage();
		await clearSecureStore();
		throw err;
	}
};

/**********     Register Experiment     **********/

export const register_to_experiment = async (expCode) => {
	try {
		if (insertCredentials) {
			expCode = "e044c6";
		}

		const registerToExpResponse = await registerToExperiment(expCode);

		if (registerToExpResponse.status == 200) {
			const { initial_content, user_registered_to_experiment } = registerToExpResponse.data;

			await authenticate(user_registered_to_experiment, initial_content.entity_details);
		} else if (registerToExpResponse.status == 401) {
			let message = "Wrong username or password.\nPlease Login again.";
			if (registerToExpResponse.data.presentToUser) {
				message = registerToExpResponse.data.message;
			}
			throw new Error(message);
		} else if (registerToExpResponse.status == 400) {
			let message = "No .\nPlease Login again.";
			if (registerToExpResponse.data.presentToUser) {
				message = registerToExpResponse.data.message;
			}
			throw new Error(message);
		} else if (registerToExpResponse.status == 502) {
			let message = "Something went wrong in the server.\nPlease Login again.";
			throw new Error(message);
		} else if (registerToExpResponse.status == 500) {
			let message = "Something went wrong, Server unreachable.\nPlease try again later.";
			throw new Error(message);
		} else if (registerToExpResponse.status == 0) {
			let message = "Something went wrong, Server unreachable.\nPlease try again later.";
			throw new Error(registerToExpResponse.data);
		} else {
			console.log("error in user_login - got to final else...");
			let message = "Something went wrong.\nPlease Try again Login again.";
			throw new Error(message);
		}
	} catch (err) {
		console.log("error in register_to_experiment");
		console.log(err);
		let message = "Error while loading the sign-in button. Please refresh to try again.";
		await clearAsyncStorage();
		await clearSecureStore();
		throw new Error(message);
	}
};

/**********     Register Experiment     **********/

export const authenticate = async (registeredToExperiment, entity_details) => {
	//  TODO: Which one you return?
	const parsedInfo = parseTwitterUserEntity(entity_details);
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
	await setStringValue(localStorageKeys.USERNAME, parsedInfo.user_handle);
	await setObjectValue(localStorageKeys.USER_TWITTER_ENTITY, userTwitterEntity);
	await setObjectValue(localStorageKeys.REGISTERED_TO_EXPERIMENT, registeredToExperiment);
};
