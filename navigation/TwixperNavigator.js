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
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";
import CustomHeader from "../components/UI/CustomHeader";
import ConfirmButton from "../components/UI/ConfirmButton";

import { appColors } from "../constants/colors";
// import { getUserTwitterEntity } from "../utils/storageFunctions";

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
				options={({ navigation }) => ({
					headerStyle: {
						backgroundColor: appColors.backgroundColor,
					},
					headerLeft: () => (
						<Ionicons
							name="close"
							size={30}
							color={appColors.iconColor}
							onPress={() => {
								navigation.goBack();
							}}
							style={{ marginBottom: 12 }}
						/>
					),
					headerRight: () => (
						<ConfirmButton
							text={{ color: "white", fontSize: 16, fontWeight: "bold" }}
							button={{ backgroundColor: appColors.iconColor, borderRadius: 30, paddingVertical: 7, paddingHorizontal: 20, marginBottom: 12 }}
							onPress={() => {}}
						>
							Tweet
						</ConfirmButton>
					),
					title: "",
				})}
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
	// const [userEntityData, setUserEntityData] = useState("");
	const userEntityData = useSelector((state) => state.auth.userTwitterEntity);

	if (!userEntityData) {
		//  TODO: Fix it to better Solution !
		return null;
	}

	return (
		<AppDrawer.Navigator
			screenOptions={() => ({ header: (props) => <CustomHeader {...props} /> })}
			drawerContent={(props) => <DrawerContainer {...props} userData={userEntityData} />}
		>
			<AppDrawer.Screen name="Home" component={HomeTweetStack} options={{ header: () => null }} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default TwixperNavigator;
