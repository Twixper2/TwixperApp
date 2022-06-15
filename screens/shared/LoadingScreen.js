import { View, StyleSheet, ActivityIndicator, Image } from "react-native";

import SvgIcon from "../../components/UI/SvgIcon";

import { appColors } from "../../constants/colors";

const LoadingScreen = () => {
	return (
		<View style={styles.screen}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require("../../assets/images/logo_no_desc.png")} />
			</View>
			<View style={styles.centered}>
				<SvgIcon name="IconSvg" style={styles.icon} />
				<ActivityIndicator style={styles.loadingIndicator} size={60} color={appColors.iconColor} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: appColors.loginScreensBackground,
	},
	imageContainer: {
		marginTop: "22%",
		paddingHorizontal: "3%",
	},
	centered: {
		flex: 1,
		marginBottom: "45%",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		backgroundColor: appColors.loginScreensBackground,
	},
	image: {
		maxWidth: "100%",
		maxHeight: "100%",
		resizeMode: "contain",
		flexDirection: "row" /* remove extra space below image */,
	},
	icon: {
		marginBottom: 30,
		width: 120,
		height: 120,
		marginTop: 15,
	},
	loadingIndicator: {
		marginTop: 30,
	},
});

export default LoadingScreen;
