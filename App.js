import "react-native-gesture-handler";

import "react-native-url-polyfill/auto";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import tweetsReducer from "./store/reducers/tweets";
import twitterAuthReducer from "./store/reducers/twitterAuth";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

const rootReducer = combineReducers({
	auth: authReducer,
	tweets: tweetsReducer,
	//  TODO: Old Version Auth
	twitterAuth: twitterAuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	//  TODO: Check if is Authenticated !!
	// const isAuthenticated = false;
	const isAuthenticated = store.getState().auth.providedCredentials && store.getState().auth.registeredToExperiment;

	return (
		<Provider store={store}>
			<StatusBar style="light" />
			<NavigationContainer>
				{!isAuthenticated && <AuthNavigator />}
				{isAuthenticated && <AppNavigator />}
			</NavigationContainer>
		</Provider>
	);
}

// First - Vertical  | Second - Horizontal
// padding: 20% 10%
const styles = StyleSheet.create({});
