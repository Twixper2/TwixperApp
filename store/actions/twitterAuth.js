import AsyncStorage from "@react-native-async-storage/async-storage";

import { emptyLs } from "../../utils/storageFunctions";
import { getTwitterAuthRequestToken, getTwitterAuthAccessToken, checkCredentials } from "../../utils/serverService";

import { twitterEndpoints } from "../../constants/endpoints";

export const USER_TWITTER_TOKEN = "USER_TWITTER_TOKEN";
export const AUTHENTICATE_TWITTER = "AUTHENTICATE_TWITTER";
export const AUTHENTICATE_ACCESS_TOKEN = "AUTHENTICATE_ACCESS_TOKEN";

/**********    Twitter Auth Functions    **********/

export const authenticate_twitter = (oauthCb) => {
	return async (dispatch) => {
		// TODO: Need This?
		await emptyLs();
		// await emptyStorageFromLs();

		try {
			const response = await getTwitterAuthRequestToken(oauthCb);

			const urlParams = new URLSearchParams(response.data);

			const oauthToken = urlParams.get("oauth_token");

			const authUrl = twitterEndpoints.twitterOauthPath + oauthToken;

			dispatch({
				type: AUTHENTICATE_TWITTER,
				authUrl: authUrl,
				oauthToken: oauthToken,
			});
		} catch (err) {
			console.log("error in auth_twitter");
			console.log(err);
			let message = "Error while loading the sign-in button. Please refresh to try again.";
			throw new Error(message);
		}
	};
};

export const authenticate_access_token = (pinCode) => {
	return async (dispatch, getState) => {
		try {
			const token = getState().auth.oauthToken;
			const response = await getTwitterAuthAccessToken(token, pinCode);

			if (response.status != 200) {
				console.log("Incorrect PIN in authenticate_access_token");
				let message = "Incorrect PIN code. Please wait for the page to refresh and try again";
				throw new Error(message);
			}

			const urlParams = new URLSearchParams(response.data);
			const oauthToken = urlParams.get("oauth_token");
			const oauthTokenSecret = urlParams.get("oauth_token_secret");

			dispatch(server_check_credentials(oauthToken, oauthTokenSecret));

			dispatch({
				type: AUTHENTICATE_ACCESS_TOKEN,
				oauthToken: oauthToken,
				oauthTokenSecret: oauthTokenSecret,
			});
		} catch (err) {
			console.log("error in authenticate_access_token");
			console.log(err);

			let message = "There was an error while processing the authorization. Please wait for the page to refresh and try again";
			throw new Error(message);
		}
	};
};

export const server_check_credentials = (oauthToken, oauthTokenSecret) => {
	return async (dispatch) => {
		try {
			const credentialsResponse = await checkCredentials(oauthToken, oauthTokenSecret);

			if (credentialsResponse.status == 200) {
				await AsyncStorage.setItem("user_twitter_token", credentialsResponse.headers["user-twitter-token"]);
				await AsyncStorage.setItem("user_twitter_token_secret", credentialsResponse.headers["user-twitter-token-secret"]);

				dispatch({
					type: USER_TWITTER_TOKEN,
					user_twitter_token: credentialsResponse.headers["user-twitter-token"],
					user_twitter_token_secret: credentialsResponse.headers["user-twitter-token-secret"],
				});

				await AsyncStorage.setItem("providedCredentials", JSON.stringify(true));

				const responseData = credentialsResponse.data;
				if (responseData.twitter_user_found == true && responseData.user_registered_to_experiment == true) {
					// Already registered to experiment
					await AsyncStorage.setItem("registeredToExperiment", JSON.stringify(true));
					const userTwitterEntity = await AsyncStorage.getItem("user_twitter_entity");

					if (userTwitterEntity == null) {
						await AsyncStorage.setItem("user_twitter_entity", JSON.stringify(responseData.participant_twitter_info));
					}
					// TODO: Check What Need To Be Here !!!

					// Telling the root the session validated (so it will start to collect actions)
					// this.$root.sessionValidated()
					// this.$router.replace('feed')
					// window.location.reload()
					// NOTE:
					// FIXME:
				} else {
					// TODO: Check What Need To Be Here !!!
					// Need to register to experiment
					// this.$router.replace('insertExpCode')
					// window.location.reload()
				}
			} else {
				console.log("error in server_check_credentials");
				console.log(err);

				let message = "There was an error while processing the authorization. Please wait for the page to refresh and try again";
				throw new Error(message);
			}
		} catch (err) {
			console.log("error in server_check_credentials");
			console.log(err);

			let message = "There was an error while processing the authorization. Please wait for the page to refresh and try again";
			throw new Error(message);
		}
	};
};