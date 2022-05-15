import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

import ProfileImage from "./ProfileImage";

import { appColors } from "../../constants/colors";

const CustomHeader = ({ navigation, route, options, imageUri }) => {
	const title = getHeaderTitle(options, route.name);

	const ImagePressedHandler = () => {
		navigation.openDrawer();
	};

	return (
		<View style={styles.container}>
			<ProfileImage onPress={ImagePressedHandler} imageUri={imageUri} imageStyle={styles.image} />
			<View style={styles.textContainer}>
				<Text style={styles.text}>{title}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: 75,
		paddingTop: 15,
		paddingHorizontal: 15,
		backgroundColor: appColors.backgroundColor,
		borderBottomWidth: 0.5,
	},
	textContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		marginRight: 50,
	},
	text: {
		color: "white",
		fontSize: 19,
		fontWeight: "bold",
	},
	image: {
		width: 35,
		height: 35,
		borderRadius: 50,
	},
});

export default CustomHeader;
