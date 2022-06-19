import { StyleSheet, Text, View } from "react-native";

import { appColors } from "../../constants/colors";

import SvgIcon from "../UI/SvgIcon";

const SuggestionsNotification = () => {
	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<SvgIcon name="SuggestionSvg" style={styles.svg} />
				<Text style={styles.text}>Suggestion SVG{"    "}</Text>
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

export default SuggestionsNotification;
