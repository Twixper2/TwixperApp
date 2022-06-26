import PersonEntity from "../../models/person-entity";
import { getUserFollowing, getUserFollowers } from "../serverService";

import { setObjectValue } from "../storageFunctions";
import { collationNames, followsKeys } from "../../constants/commonKeys";

export const get_user_following = async (username) => {
	let userFollowingArr = [];

	try {
		const response = await getUserFollowing(username);

		if (response.status == 200) {
			let followingFromServer = JSON.parse(JSON.stringify(response.data));

			for (let person_idx = 0; person_idx < followingFromServer.length; person_idx++) {
				const person = followingFromServer[person_idx];

				const personEntity = new PersonEntity(
					person.name,
					person.screen_name,
					person.img,
					person.description,
					person.FollowingStatus,
					person.is_profile_verified
				);

				if (person?.screen_name) {
					userFollowingArr.push(personEntity);
				}
			}

			await setObjectValue(collationNames.FOLLOWS + followsKeys.USER_FOLLOWING + username, {
				username: username,
				userFollowing: userFollowingArr,
			});
		} else if (response.status == 401 || response.status == 428) {
			// Unauthorized
			console.log("Unauthorized get_user_following");
		} else if (response.status == 502) {
			console.log("error in get_user_following");
			let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
			throw new Error(message);
		} else {
			console.log("error in get_user_following");
			let message = "Sorry, There was an error. Please try again later";
			throw new Error(message);
		}
	} catch (err) {
		console.log("error in get_user_following");
		console.log(err);
		let message = "Error while getting search tweets. Please refresh to try again.";
		throw new Error(message);
	}
};

export const get_user_followers = async (username) => {
	let userFollowersArr = [];

	try {
		const response = await getUserFollowers(username);

		if (response.status == 200) {
			let followersFromServer = JSON.parse(JSON.stringify(response.data));

			for (let person_idx = 0; person_idx < followersFromServer.length; person_idx++) {
				const person = followersFromServer[person_idx];

				const personEntity = new PersonEntity(
					person.name,
					person.screen_name,
					person.img,
					person.description,
					person.FollowingStatus,
					person.is_profile_verified
				);

				if (person?.screen_name) {
					userFollowersArr.push(personEntity);
				}
			}

			await setObjectValue(collationNames.FOLLOWS + followsKeys.USER_FOLLOWERS + username, {
				username: username,
				userFollowers: userFollowersArr,
			});
		} else if (response.status == 401 || response.status == 428) {
			// Unauthorized
			console.log("Unauthorized get_user_followers");
		} else if (response.status == 502) {
			console.log("error in get_user_followers");
			let message = "Sorry, Rate limit exceeded. we'll get more tweets later";
			throw new Error(message);
		} else {
			console.log("error in get_user_followers");
			let message = "Sorry, There was an error. Please try again later";
			throw new Error(message);
		}
	} catch (err) {
		console.log("error in get_user_followers");
		console.log(err);
		let message = "Error while getting search tweets. Please refresh to try again.";
		throw new Error(message);
	}
};
