import {
    AUTHENTICATE_TWITTER,
    AUTHENTICATE_ACCESS_TOKEN,
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
        default:
            return state;
    }
};
