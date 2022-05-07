import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/user/ProfileScreen";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";

import { getUserTwitterEntity } from "../utils/storageFunctions";
import { Image } from "react-native";

const AppDrawer = createDrawerNavigator();

const AppNavigator = () => {
	const [userEntityData, setUserEntityData] = useState("");

	useEffect(async () => {
		let userData = await getUserTwitterEntity();
		setUserEntityData(userData);
	}, [getUserTwitterEntity, setUserEntityData]);

	return (
		<AppDrawer.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: "rgb(27, 40, 54)" },
				headerTintColor: "white",
				sceneContainerStyle: { backgroundColor: "rgb(27, 40, 54)" },
				drawerContentStyle: { backgroundColor: "rgb(27, 42, 51)" },
				drawerInactiveTintColor: "white",
				drawerActiveTintColor: "#351401",
				drawerActiveBackgroundColor: "rgb(136, 153, 166)",
				//  TODO: Stopped Here
				// headerLeft: () => {
				// 	userEntityData && (
				// 		<Image
				// 			style={{
				// 				width: 50,
				// 				height: 50,
				// 				borderRadius: 50,
				// 				marginTop: 15,
				// 			}}
				// 			source={{ uri: userEntityData.profile_image_url_https }}
				// 		/>
				// 	);
				// },
			}}
		>
			<AppDrawer.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerTitle: "Home" }} />
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default AppNavigator;
