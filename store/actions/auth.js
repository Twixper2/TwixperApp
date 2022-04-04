import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import ENV from "../../env.js";

export const USER_TWITTER_TOKEN = "USER_TWITTER_TOKEN";
export const AUTHENTICATE_TWITTER = "AUTHENTICATE_TWITTER";
export const REGISTER_TO_EXPERIMENT = "REGISTER_TO_EXPERIMENT";
export const AUTHENTICATE_ACCESS_TOKEN = "AUTHENTICATE_ACCESS_TOKEN";

/**********    Action Functions    **********/

export const authenticate_twitter = (oauthCb) => {
    return async (dispatch) => {

        // TODO: Need This?
        // await emptyLs();
        await emptyStorageFromLs();

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
            let message = "Error while loading the sign-in button. Please refresh to try again.";
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
        const requestUrl = ENV.serverUrl + ENV.checkCredentialsEndpoint;

        const headers = await createAuthHeaderObj();
        const payload = {
            oauth_token: oauthToken,
            oauth_token_secret: oauthTokenSecret,
        };
        const options = { headers: headers };

        try {
            const credentialsResponse = await axios.post(requestUrl, payload, options);

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

export const register_to_experiment = (expCode) => {
    return async (dispatch) => {
        const requestUrl = ENV.serverUrl + ENV.registerToExperimentEndpoint;
        const headers = await createAuthHeaderObj();
        const payload = { exp_code: expCode };
        const options = { headers: headers };

        try {
            const registerToExpResponse = await axios.post(requestUrl, payload, options);

            if (registerToExpResponse.status == 200) {
                // Setting the registration in local storage
                await AsyncStorage.setItem("registeredToExperiment", JSON.stringify(true));
                await AsyncStorage.setItem("user_twitter_entity", JSON.stringify(registerToExpResponse.data.participant_twitter_info));

                // Reset local storage twitter data
                await emptyStorageFromLs();

                // Telling the root the session validated (so it will start to collect actions)
                // this.$root.sessionValidated()
                // this.$router.replace('feed')
                // window.location.reload();
            } else if (registerToExpResponse.status == 401 || registerToExpResponse.status == 428) {
                await emptyLs();
                await AsyncStorage.removeItem("providedCredentials");
                let message = "Unauthorized. Login with twitter first";
                throw new Error(message);
            } else {
                if (registerToExpResponse.data && registerToExpResponse.data.message) {
                    if (registerToExpResponse.data.name == "UserAlreadyRegistered") {
                        // Setting the registration in local storage
                        await AsyncStorage.setItem("registeredToExperiment", JSON.stringify(true));

                        // Telling the root the session validated (so it will start to collect actions)
                        // this.$root.sessionValidated()
                        // this.$router.replace('feed')
                        // window.location.reload();
                    } else if (registerToExpResponse.data.name == "InvalidAuthInfo") {
                        await emptyLs();
                        await AsyncStorage.removeItem("providedCredentials");
                        let message = "Unauthorized. Login with twitter first";
                        throw new Error(message);
                    } else {
                        let message = registerToExpResponse.data.message;
                        throw new Error(message);
                    }
                } else if (typeof registerToExpResponse.data === "string") {
                    let message = registerToExpResponse.data;
                    throw new Error(message);
                } else {
                    let message = "Network error. Please try again later.";
                    throw new Error(message);
                }
            }
        } catch (err) {
            console.log("error in register_to_experiment");
            console.log(err);
            let message = "Error while loading the sign-in button. Please refresh to try again.";
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
    const userTwitterTokenSecret = await AsyncStorage.getItem("user_twitter_token_secret");

    if (userTwitterToken != null && userTwitterTokenSecret != null) {
        headerObj["User-Twitter-Token"] = userTwitterToken;
        headerObj["User-Twitter-Token-Secret"] = userTwitterTokenSecret;
    }
    return headerObj;
};

const emptyStorageFromLs = async () => {
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

const emptyLs = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();

        keys.forEach((key) => {
            AsyncStorage.removeItem(key);
        });
    } catch (error) {
        console.error(error);
    }
};
