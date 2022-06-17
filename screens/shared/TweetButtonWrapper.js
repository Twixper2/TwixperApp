import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";

import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { appColors } from "../../constants/colors";
import { CREATE_TWEET_SCREEN } from "../../constants/screenNames";

const TweetButtonWrapper = ({ navigation, children }) => {
	return (
		<View style={styles.container}>
			{children}

			<TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate(CREATE_TWEET_SCREEN)}>
				<Octicons name={"plus-small"} size={26} style={styles.plusIcon} />
				<MaterialCommunityIcons name={"feather"} size={26} style={styles.featherIcon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	iconContainer: {
		elevation: 4,
		backgroundColor: appColors.iconColor,
		borderRadius: 50,
		padding: 25,
		margin: 15,
		position: "absolute",
		bottom: Platform.OS === "android" ? 50 : 80,
		right: 0,
	},
	plusIcon: {
		position: "absolute",
		left: 12,
		color: "white",
		top: 12,
	},
	featherIcon: {
		color: "white",
		position: "absolute",
		left: 20,
		top: 14,
	},
});

export default TweetButtonWrapper;
