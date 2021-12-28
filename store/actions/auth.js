import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import ENV from "../../env.js";

export const AUTHENTICATE_TWITTER = "AUTHENTICATE_TWITTER";

/**********    Action Functions    **********/

export const authenticate_twitter = (oauthCb) => {
    return async (dispatch) => {
        const requestUrl = ENV.serverUrl + ENV.twitterRequestTokenEndpoint;
        const headers = await createAuthHeaderObj();
        const payload = {
            oauth_callback: oauthCb,
        };
        // const options = {
        //     method: "POST",
        //     headers: headers,
        //     body: JSON.stringify(payload),
        // };
        const options = {
            headers: headers
        };
        try {

            console.log("res 0");
            // const response = await fetch(requestUrl, options);

            // const response = await fetch(requestUrl, {
            //     method: "POST",
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify({ oauth_callback: oauthCb }),
            // });
            let x = axios.post(requestUrl, payload, options);
            x.then(res => {
                // console.log("YYYY");
                // let y = JSON.parse(JSON.stringify(res));
                // console.log(y);
                // console.log(y._bodyInit._data);
                // const urlParams = new URLSearchParams(y._bodyBlob._data);
                // console.log(urlParams);
                // const oauthToken = urlParams.get("oauth_token")
                // console.log(oauthToken);
                // console.log(res);
                const urlParams = new URLSearchParams(res.data)
                console.log(urlParams._searchParams);
                // console.log(res.data);
                // const oauthToken = urlParams.get("oauth_token")
                // const oauthToken = urlParams
                console.log(JSON.stringify(res.data));
                // console.log(res.data)

            }).catch(err=>console.log(err));

            console.log("res 0");
            // const resData = await JSON.stringify(response);
            // console.log(response.ok);
            // console.log("res" + resData); 


            // console.log(response._bodyInit._data + "?");
            // const urlParams = new URLSearchParams(response.data);
            // const oauthToken = urlParams.get("oauth_token")
            // console.log(oauthToken);


            // dispatch({
            //     type: AUTHENTICATE_TWITTER,
            //     oauthToken: 111,
            //     authUrl: 222,
            // });
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
    let headerObj = {'Content-Type': 'application/json'};

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
