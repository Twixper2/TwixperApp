import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { sleep } from "./helperFunctions";
import { serverEndpoints } from "../constants/endpoints";
import { serverUrl, actuallySendReqToServer, moreFeedTweetsCount } from "./config";

import { data as feedJSON } from "../data/FeedJSON";

/* ----------------------------------------
    User Login Functions
   ---------------------------------------- */

export const participantLogin = async (user, pass) => {
	if (!actuallySendReqToServer) {
		await sleep(600);
		return { status: 200 };
	}
	const requestUrl = serverUrl + serverEndpoints.participantLogin;
	const payload = {
		user: user,
		pass: pass,
	};
	return await sendPostRequest(requestUrl, payload);
};

/* ----------------------------------------
    Register Experiment Functions
   ---------------------------------------- */

export const registerToExperiment = async (expCode) => {
	if (!actuallySendReqToServer) {
		await sleep(600);
		return { status: 200 };
	}
	const requestUrl = serverUrl + serverEndpoints.registerToExperimentEndpoint;
	const payload = {
		exp_code: expCode,
	};
	return await sendPostRequest(requestUrl, payload);
};

/* ----------------------------------------
    Twitter Authenticate Functions
   ---------------------------------------- */

export const getTwitterAuthRequestToken = async (oauthCb) => {
	const requestUrl = serverUrl + serverEndpoints.twitterRequestTokenEndpoint;
	const payload = {
		oauth_callback: oauthCb,
	};
	return await sendPostRequest(requestUrl, payload);
};

export const getTwitterAuthAccessToken = async (token, verifier) => {
	const requestUrl = serverUrl + serverEndpoints.twitterAccessTokenEndpoint;
	const payload = {
		oauth_token: token,
		oauth_verifier: verifier,
	};
	return await sendPostRequest(requestUrl, payload);
};

export const checkCredentials = async (token, tokenSecret) => {
	if (!actuallySendReqToServer) {
		await sleep(600);
		return {
			status: 200,
			data: {
				twitter_user_found: "true",
				user_registered_to_experiment: "true",
			},
		};
	}
	// Else, send the request to the server
	const requestUrl = serverUrl + serverEndpoints.checkCredentialsEndpoint;
	const payload = {
		oauth_token: token,
		oauth_token_secret: tokenSecret,
	};
	return await sendPostRequest(requestUrl, payload);
};

/* ----------------------------------------
    Requests for data from Twitter to display
   ---------------------------------------- */

export const getFeed = async (maxId, count = moreFeedTweetsCount) => {
	if (!actuallySendReqToServer) {
		await sleep(600);
		return { status: 200, data: feedJSON };
	}
	// Else, send the request to the server
	let requestUrl = serverUrl + serverEndpoints.feedEndpoint;
	if (maxId || count) {
		requestUrl += "?";
	}
	if (maxId) {
		requestUrl += "maxId=" + maxId + "&";
	}
	if (count) {
		requestUrl += "count=" + count;
	}
	return await sendGetRequest(requestUrl);
};

/* ----------------------------------------
    Helper Functions
   ---------------------------------------- */

/* Generic Post & Get Structure */

const sendGetRequest = async (requestUrl, options = {}) => {
	options.headers = await createAuthHeaderObj();
	return await axios.get(requestUrl, options).catch(function (error) {
		if (error.response) {
			console.log(error.response);
			return error.response;
		} else {
			// This is network error
			console.log(error);
			return { status: 0, data: "Network error, server probably down" };
		}
	});
};

const sendPostRequest = async (requestUrl, payload, options = {}) => {
	options.headers = await createAuthHeaderObj();
	return await axios.post(requestUrl, payload, options).catch(function (error) {
		if (error.response) {
			console.log(error.response);
			return error.response;
		} else {
			// This is network error
			console.log(error);
			return { status: 0, data: "Network error, server probably down" };
		}
	});
};

/* Create auth header object */

const createAuthHeaderObj = async () => {
	let headerObj = { "Content-Type": "application/json" };

	const userTwitterToken = await AsyncStorage.getItem("user_twitter_token");
	const userTwitterTokenSecret = await AsyncStorage.getItem("user_twitter_token_secret");

	if (userTwitterToken != null && userTwitterTokenSecret != null) {
		headerObj["User-Twitter-Token"] = userTwitterToken;
		headerObj["User-Twitter-Token-Secret"] = userTwitterTokenSecret;
	}
	return headerObj;
};
