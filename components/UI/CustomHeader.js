import { View, Text, StyleSheet } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileImage from "./ProfileImage";
import AlgoRankingSvg from "../../assets/images/AlgoRankingSvg";

import { appColors } from "../../constants/colors";

const CustomHeader = ({ navigation, route, options, imageUri }) => {
	const title = getHeaderTitle(options, route.name);

	const onPressHandler = () => {
		if (imageUri) {
			navigation.openDrawer();
		} else {
			navigation.goBack();
		}
	};

	return (
		<View style={styles.container}>
			{imageUri ? (
				<ProfileImage onPress={onPressHandler} imageUri={imageUri} imageStyle={styles.image} />
			) : (
				<Ionicons name="arrow-back" size={24} color="white" onPress={onPressHandler} />
			)}
			<View style={styles.textContainer}>
				<Text style={styles.text}>{title}</Text>
			</View>
			{title == "Home" && <AlgoRankingSvg style={styles.svg} />}
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
	svg: {
		width: 35,
		height: 35,
		marginTop: 15,
	},
});

export default CustomHeader;
