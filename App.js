import "react-native-gesture-handler";

import "react-native-url-polyfill/auto";

import { StatusBar } from "expo-status-bar";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";

import authReducer from "./store/reducers/auth";
import tweetsReducer from "./store/reducers/tweets";
import twitterAuthReducer from "./store/reducers/twitterAuth";
import RootNavigator from "./navigation/RootNavigator";

import { LogBox } from "react-native";
LogBox.ignoreLogs([
	"Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
	"Animated.event now requires a second argument for options",
]); // Ignore log notification by message

enableScreens();

const rootReducer = combineReducers({
	auth: authReducer,
	tweets: tweetsReducer,
	//  TODO: Old Version Auth
	twitterAuth: twitterAuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}
	return (
		<Provider store={store}>
			<StatusBar style="light" />
			<RootNavigator />
		</Provider>
	);
}

// First - Vertical  | Second - Horizontal
// padding: 20% 10%
const styles = StyleSheet.create({});
