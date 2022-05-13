import { useState, useEffect } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/user/ProfileScreen";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";

// import CustomHeader from "../components/UI/CustomHeader";

import { getUserTwitterEntity } from "../utils/storageFunctions";
import DrawerContainer from "./DrawerContainer";

const AppDrawer = createDrawerNavigator();

const AppNavigator = () => {
	const [userEntityData, setUserEntityData] = useState("");

	useEffect(async () => {
		let userData = await getUserTwitterEntity();
		console.log(userData);
		setUserEntityData(userData);
	}, [getUserTwitterEntity, setUserEntityData]);

	console.log(userEntityData.profile_image_url_https);

	return (
		<AppDrawer.Navigator
			drawerContent={(props) => <DrawerContainer {...props} userData={userEntityData} />}
			screenOptions={{
				headerStyle: { backgroundColor: "rgb(27, 40, 54)" },
				headerTintColor: "white",
				sceneContainerStyle: { backgroundColor: "rgb(27, 40, 54)" },
				drawerContentStyle: { backgroundColor: "rgb(27, 42, 51)" },
				drawerInactiveTintColor: "white",
				drawerActiveTintColor: "#351401",
				drawerActiveBackgroundColor: "rgb(136, 153, 166)",
			}}
		>
			<AppDrawer.Screen name="HomeNavigator" component={HomeNavigator} options={{ title: "Home" }} />
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default AppNavigator;
