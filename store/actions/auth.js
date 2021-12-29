import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import ENV from "../../env.js";

export const AUTHENTICATE_TWITTER = "AUTHENTICATE_TWITTER";

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

            dispatch({ type: AUTHENTICATE_TWITTER, authUrl: authUrl });
        } catch (err) {
            console.log("error in auth_twitter");
            console.log(err);
        }
    };
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
