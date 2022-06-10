import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { useSelector } from "react-redux";
import { Button } from "react-native-elements";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ProfileTabsNavigator from "../../navigation/ProfileTabsNavigator";

import ProfileImage from "../../components/UI/ProfileImage";
import { appColors } from "../../constants/colors";

const ProfileScreen = ({ route, navigation }) => {
	const { data: userData } = route.params;
	const { username: participantUsername } = useSelector((state) => state.auth);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: (
				<Text>
					{userData.username} <MaterialCommunityIcons name={"check-decagram"} size={16} color={"white"} />
				</Text>
			),
		});
	}, [navigation]);

	// if (userData.userHandle !== participantUsername) {
	// 	console.log("Not the Participant -> Need Get User's Data");
	// } else {
	// 	console.log("It's the participant");
	// }

	return (
		<View style={styles.container}>
			<View style={styles.topBannerContainer}>
				<View style={styles.bannerImageContainer}>
					<Image
						style={[StyleSheet.absoluteFill, { resizeMode: "cover" }]}
						source={{ uri: userData.coverImgURL }}
					/>
				</View>
				<View style={styles.info}>
					<View style={styles.infoTop}>
						<ProfileImage
							onPress={() => console.log("Expand Image")}
							imageUri={userData.profileImgURL}
							imageStyle={styles.userPhoto}
						/>

						{userData.userHandle === participantUsername && (
							<Button
								buttonStyle={styles.editProfileButton}
								onPress={() => console.log("What To Do With This Button??")}
								title="Edit Profile"
								textStyle={styles.editProfileButtonText}
							/>
						)}
					</View>

					<View style={styles.nameAndHandle}>
						<Text style={styles.name}>
							{userData.username}{" "}
							<MaterialCommunityIcons name={"check-decagram"} size={16} color={"white"} />
						</Text>
						<Text style={styles.handle}>@{userData.userHandle}</Text>
					</View>
					<View style={styles.bio}>
						<Text style={{ color: "white" }}>{userData.userDescription}</Text>
					</View>
					<View style={styles.cityAndLinkContainer}>
						<SimpleLineIcons name={"location-pin"} size={14} color={appColors.lightFontColor}>
							<Text style={styles.city}> {userData.userLocation}</Text>
						</SimpleLineIcons>
						<Ionicons
							name={"ios-link-outline"}
							size={18}
							style={{ marginLeft: 15 }}
							color={appColors.lightFontColor}
						>
							<Text style={styles.link}> {userData.userURL}</Text>
						</Ionicons>
					</View>
					<View style={styles.dobContainer}>
						<Ionicons name={"calendar"} size={16} color={appColors.lightFontColor} />
						<Text style={styles.dob}>{userData.whenJoined}</Text>
					</View>
					<View style={styles.followingAndFollowersContainer}>
						<View style={styles.followingContainer}>
							<Text style={styles.followingCount}>{userData.friendsCount}</Text>
							<Text style={styles.followingText}>Following</Text>
						</View>
						<View style={styles.followersContainer}>
							<Text style={styles.followersCount}>{userData.followersCount}</Text>
							<Text style={styles.followersText}> Followers</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.TabsContainer}>
				<ProfileTabsNavigator username={userData.username} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgb(20, 29, 38)",
	},
	topBannerContainer: {
		flex: 1,
		borderColor: "yellow",
		borderWidth: 0,
		backgroundColor: appColors.screenBackgroundColor,
	},
	bannerImageContainer: {
		flex: 0.25,
		borderColor: "red",
		borderWidth: 0,
	},
	info: {
		flex: 0.75,
		borderColor: "blue",
		flexDirection: "column",
		borderWidth: 0,
	},
	infoTop: {
		borderColor: "red",
		flexDirection: "row",
		borderWidth: 0,
		justifyContent: "space-between",
		padding: 10,
		paddingLeft: 15,
		paddingRight: 15,
	},
	editProfileButton: {
		backgroundColor: "transparent",
		borderColor: appColors.iconColor,
		borderWidth: 1,
		borderRadius: 25,
		padding: 6,
		width: 100,
	},
	editProfileButtonText: {
		color: appColors.lightFontColor,
		fontWeight: "bold",
		backgroundColor: "transparent",
		fontSize: 14,
	},
	nameAndHandle: {
		borderColor: "red",
		flexDirection: "column",
		borderWidth: 0,
		justifyContent: "space-between",
		paddingLeft: 15,
	},
	name: {
		color: "white",
		fontWeight: "bold",
		fontSize: 18,
	},
	handle: {
		color: appColors.lightFontColor,
		fontWeight: "bold",
		fontSize: 14,
	},
	bio: {
		flexDirection: "column",
		justifyContent: "space-between",
		padding: 5,
		paddingLeft: 15,
	},
	cityAndLinkContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		padding: 5,
		paddingLeft: 15,
	},
	city: {
		color: appColors.iconColor,
		fontSize: 14,
		marginLeft: 15,
	},
	link: {
		color: appColors.iconColor,
		fontSize: 14,
		marginLeft: 15,
	},
	dobContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		padding: 5,
		paddingLeft: 15,
	},
	dob: {
		color: appColors.lightFontColor,
		fontSize: 14,
		marginLeft: 10,
	},
	followingAndFollowersContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		padding: 5,
		paddingLeft: 15,
	},
	followingContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginRight: 15,
	},
	followingCount: {
		color: "white",
		fontWeight: "bold",
	},
	followingText: {
		color: appColors.lightFontColor,
		fontWeight: "300",
		marginLeft: 5,
	},
	followersContainer: {
		flexDirection: "row",
	},
	followersCount: {
		color: "white",
		fontWeight: "bold",
	},
	followersText: {
		color: appColors.lightFontColor,
		fontWeight: "300",
		marginLeft: 0,
	},
	userPhoto: {
		width: 70,
		height: 70,
		borderRadius: 55,
		zIndex: 1000000000000,
		borderWidth: 0,
		borderColor: "black",
		resizeMode: "cover",
	},
	TabsContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		paddingTop: 15,
		paddingHorizontal: 5,
		backgroundColor: appColors.screenBackgroundColor,
	},
});

export default ProfileScreen;
