import AsyncStorage from "@react-native-async-storage/async-storage";
import PersonEntity from "../models/person-entity";

import { sleep } from "./helperFunctions";

import { actuallySendReqToServer } from "./config";
import { data as users } from "../data/UserTwitterEntity";

import { tweets } from "../data/Selenium/v2/tweets_data";
// import { tweets as tweetsData } from "../data/Selenium/v2/tweets_data";
import { searchPeople } from "../data/Selenium/v2/search_people_data";

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
