// TODO: Delete !!
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginTwitterScreen from "../../screens/auth/LoginTwitterScreen";
import LoginExperimentScreen from "../../screens/auth/LoginExperimentScreen";
import UserFeedScreen from "../../screens/user/UserFeedScreen";

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
