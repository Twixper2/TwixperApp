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

            const urlParams = new URLSearchParams(response.data);

            const oauthToken = urlParams.get("oauth_token");

            const authUrl = ENV.twitterOauthPath + oauthToken;

            dispatch({
                type: AUTHENTICATE_TWITTER,
                authUrl: authUrl,
                oauthToken: oauthToken,
            });
        } catch (err) {
            console.log("error in auth_twitter");
            console.log(err);
            let message =
                "Error while loading the sign-in button. Please refresh to try again.";
            throw new Error(message);
        }
    };
};

export const authenticate_access_token = (pinCode) => {
    return async (dispatch, getState) => {
        const oauthToken = getState().auth.oauthToken;

        const requestUrl = ENV.serverUrl + ENV.twitterAccessTokenEndpoint;
        const headers = await createAuthHeaderObj();
        const payload = { oauth_token: oauthToken, oauth_verifier: pinCode };
        const options = { headers: headers };

        try {
            const response = await axios.post(requestUrl, payload, options);

            if (response.status != 200) {
                console.log("Incorrect PIN in authenticate_access_token");
                let message =
                    "Incorrect PIN code. Please wait for the page to refresh and try again";
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

            let message =
                "There was an error while processing the authorization. Please wait for the page to refresh and try again";
            throw new Error(message);
        }
    };
};

export const server_check_credentials = (oauthToken, oauthTokenSecret) => {
    return async (dispatch) => {
        const requestUrl = ENV.serverUrl + ENV.checkCredentialsEndpoint;

        const headers = await createAuthHeaderObj();
        const payload = {
            oauth_token: oauthToken,
            oauth_token_secret: oauthTokenSecret,
        };
        const options = { headers: headers };

        try {
            const credentialsResponse = await axios.post(
                requestUrl,
                payload,
                options
            );

            if (credentialsResponse.status == 200) {

                

                AsyncStorage.setItem("providedCredentials", true); 
                
                const responseData = credentialsResponse.data
                if(responseData.twitter_user_found == true && responseData.user_registered_to_experiment == true){

                    // Already registered to experiment
                    AsyncStorage.setItem("registeredToExperiment", true);

                    const userTwitterEntity = await AsyncStorage.getItem('user_twitter_entity');

                    if(userTwitterEntity == null){
                        AsyncStorage.setItem("user_twitter_entity", JSON.stringify(responseData.participant_twitter_info));
                    }

                    // Telling the root the session validated (so it will start to collect actions)
                    // this.$root.sessionValidated()
                    // this.$router.replace('feed')
                    window.location.reload()
                }
                else{ // Need to register to experiment
                    // this.$router.replace('insertExpCode')
                    window.location.reload()
                }

                console.log(credentialsResponse);

                const responseData = credentialsResponse.data;

                console.log(responseData);
            } else {
                console.log("error in server_check_credentials");
                console.log(err);

                let message =
                    "There was an error while processing the authorization. Please wait for the page to refresh and try again";
                throw new Error(message);
            }

            return;

            // const urlParams = new URLSearchParams(response.data);
            // const oauthToken = urlParams.get("oauth_token");
            // const oauthTokenSecret = urlParams.get("oauth_token_secret");

            // // console.log(oauthToken);
            // // console.log(oauthTokenSecret);

            // dispatch({
            //     type: AUTHENTICATE_ACCESS_TOKEN,
            //     oauthToken: oauthToken,
            //     oauthTokenSecret: oauthTokenSecret,
            // });
        } catch (err) {
            console.log("error in server_check_credentials");
            console.log(err);

            let message =
                "There was an error while processing the authorization. Please wait for the page to refresh and try again";
            throw new Error(message);
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
