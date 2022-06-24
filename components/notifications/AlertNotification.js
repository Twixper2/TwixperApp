import { StyleSheet, Text, View } from "react-native";

import { appColors } from "../../constants/colors";

import SvgIcon from "../UI/SvgIcon";

const AlertNotification = ({ notificationData }) => {
	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<SvgIcon name="AlertSvg" style={styles.svg} />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>{notificationData.titleText}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		paddingVertical: 11,
		paddingHorizontal: 15,
		borderBottomWidth: 0.4,
		borderBottomColor: appColors.silverBorderColor,
		backgroundColor: appColors.screenBackgroundColor,
	},
	svgContainer: {
		marginRight: 11,
		paddingLeft: 11,
	},
	textContainer: {
		paddingRight: 19,
		flexShrink: 1,
	},
	svg: {
		width: 35,
		height: 35,
	},
	text: {
		flexShrink: 1,
		fontSize: 14,
		color: appColors.lightWhiteFontColor,
	},
});

export default AlertNotification;
