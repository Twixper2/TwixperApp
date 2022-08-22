import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TweetActionsInfoBar from "./TweetActionsInfoBar";
import ProfileImage from "../UI/ProfileImage";
import ExpandableImg from "../UI/ExpandableImg";

import { appColors } from "../../constants/colors";
import { PROFILE_SCREEN, TWEET_SCREEN } from "../../constants/screenNames";

const MainTweet = ({ tweetData }) => {
	const navigation = useNavigation();

	const { tweetId, time, fullText, media, pixelMedia, tweetAuthor, quotedStatus, isQuotedStatus } = tweetData;

	const { username, userHandle, profileImgURL, isProfileVerified } = tweetAuthor;

	let quotedBy;
	if (isQuotedStatus) {
		quotedBy = quotedStatus.tweetAuthor.username;
	}

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
		<View key={tweetId} style={styles.container}>
			<View style={styles.authorDetails}>
				<View style={styles.photoContainer}>
					<ProfileImage
						onPress={navigateTo.bind(this, PROFILE_SCREEN)}
						imageStyle={styles.photo}
						imageUri={profileImgURL}
					/>
				</View>
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
			<View style={styles.info}>
				<View style={styles.tweetTextContainer}>
					<Text style={styles.tweetText}>{fullText}</Text>
				</View>
				{media.length !== 0 && (
					<View style={styles.mediaContainer}>
						{media[0].type === "photo" && <ExpandableImg mediaData={media[0]} pixelMedia={pixelMedia} />}
					</View>
				)}
				<View style={styles.timeContainer}>
					<Text style={styles.userHandleAndTime}>{time}</Text>
				</View>
			</View>
			<View style={styles.statsContainer}>
				<Text style={styles.statCount}>
					{tweetData.actionsBarData.retweetsCount} <Text style={styles.statType}>Retweets</Text>
				</Text>
				<Text style={styles.statCount}>
					10 <Text style={styles.statType}>Quote Tweet</Text>
				</Text>
				<Text style={styles.statCount}>
					{tweetData.actionsBarData.likesCount} <Text style={styles.statType}>Likes</Text>
				</Text>
			</View>
			<View style={styles.tweetActionsContainer}>
				<TweetActionsInfoBar
					tweetId={tweetId}
					userHandle={userHandle}
					hideCount={true}
					actionsBarData={tweetData.actionsBarData}
				/>
			</View>
		</View>
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
	authorDetails: {
		flex: 1,
		flexDirection: "row",
		borderWidth: 0,
		marginVertical: 5,
		alignItems: "center",
		borderColor: "green",
	},
	photoContainer: {
		flex: 0.3,
		borderWidth: 0,
		alignItems: "center",
		borderColor: "yellow",
		flexDirection: "column",
	},
	photo: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	userDetails: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
		alignItems: "flex-start",
	},
	userName: {
		color: "white",
		fontWeight: "bold",
	},
	userHandleAndTime: {
		color: appColors.lightFontColor,
	},
	info: {
		flex: 1,
		borderColor: "yellow",
		flexDirection: "column",
		borderWidth: 0,
		marginHorizontal: 4,
	},
	tweetTextContainer: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
		paddingHorizontal: 7,
	},
	tweetText: {
		color: "white",
		paddingRight: 10,
		fontSize: 18,
	},
	timeContainer: {
		paddingHorizontal: 7,
		paddingVertical: 10,
		borderBottomWidth: 0.2,
		borderBottomColor: appColors.silverBorderColor,
	},
	statsContainer: {
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 15,
		borderBottomWidth: 0.2,
		borderBottomColor: appColors.silverBorderColor,
	},
	statCount: {
		color: "white",
		fontSize: 13,
		marginRight: 20,
	},
	statType: {
		color: appColors.lightFontColor,
		fontSize: 13,
	},
	tweetActionsContainer: {
		flex: 1,
		borderColor: "blue",
		borderWidth: 0,
		marginTop: 5,
		paddingVertical: 6,
		paddingLeft: 60,
	},
	mediaContainer: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default MainTweet;
