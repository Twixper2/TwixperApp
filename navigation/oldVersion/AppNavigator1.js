// TODO: Delete !!

import React from "react";
import { View, Text } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import LoginTwitterScreen from "../../screens/auth/LoginTwitterScreen";
import LoginExperimentScreen from "../../screens/auth/LoginExperimentScreen";
import UserFeedScreen from "../../screens/user/UserFeedScreen";

import LoadingScreen from "../../screens/LoadingScreen";
import TweetClone from "../../screens/TweetClone";

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
