import { StyleSheet, Text, View } from "react-native";

import SvgIcon from "../UI/SvgIcon";
import ProfileImage from "../UI/ProfileImage";

import { appColors } from "../../constants/colors";

const SuggestionsNotification = ({ notificationData }) => {
	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<SvgIcon name="SuggestionSvg" style={styles.svg} />
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.imageContainer}>
					<ProfileImage imageStyle={styles.profileImg} imageUri={notificationData.profileImgURL} />
				</View>
				<View style={styles.titleTextContainer}>
					<Text style={styles.titleText}>{notificationData.titleText}</Text>
				</View>
				<View style={styles.bodyTextContainer}>
					<Text style={styles.bodyText}>{notificationData.bodyText}</Text>
				</View>
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
	contentContainer: {
		flex: 1,
	},
	imageContainer: {
		marginBottom: 11,
	},
	titleTextContainer: {
		flexShrink: 1,
		flexDirection: "row",
	},
	bodyTextContainer: {
		flexShrink: 1,
		flexDirection: "row",
		marginTop: 11,
	},
	svg: {
		width: 28,
		height: 28,
	},
	profileImg: {
		width: 30,
		height: 30,
		borderRadius: 50,
	},
	titleText: {
		flexShrink: 1,
		fontSize: 14,
		fontWeight: "bold",
		color: appColors.lightWhiteFontColor,
	},
	bodyText: {
		flexShrink: 1,
		fontSize: 14,
		color: appColors.lightFontColor,
	},
});

export default SuggestionsNotification;
