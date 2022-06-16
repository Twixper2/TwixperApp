import { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ProfileImage from "../UI/ProfileImage";
import ConfirmButton from "../UI/ConfirmButton";

import { appColors } from "../../constants/colors";
import { PROFILE_SCREEN, TWEET_SCREEN } from "../../constants/screenNames";

const PersonPreview = (props) => {
	const navigation = useNavigation();
	const [touched, setTouched] = useState(false);

	const { personData } = props;
	const { username, userHandle, profileImgURL, userDescription, FollowingStatus, isProfileVerified } = personData;

	const navigateTo = (screen) => {
		let data;

		// if (screen === PROFILE_SCREEN) {
		// 	data = tweetAuthor;
		// } else {
		// 	data = tweetData;
		// }
		//  TODO: Uncomment This!
		// navigation.navigate(screen, { data });
	};

	return (
		<TouchableHighlight style={styles.container} onPress={navigateTo.bind(this, TWEET_SCREEN)}>
			<View style={styles.container2}>
				<View style={styles.innerContainer}>
					<View style={styles.photoContainer}>
						<ProfileImage
							onPress={navigateTo.bind(this, PROFILE_SCREEN)}
							imageStyle={styles.photo}
							imageUri={profileImgURL}
						/>
					</View>
					<View style={styles.info}>
						<View style={styles.userDetails}>
							<Text style={styles.userName}>
								{username}{" "}
								{isProfileVerified && (
									<MaterialCommunityIcons name={"check-decagram"} size={12} color={"white"} />
								)}
							</Text>
							<Text style={styles.userHandleAndTime}>{userHandle}</Text>
						</View>
					</View>
					<View style={styles.FollowButtonContainer}>
						<ConfirmButton
							text={{
								color: FollowingStatus === "Follow" ? appColors.screenBackgroundColor : "white",
								fontSize: 14,
								fontWeight: "bold",
							}}
							button={{
								backgroundColor:
									FollowingStatus === "Follow" ? "white" : appColors.screenBackgroundColor,
								borderColor: "white",
								borderWidth: 0.5,
								borderRadius: 30,
								paddingVertical: 7,
								paddingHorizontal: 15,
								marginBottom: 12,
							}}
							onPress={() => {
								console.log("TODO - Follow & UnFollow Button");
							}}
						>
							{FollowingStatus}
						</ConfirmButton>
					</View>
				</View>
				<View style={styles.bio}>
					<Text style={{ color: "white" }}>{userDescription}</Text>
				</View>
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderBottomColor: "black",
		borderBottomWidth: 0.5,
		flexDirection: "column",
		backgroundColor: appColors.screenBackgroundColor,
		alignItems: "flex-start",
		alignContent: "flex-start",
		justifyContent: "center",
	},
	container2: {
		flex: 1,
		borderBottomColor: "black",
		borderBottomWidth: 0.5,
		flexDirection: "column",
		backgroundColor: appColors.screenBackgroundColor,
		alignItems: "flex-start",
		justifyContent: "center",
	},
	innerContainer: {
		flex: 0.1,
		borderColor: "green",
		flexDirection: "row",
		borderWidth: 0,
		height: "auto",
		alignItems: "center",
		justifyContent: "center",
	},
	photoContainer: {
		flex: 0.23,
		borderWidth: 0,
		alignItems: "center",
		borderColor: "yellow",
		flexDirection: "column",
	},
	photo: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginTop: 15,
	},
	info: {
		flex: 0.6,
		borderColor: "yellow",
		flexDirection: "row",
		borderWidth: 0,
	},
	FollowButtonContainer: {
		flex: 0.4,
		borderColor: "yellow",
		flexDirection: "row",
		borderWidth: 0,
		justifyContent: "center",
		left: 10,
	},
	userDetails: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
		marginBottom: 5,
	},
	userName: {
		color: "white",
		fontWeight: "bold",
	},
	userHandleAndTime: {
		color: appColors.lightFontColor,
		marginLeft: 5,
	},
	bio: {
		flex: 0.1,
		// flexDirection: "column",
		// justifyContent: "space-between",
		padding: 5,
		paddingLeft: 15,
	},
});

export default PersonPreview;
