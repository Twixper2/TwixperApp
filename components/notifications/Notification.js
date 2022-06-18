import { StyleSheet, Text, View } from "react-native";

import { appColors } from "../../constants/colors";

import SvgIcon from "../UI/SvgIcon";

const Notification = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.tempText}>This is : Notification !!</Text>
			<View style={styles.svgContainer}>
				<SvgIcon name="SuggestionSvg" style={styles.svg} />
				<Text style={styles.text}>Suggestion SVG{"    "}</Text>
			</View>

			<View style={styles.svgContainer}>
				<SvgIcon name="AlertSvg" style={styles.svg} />
				<Text style={styles.text}>Twitter Alert SVG</Text>
			</View>
			<View style={styles.svgContainer}>
				<SvgIcon name="FollowersSvg" style={styles.svg} />
				<Text style={styles.text}>Followers SVG{"    "}</Text>
			</View>
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
		fontSize: 26,
		color: appColors.iconColor,
		textAlign: "center",
		padding: 10,
	},
	svg: {
		width: 35,
		height: 35,
	},
	svgContainer: {
		padding: 10,
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 130,
	},
	text: {
		fontSize: 16,
		color: appColors.mediumGreyFontColor,
		margin: 10,
	},
});

export default Notification;
