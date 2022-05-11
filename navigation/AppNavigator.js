import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/user/ProfileScreen";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";

import { getUserTwitterEntity } from "../utils/storageFunctions";
import { Image, Text, View, TouchableOpacity } from "react-native";

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
			<AppDrawer.Screen
				name="HomeNavigator"
				component={HomeNavigator}
				options={{
					title: "Home",
					header: ({ navigation, route, options, layout }) => {
						if (options) {
							console.log(options.headerStyle);
							console.log(layout);
						}
						console.log("This is an header\n Look at URL" + userEntityData.profile_image_url_https);
						return (
							<View style={[{ height: 100 }, options.headerStyle]}>
								<TouchableOpacity onPress={() => navigation.openDrawer()}>
									<Image
										style={{
											width: 50,
											height: 50,
											borderRadius: 50,
											marginTop: 15,
										}}
										source={{ uri: userEntityData.profile_image_url_https }}
									/>
								</TouchableOpacity>
								<Text>What?!?!</Text>
							</View>
						);
					},
				}}
			/>
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default AppNavigator;
