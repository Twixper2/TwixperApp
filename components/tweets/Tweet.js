import { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EvilIcons from "react-native-vector-icons/EvilIcons";

import ProfileImage from "../UI/ProfileImage";
import TweetActionsInfoBar from "./TweetActionsInfoBar";

import { appColors } from "../../constants/colors";

const Tweet = (props) => {
	const navigation = useNavigation();
	const [touched, setTouched] = useState(false);

	const { tweetData } = props;
	const { tweetId, time, fullText, tweetAuthor, sharedTweet, isRetweet, isPromoted } = tweetData;

	const { nameName, userHandle, profileImgURL } = tweetAuthor;

	let retweetedBy;
	if (isRetweet) {
		retweetedBy = isRetweet.retweet_author_fullName;
	}

	const tweetPressed = (pressed = false) => {
		setTouched(pressed);
	};

	const navigateTo = (screen) => {
		navigation.navigate(screen);
	};

	return (
		<TouchableHighlight onPress={navigateTo.bind(this, "TweetScreen")} onPressIn={() => tweetPressed(true)} onPressOut={() => tweetPressed()}>
			<View key={tweetId} style={styles.container}>
				{!isRetweet ? (
					<View style={styles.isReplyContainer}>
						<View style={{ flex: 0.23, borderColor: "red", borderWidth: 0, alignItems: "flex-end" }}>
							<EvilIcons name={"retweet"} size={25} color={appColors.lightFontColor} />
						</View>
						<Text style={{ flex: 0.5, color: appColors.lightFontColor }}>{retweetedBy} Retweeted</Text>
					</View>
				) : (
					true
				)}
				<View style={styles.innerContainer}>
					<View style={styles.photoContainer}>
						<ProfileImage onPress={navigateTo.bind(this, "Profile")} imageStyle={styles.photo} imageUri={profileImgURL} />
					</View>
					<View style={styles.info}>
						<View style={styles.userDetails}>
							<Text style={styles.userName}>
								{nameName}
								<Text style={styles.userHandleAndTime}>
									{userHandle} · {time}
								</Text>
							</Text>
						</View>
						<View style={styles.tweetTextContainer}>
							<Text style={styles.tweetText}>{fullText}</Text>
						</View>
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
		backgroundColor: "#1b2836",
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
	},
	tweetActionsContainer: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
		marginTop: 5,
		flexDirection: "row",
		paddingBottom: 5,
	},
	commentButton: {
		paddingLeft: 0,
		flex: 0.25,
		alignItems: "center",
		flexDirection: "row",
		borderColor: "red",
		borderWidth: 0,
	},
	commentButtonIcon: {
		margin: 0,
		marginLeft: -4,
		borderColor: "red",
		borderWidth: 0,
	},
	commentsCount: {
		position: "absolute",
		left: 27,
		color: appColors.lightFontColor,
		marginLeft: -4,
	},
	retweetButton: {
		padding: 5,
		flex: 0.25,
		alignItems: "center",
		flexDirection: "row",
		borderColor: "red",
		borderWidth: 0,
	},
	retweetButtonIcon: {
		position: "absolute",
		left: 27,

		marginLeft: 3,
	},
	likeButton: {
		padding: 5,
		flex: 0.25,
		alignItems: "center",
		flexDirection: "row",
		borderColor: "red",
		borderWidth: 0,
	},
	likeButtonIcon: {
		position: "absolute",
		left: 27,

		marginLeft: 3,
	},
	shareButton: {
		padding: 5,
		flex: 0.25,
		alignItems: "center",
		flexDirection: "row",
		borderColor: "red",
		borderWidth: 0,
	},
});

export default Tweet;
