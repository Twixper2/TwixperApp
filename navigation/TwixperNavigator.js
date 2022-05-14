import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Ionicons from "react-native-vector-icons/Ionicons";

import HomeNavigator from "./HomeNavigator";
import DrawerContainer from "./DrawerContainer";

import ProfileScreen from "../screens/user/ProfileScreen";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";

import CreateTweetScreen from "../screens/CreateTweetScreen";

// import CustomHeader from "../components/UI/CustomHeader";

import { getUserTwitterEntity } from "../utils/storageFunctions";
import { appColors } from "../constants/colors";
import ConfirmButton from "../components/UI/ConfirmButton";

const HomeTweetStack = createNativeStackNavigator();

const HomeAndCreateTweetStack = () => {
	return (
		<HomeTweetStack.Navigator>
			<HomeTweetStack.Screen name="HomeWithTweet" component={HomeNavigator} options={{ header: () => null }} />
			<HomeTweetStack.Screen
				name="CreateTweet"
				component={CreateTweetScreen}
				options={{
					headerStyle: {
						backgroundColor: appColors.backgroundColor,
					},
					headerLeft: ({ navigation }) => (
						<Ionicons name="close" size={30} color={appColors.iconColor} onPress={() => navigation.goBack()} style={{ marginBottom: 12 }} />
					),
					headerRight: ({ navigation }) => (
						<ConfirmButton
							text={{ color: "white", fontSize: 16, fontWeight: "bold" }}
							button={{ backgroundColor: appColors.iconColor, borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 12 }}
							onPress={() => {}}
						>
							Tweet
						</ConfirmButton>
					),
					title: "",
				}}
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
		<AppDrawer.Navigator drawerContent={(props) => <DrawerContainer {...props} userData={userEntityData} />}>
			<AppDrawer.Screen name="Home" component={HomeAndCreateTweetStack} />
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default TwixperNavigator;
