import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomeNavigator from "./HomeNavigator";
import DrawerContainer from "./DrawerContainer";

import TweetScreen from "../screens/shared/TweetScreen";
import CreateTweetScreen from "../screens/shared/CreateTweetScreen";
import TweetButtonWrapper from "../screens/shared/TweetButtonWrapper";

import ProfileScreen from "../screens/user/ProfileScreen";
import FollowsScreen from "../screens/user/FollowsScreen";
import CustomHeader from "../components/UI/CustomHeader";
import ConfirmButton from "../components/UI/ConfirmButton";

import { appColors } from "../constants/colors";
// import { getUserTwitterEntity } from "../utils/storageFunctions";
import { getObjectValue } from "../utils/storageFunctions";
import { localStorageKeys } from "../constants/commonKeys";

const HomeProfileNavigator = createNativeStackNavigator();

const HomeProfileStack = () => {
	return (
		<HomeProfileNavigator.Navigator>
			<HomeProfileNavigator.Screen name="HomeTabs" component={HomeNavigator} options={{ header: () => null }} />
			<HomeProfileNavigator.Screen
				name="Profile"
				component={ProfileScreen}
				options={() => ({
					header: (props) => <CustomHeader {...props} />,
				})}
			/>
		</HomeProfileNavigator.Navigator>
	);
};

const HomeTweetNavigator = createNativeStackNavigator();

const HomeTweetStack = () => {
	return (
		<HomeTweetNavigator.Navigator>
			<HomeTweetNavigator.Screen name="HomeProfileScreens" options={{ header: () => null }}>
				{(props) => (
					<TweetButtonWrapper {...props}>
						<HomeProfileStack />
					</TweetButtonWrapper>
				)}
			</HomeTweetNavigator.Screen>
			<HomeTweetNavigator.Screen
				name="CreateTweet"
				component={CreateTweetScreen}
				options={{ header: () => null }}
			/>
			<HomeProfileNavigator.Screen
				name="TweetScreen"
				component={TweetScreen}
				options={() => ({
					header: (props) => <CustomHeader {...props} />,
					headerTitle: "Tweet",
				})}
			/>
		</HomeTweetNavigator.Navigator>
	);
};

const AppDrawer = createDrawerNavigator();

const TwixperNavigator = () => {
	const [userEntityData, setUserEntityData] = useState("");
	// const userEntityData = useSelector((state) => state.auth.userTwitterEntity);

	useEffect(async () => {
		if (!userEntityData) {
			let userEntity = await getObjectValue(localStorageKeys.USER_TWITTER_ENTITY);
			setUserEntityData(userEntity);
		}
	}, []);

	if (!userEntityData) {
		//  TODO: Fix it to better Solution ! - maybe loading screen
		return null;
	}

	return (
		<AppDrawer.Navigator
			screenOptions={() => ({ header: (props) => <CustomHeader {...props} /> })}
			drawerContent={(props) => <DrawerContainer {...props} userData={userEntityData} />}
		>
			<AppDrawer.Screen name="Home" component={HomeTweetStack} options={{ header: () => null }} />
			<AppDrawer.Screen name="Follows" component={FollowsScreen} />
		</AppDrawer.Navigator>
	);
};

export default TwixperNavigator;
