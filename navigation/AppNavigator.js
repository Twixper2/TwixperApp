import React from "react";
import { View, Text } from "react-native";
//TODO: Need to decide if to this like -
//      1. rn-shop-app: Navigation Container
//      2. rn-meal-app: 1 App Navigator
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import LoginTwitterScreen from "../screens/login/LoginTwitterScreen";
import LoginExperimentScreen from "../screens/login/LoginExperimentScreen";
import UserFeedScreen from "../screens/user/UserFeedScreen";

import LoadingScreen from "../screens/LoadingScreen";
import TweetClone from '../screens/TweetClone'

// const AppStack = createDrawerNavigator({
// 	User: UserFeedScreen,
// 	Home: () => (
// 		<View style={{ flex: 1 }}>
// 			<Text>The Home</Text>
// 		</View>
// 	),
// 	Profile: () => (
// 		<View style={{ flex: 1 }}>
// 			<Text>Profile Page</Text>
// 		</View>
// 	),
// });

const TwixperNavigator = createSwitchNavigator(
	{
		//  TODO: Remove from comment when finish feed
		// LoginTwitter: LoginTwitterScreen,
		// LoginExperiment: LoginExperimentScreen,
		Loading: LoadingScreen,
		App: UserFeedScreen,
	},
	{
		initialRouteName: "Loading",
	}
);

export default createAppContainer(TwixperNavigator);
