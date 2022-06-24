import { StyleSheet, Text, View } from "react-native";

import SvgIcon from "../UI/SvgIcon";
import ProfileImage from "../UI/ProfileImage";

import { appColors } from "../../constants/colors";

const FollowerNotification = ({ notificationData }) => {
	return (
		<View style={styles.container}>
			<View style={styles.svgContainer}>
				<SvgIcon name="FollowersSvg" style={styles.svg} />
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.imageContainer}>
					<ProfileImage imageStyle={styles.profileImg} imageUri={notificationData.profileImgURL} />
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
		borderBottomWidth: 0.3,
		borderTopWidth: 0.3,
		borderColor: appColors.silverBorderColor,
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
	bodyTextContainer: {
		flexShrink: 1,
		flexDirection: "row",
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
	bodyText: {
		flexShrink: 1,
		fontSize: 14,
		fontWeight: "bold",
		color: appColors.lightWhiteFontColor,
	},
});

export default FollowerNotification;
