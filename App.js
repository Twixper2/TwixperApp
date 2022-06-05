import "react-native-gesture-handler";

import "react-native-url-polyfill/auto";

import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import tweetsReducer from "./store/reducers/tweets";
import twitterAuthReducer from "./store/reducers/twitterAuth";
import RootNavigator from "./navigation/RootNavigator";
import PushNotifications from "./screens/PushNotifications";

const rootReducer = combineReducers({
	auth: authReducer,
	tweets: tweetsReducer,
	//  TODO: Old Version Auth
	twitterAuth: twitterAuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar style="auto" />
			<PushNotifications />
			{/* <StatusBar style="light" /> */}
			{/* <RootNavigator /> */}
		</Provider>
	);
}

// First - Vertical  | Second - Horizontal
// padding: 20% 10%
const styles = StyleSheet.create({});
