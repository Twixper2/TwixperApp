import * as SecureStore from "expo-secure-store";

import AsyncStorage from "@react-native-async-storage/async-storage";

import PersonEntity from "../models/person-entity";

import { sleep, printLogs } from "./helperFunctions";
import { actuallySendReqToServer } from "./config";

import { storageKeys } from "../constants/commonKeys";

import { data as users } from "../data/UserTwitterEntity";

/* ----------------------------------------
	Secure Store
   ---------------------------------------- */

export const saveItem = async (key, value) => {
	await SecureStore.setItemAsync(key, value);
};

export const getValueFor = async (key) => {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		printLogs("🔐 Here's your value 🔐 \n" + result);
		return result;
	} else {
		printLogs("No values stored under that key.");
	}
};

export const deleteItem = async (key) => {
	await SecureStore.deleteItemAsync(key);
};

export const clearSecureStore = async () => {
	printLogs("Starting clearing store...");

	for (const key in storageKeys) {
		await SecureStore.deleteItemAsync(storageKeys[key]);
	}
	printLogs("Store cleared successfully");
};

/* ----------------------------------------
	Async Storage
   ---------------------------------------- */

/*************     Getters     *************/

export const getStringValue = async (key) => {
	try {
		const result = await AsyncStorage.getItem(key);
		if (result) {
			printLogs("Here's your value \n" + result);
			return result;
		} else {
			printLogs("No values stored under that key.");
		}
	} catch (error) {
		console.error(error);
	}
};

export const getObjectValue = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		const result = jsonValue != null ? JSON.parse(jsonValue) : null;
		if (result) {
			printLogs("Here's your value \n" + result);
			return result;
		} else {
			printLogs("No values stored under that key.");
		}
	} catch (error) {
		console.error(error);
	}
};

/*************     Setters     *************/

export const setStringValue = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (error) {
		console.error(error);
	}
};

export const setObjectValue = async (key, value) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
	} catch (error) {
		console.error(error);
	}
};

export const removeValue = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		console.error(error);
	}
};

/* ----------------------------------------
	Prev Project Funcs
   ---------------------------------------- */

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

/* ----------------------------------------
	Dummy Data
   ---------------------------------------- */

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

export const getTweets = async () => {
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

export const getPersonData = () => {
	let lstPersons = [];
	for (const person in searchPeople) {
		lstPersons.push(
			new PersonEntity(
				searchPeople[person].user_name,
				searchPeople[person].user_name_url,
				searchPeople[person].img,
				"You Need To Send Me The Description!!!",
				searchPeople[person].FollowingStatus,
				true
			)
		);
	}
	return lstPersons;
};
