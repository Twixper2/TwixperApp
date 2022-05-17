import { StyleSheet, Text, View } from "react-native";

import { appColors } from "../../constants/colors";

const MessagesScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.tempText}>This is :{"\n"}MessagesScreen !!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: appColors.screenBackgroundColor,
	},
	tempText: {
		fontSize: 32,
		color: appColors.iconColor,
		textAlign: "center",
	},
});

export default MessagesScreen;
