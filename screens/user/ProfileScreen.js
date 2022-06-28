import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ProfileTabsNavigator from "../../navigation/ProfileTabsNavigator";

import ProfileImage from "../../components/UI/ProfileImage";
import PressableText from "../../components/UI/PressableText";

import * as profileActions from "../../utils/actions/profile";

import { appColors } from "../../constants/colors";
import { FOLLOWING_SCREEN, FOLLOWERS_SCREEN } from "../../constants/screenNames";
import { getObjectValue, getStringValue } from "../../utils/storageFunctions";
import { collationNames, profileKeys, localStorageKeys } from "../../constants/commonKeys";

const ProfileScreen = ({ route, navigation }) => {
	const { data } = route.params;

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();

	const [userData, setUserEntity] = useState("");
	const [participantUsername, setParticipantUsername] = useState("");

	const loadUserDetails = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			let participantName = await getStringValue(localStorageKeys.USERNAME);
			// setParticipantUsername(participantName);

			if (data.userHandle !== participantName) {
				console.log("It's not the participant");

				await profileActions.get_user_details(data.userHandle);
				let userEntityData = await getObjectValue(
					collationNames.PROFILE + profileKeys.USER_ENTITY + data.userHandle
				);
				setUserEntity(userEntityData.userEntity);
			} else {
				console.log("It's the participant");
				let userEntityData = await getObjectValue(localStorageKeys.USER_TWITTER_ENTITY);
				setUserEntity(userEntityData);
			}
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUserDetails().then(() => {
			setIsLoading(false);
		});
	}, [loadUserDetails]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: (
				<Text>
					{data.username} <MaterialCommunityIcons name={"check-decagram"} size={16} color={"white"} />
				</Text>
			),
		});
	}, [navigation]);

	const navigateTo = (screen) => {
		if (Array.isArray(screen)) {
			navigation.navigate(screen[0], { ...screen[1], params: { data: userData } });
		} else {
			navigation.navigate(screen, { data: userData });
		}
	};

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadUserDetails} />
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

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
							<PressableText
								onPress={navigateTo.bind(this, FOLLOWING_SCREEN)}
								textStyle={styles.followingCount}
							>
								{userData.friendsCount} <Text style={styles.followingText}> Following</Text>
							</PressableText>
						</View>
						<View style={styles.followersContainer}>
							<PressableText
								onPress={navigateTo.bind(this, FOLLOWERS_SCREEN)}
								textStyle={styles.followersCount}
							>
								{userData.followersCount} <Text style={styles.followersText}> Followers</Text>
							</PressableText>
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
		backgroundColor: appColors.screenDarkBackgroundColor,
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
		flex: 1,
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
		// paddingTop: 5,
		paddingHorizontal: 5,
		backgroundColor: appColors.screenBackgroundColor,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		backgroundColor: appColors.screenBackgroundColor,
	},
});

export default ProfileScreen;
