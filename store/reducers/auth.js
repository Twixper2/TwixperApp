import {
    AUTHENTICATE_TWITTER,
    AUTHENTICATE_ACCESS_TOKEN,
    USER_TWITTER_TOKEN
} from "../actions/auth";

const initialState = {
    authUrl: null,
    oauthToken: null,
    oauthTokenSecret: null,
    user_twitter_token: null,
    user_twitter_token_secret: null

};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_TWITTER:
            return {
                authUrl: action.authUrl,
                oauthToken: action.oauthToken,
            };
        case AUTHENTICATE_ACCESS_TOKEN:
            return {
                ...state,
                oauthToken: action.oauthToken,
                oauthTokenSecret: action.oauthTokenSecret,
            };
        case USER_TWITTER_TOKEN:
            return {
                ...state,
                user_twitter_token: action.user_twitter_token,
                user_twitter_token_secret: action.user_twitter_token_secret
            };
        default:
            return state;
    }
};
