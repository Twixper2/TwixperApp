import AsyncStorage from "@react-native-async-storage/async-storage";

import { sleep } from "./helperFunctions";
import { actuallySendReqToServer } from "./config";
import { data as users } from "../data/UserTwitterEntity";

export const emptyStorageFromLs = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys();

		keys.forEach((key) => {
			if (
				key != "providedCredentials" &&
				key != "registeredToExperiment" &&
				key != "user_twitter_token" &&
				key != "user_twitter_token_secret" &&
				key != "user_twitter_entity" &&
				!key.startsWith("action")
			) {
				AsyncStorage.removeItem(key);
			}
		});
	} catch (error) {
		console.error(error);
	}
};

export const emptyLs = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys();

		keys.forEach((key) => {
			AsyncStorage.removeItem(key);
		});
	} catch (error) {
		console.error(error);
	}
};

export const getUserTwitterEntity = async () => {
	if (!actuallySendReqToServer) {
		await sleep(500);
		let user = users[Math.floor(Math.random() * 2)];
		return user;
	}

	try {
		let userData = await AsyncStorage.getItem("user_twitter_entity");
		return JSON.parse(userData);
	} catch (error) {
		console.error(error);
	}
};
