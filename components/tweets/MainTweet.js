import { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TweetActionsInfoBar from "./TweetActionsInfoBar";
import ProfileImage from "../UI/ProfileImage";
import ExpandableImg from "../UI/ExpandableImg";

import { appColors } from "../../constants/colors";
import { PROFILE_SCREEN, TWEET_SCREEN } from "../../constants/screenNames";

const MainTweet = ({ tweetData }) => {
	const navigation = useNavigation();
	const [touched, setTouched] = useState(false);

	console.log("This is Main Tweet!");
	const { tweetId, time, fullText, media, pixelMedia, tweetAuthor, quotedStatus, isQuotedStatus } = tweetData;

	const { username, userHandle, profileImgURL, isProfileVerified } = tweetAuthor;

	let quotedBy;
	if (isQuotedStatus) {
		quotedBy = quotedStatus.tweetAuthor.username;
	}

	const tweetPressed = (pressed = false) => {
		setTouched(pressed);
	};

	const navigateTo = (screen) => {
		let data;

		if (screen === PROFILE_SCREEN) {
			data = tweetAuthor;
		} else {
			data = tweetData;
		}

		navigation.navigate(screen, { data });
	};

	return (
		<TouchableHighlight
			onPress={navigateTo.bind(this, TWEET_SCREEN)}
			onPressIn={tweetPressed.bind(this, true)}
			onPressOut={tweetPressed.bind(this, false)}
		>
			<View key={tweetId} style={styles.container}>
				{!isQuotedStatus ? (
					<View style={styles.isReplyContainer}>
						<View style={{ flex: 0.23, borderColor: "red", borderWidth: 0, alignItems: "flex-end" }}>
							<EvilIcons name={"retweet"} size={25} color={appColors.lightFontColor} />
						</View>
						<Text style={{ flex: 0.5, color: appColors.lightFontColor }}>{quotedBy} Retweeted</Text>
					</View>
				) : (
					true
				)}
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
								<Text style={styles.userHandleAndTime}>
									{userHandle} · {time}
								</Text>
							</Text>
						</View>
						<View style={styles.tweetTextContainer}>
							<Text style={styles.tweetText}>{fullText}</Text>
						</View>
						{media.length !== 0 && (
							<View style={styles.mediaContainer}>
								{media[0].type === "photo" && (
									<ExpandableImg mediaData={media[0]} pixelMedia={pixelMedia} />
								)}
							</View>
						)}
						<View style={styles.tweetActionsContainer}>
							<TweetActionsInfoBar tweetData={tweetData.actionsBarData} />
						</View>
					</View>
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
	},
	isReplyContainer: {
		flex: 1,
		borderColor: "green",
		flexDirection: "row",
		borderWidth: 0,
		height: 20,
		marginTop: 5,
	},
	innerContainer: {
		flex: 1,
		borderColor: "green",
		flexDirection: "row",
		borderWidth: 0,
		height: "auto",
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
		flex: 0.77,
		borderColor: "yellow",
		flexDirection: "column",
		borderWidth: 0,
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
	tweetTextContainer: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
	},
	tweetText: {
		color: "white",
		paddingRight: 10,
		// fontSize: 14,
	},
	tweetActionsContainer: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
		marginTop: 5,
		flexDirection: "row",
		paddingBottom: 5,
	},
	mediaContainer: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MainTweet;
