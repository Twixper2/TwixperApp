//TODO: Need to decide if to this like -
//      1. rn-shop-app: Navigation Container
//      2. rn-meal-app: 1 App Navigator
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginTwitterScreen from "../screens/login/LoginTwitterScreen";
import LoginExperimentScreen from "../screens/login/LoginExperimentScreen";
import UserFeedScreen from "../screens/user/UserFeedScreen";

const TwixperNavigator = createStackNavigator(
	{
		//  TODO: Remove from comment when finish feed
		// LoginTwitter: LoginTwitterScreen,
		// LoginExperiment: LoginExperimentScreen,
		UserFeed: UserFeedScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: "rgba(207, 242, 253, 0.5)",
			},
			headerTintColor: "white",
		},
	}
);

export default createAppContainer(TwixperNavigator);
