import AsyncStorage from "@react-native-async-storage/async-storage";

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
