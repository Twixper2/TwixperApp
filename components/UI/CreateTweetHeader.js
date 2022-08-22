import { View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { appColors } from "../../constants/colors";
import ConfirmButton from "./ConfirmButton";

const CreateTweetHeader = ({ navigation, onPressTweet, disabled }) => {
	const onCloseHandler = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Ionicons
				name="close"
				size={30}
				color={appColors.iconColor}
				onPress={onCloseHandler}
				style={styles.closeButton}
			/>

			<ConfirmButton
				text={{ color: "white", fontSize: 16, fontWeight: "bold" }}
				button={[styles.tweetButton, disabled ? { backgroundColor: "#ccc" } : appColors.iconColor]}
				onPress={onPressTweet}
				opacity={disabled ? 1 : 0.6}
			>
				Tweet
			</ConfirmButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 75,
		paddingTop: 15,
		paddingHorizontal: 15,
		backgroundColor: appColors.backgroundColor,
		borderBottomWidth: 0.5,
	},
	tweetButton: {
		borderRadius: 30,
		paddingVertical: 7,
		paddingHorizontal: 20,
		marginBottom: 12,
	},
	closeButton: {
		marginBottom: 12,
	},
});

export default CreateTweetHeader;
