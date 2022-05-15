import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomeNavigator from "./HomeNavigator";
import DrawerContainer from "./DrawerContainer";

import TweetScreen from "../screens/TweetScreen";
import CreateTweetScreen from "../screens/CreateTweetScreen";
import HomeAndTweetBtnWrapper from "../screens/HomeAndTweetBtnWrapper";

import ProfileScreen from "../screens/user/ProfileScreen";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";

import ConfirmButton from "../components/UI/ConfirmButton";

import { appColors } from "../constants/colors";
import { getUserTwitterEntity } from "../utils/storageFunctions";

const HomeTweetScreenStack = createNativeStackNavigator();

const HomeAndTweetStack = () => {
	return (
		<HomeTweetScreenStack.Navigator>
			<HomeTweetScreenStack.Screen name="HomeWithTweet" component={HomeNavigator} options={{ header: () => null }} />
			<HomeTweetScreenStack.Screen name="Profile" component={ProfileScreen} options={{ header: () => null }} />
			<HomeTweetScreenStack.Screen
				name="TweetScreen"
				component={TweetScreen}
				options={{
					title: "Tweet",
					headerTitleStyle: { textAlign: "center", maxWidth: 150, borderWidth: 0, borderColor: "white", color: "white" },
					headerStyle: {
						backgroundColor: appColors.backgroundColor,
					},
					headerTintColor: "white",
				}}
			/>
		</HomeTweetScreenStack.Navigator>
	);
};

const HomeTweetStack = createNativeStackNavigator();

const HomeAndCreateTweetStack = () => {
	return (
		<HomeTweetStack.Navigator>
			<HomeTweetStack.Screen name="HomeWithCreateTweet" options={{ header: () => null }}>
				{(props) => <HomeAndTweetBtnWrapper {...props} DisplayComponent={HomeAndTweetStack} />}
			</HomeTweetStack.Screen>
			<HomeTweetStack.Screen
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
		</HomeTweetStack.Navigator>
	);
};

const AppDrawer = createDrawerNavigator();

const TwixperNavigator = () => {
	const [userEntityData, setUserEntityData] = useState("");

	useEffect(async () => {
		let userData = await getUserTwitterEntity();

		setUserEntityData(userData);
	}, [getUserTwitterEntity, setUserEntityData]);

	return (
		<AppDrawer.Navigator screenOptions={{ header: () => null }} drawerContent={(props) => <DrawerContainer {...props} userData={userEntityData} />}>
			<AppDrawer.Screen name="Home" component={HomeAndCreateTweetStack} />
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default TwixperNavigator;
