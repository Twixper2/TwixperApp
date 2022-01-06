//TODO: Need to decide if to this like -
//      1. rn-shop-app: Navigation Container
//      2. rn-meal-app: 1 App Navigator

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import CopyWelcomeScreen from "../screens/CopyWelcomeScreen";
import LoginExperimentScreen from "../screens/login/LoginExperimentScreen";
import UserFeedScreen from "../screens/user/UserFeedScreen";

const TwixperNavigator = createStackNavigator(
    {
        Welcome: CopyWelcomeScreen,
        LoginExperiment: LoginExperimentScreen,
        UserFeed: UserFeedScreen
    },
    {
        // defaultNavigationOptions: {
        //     headerStyle: {
        //         backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        //     },
        //     headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        // }
    }
);

export default createAppContainer(TwixperNavigator);
