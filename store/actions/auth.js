import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import ENV from "../../env.js";

export const AUTHENTICATE_TWITTER = "AUTHENTICATE_TWITTER";
export const AUTHENTICATE_ACCESS_TOKEN = "AUTHENTICATE_ACCESS_TOKEN";

/**********    Action Functions    **********/

export const authenticate_twitter = (oauthCb) => {
    return async (dispatch) => {
        const requestUrl = ENV.serverUrl + ENV.twitterRequestTokenEndpoint;
        const headers = await createAuthHeaderObj();
        const payload = { oauth_callback: oauthCb };
        const options = { headers: headers };

        try {
            const response = await axios.post(requestUrl, payload, options);
            const oauthToken = JSON.parse(JSON.stringify(response.data));

            const authUrl = ENV.twitterOauthPath + oauthToken;

            dispatch({ type: AUTHENTICATE_TWITTER, authUrl: authUrl, oauthToken: oauthToken });
        } catch (err) {
            console.log("error in auth_twitter");
            console.log(err);
        }
    };
};

export const authenticate_access_token = pinCode => {

    return async (dispatch, getState) => {
        const oauthToken = getState().auth.oauthToken;

        const requestUrl = ENV.serverUrl + ENV.twitterAccessTokenEndpoint;
        const headers = await createAuthHeaderObj();
        const payload = { oauth_token: oauthToken, oauth_verifier: pinCode };
        const options = { headers: headers };

        try {
            const response = await axios.post(requestUrl, payload, options);

            console.log(response);
            // const oauthToken = JSON.parse(JSON.stringify(response.data));

            // const authUrl = ENV.twitterOauthPath + oauthToken;

            // dispatch({ type: AUTHENTICATE_TWITTER, authUrl: authUrl, oauthToken: oauthToken });
        } catch (err) {
            console.log("error in authenticate_access_token");
            console.log(err);
        }
    }
};

/**********    Helper Functions    **********/

// TODO: Find Better Location !!

// Create auth header object
const createAuthHeaderObj = async () => {
    let headerObj = { "Content-Type": "application/json" };

    const userTwitterToken = await AsyncStorage.getItem("user_twitter_token");
    const userTwitterTokenSecret = await AsyncStorage.getItem(
        "user_twitter_token_secret"
    );

    if (userTwitterToken != null && userTwitterTokenSecret != null) {
        headerObj["User-Twitter-Token"] = userTwitterToken;
        headerObj["User-Twitter-Token-Secret"] = userTwitterTokenSecret;
    }
    return headerObj;
};
