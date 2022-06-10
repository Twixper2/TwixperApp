import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { useSelector } from "react-redux";

import FollowsTabsNavigator from "../../navigation/FollowsTabsNavigator";

import { appColors } from "../../constants/colors";

const FollowsScreen = ({ route, navigation }) => {
	const { data: userData } = route.params;
	const { username: participantUsername } = useSelector((state) => state.auth);

	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		title: (
	// 			<Text>
	// 				{userData.username} <MaterialCommunityIcons name={"check-decagram"} size={16} color={"white"} />
	// 			</Text>
	// 		),
	// 	});
	// }, [navigation]);

	// if (userData.userHandle !== participantUsername) {
	// 	console.log("Not the Participant -> Need Get User's Data");
	// } else {
	// 	console.log("It's the participant");
	// }

	return (
		<View style={styles.container}>
			<View style={styles.TabsContainer}>
				<FollowsTabsNavigator username={userData.username} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: appColors.screenDarkBackgroundColor,
	},
	TabsContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		paddingTop: 15,
		paddingHorizontal: 5,
		backgroundColor: appColors.screenBackgroundColor,
	},
});

export default FollowsScreen;
