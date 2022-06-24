var moment = require("moment");

import { withStorageLogs } from "./config";

/* ----------------------------------------
	Parsers
   ---------------------------------------- */

export const parseTwitterUserEntity = (userData) => {
	return (userEntity = {
		user_name: userData.username.split("\n@")[0],
		user_handle: userData.username.split("\n@")[1],
		friends_count: userData.following_count.split(" ")[0],
		followers_count: userData.followers_count.split(" ")[0],
		profile_image_url: userData.profile_img,
		cover_image_url: userData.cover_photo,
		user_description: userData.user_description,
		user_location: userData.user_location,
		when_joined: userData.when_joined,
		user_url: userData.user_url,
		user_profession: userData.user_profession,
	});
};

export const parseParticipantTwitterInfo = (userData) => {
	return (userEntity = {
		user_name: userData.name.split("\n@")[0],
		user_handle: userData.name.split("\n@")[1],
		friends_count: userData.friends_count.split(" ")[0],
		followers_count: userData.followers_count.split(" ")[0],
		profile_image_url: userData.profile_image_url_https,
	});
};

export const parseTwitterDate = (twitterDate) => {
	var system_date = new Date(Date.parse(twitterDate));
	var user_date = new Date();

	// if (K.ie) {
	// 	system_date = Date.parse(twitterDate.replace(/( \+)/, " UTC$1"));
	// }
	var diff = Math.floor((user_date - system_date) / 1000);
	//if (diff <= 1) {return "just now";}
	if (diff <= 60) {
		return diff + "s";
	}
	//if (diff < 40) {return "half a minute ago";}
	//if (diff < 60) {return "less than a minute ago";}
	//if (diff <= 90) {return "one minute ago";}
	if (diff <= 3540) {
		return Math.round(diff / 60) + "m";
	}
	if (diff <= 5400) {
		return "1h";
	}
	if (diff <= 86400) {
		return Math.round(diff / 3600) + "h";
	}
	if (diff <= 129600) {
		return "1d";
	}
	if (diff < 604800) {
		return Math.round(diff / 86400) + "d";
	}
	if (diff <= 777600) {
		return "1w";
	}
	// Change format to "19 Oct" for example, if years are the same
	if (system_date.getFullYear() == user_date.getFullYear()) {
		return moment(system_date).format("D MMM");
	}
	// Change format to "19 Oct 20" for example
	return moment(system_date).format("D MMM YY");
};

/* ----------------------------------------
	Dev Helpers
   ---------------------------------------- */

export const printLogs = (log) => {
	if (withStorageLogs) {
		console.log(log);
	}
};

// For mocking server delay
export const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
