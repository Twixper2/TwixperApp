import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { appColors } from "../../constants/colors";

const TweetActionsInfoBar = (props) => {
	const { tweetId, userHandle, actionsBarData, hideCount } = props;

	// TODO: Prev version didn't had comments number
	const [liked, setLiked] = useState(actionsBarData.liked);
	const [likes, setLikes] = useState(actionsBarData.likesCount);
	const [retweeted, setRetweeted] = useState(actionsBarData.retweeted);
	const [retweets, setRetweets] = useState(actionsBarData.retweetsCount);

	const retweet = () => {
		if (retweeted) {
			setRetweeted(false);
			setRetweets(retweets - 1);
		} else {
			setRetweeted(true);
			setRetweets(retweets + 1);
		}
	};
	const like = () => {
		if (liked) {
			setLiked(false);
			setLikes(likes - 1);
		} else {
			setLiked(true);
			setLikes(likes + 1);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.commentButton}>
				<EvilIcons
					name={"comment"}
					style={styles.commentButtonIcon}
					size={25}
					color={appColors.lightFontColor}
				/>
				{!hideCount && <Text style={styles.commentsCount}>{actionsBarData.commentsCount}</Text>}
			</TouchableOpacity>
			<TouchableOpacity onPress={() => retweet()} style={styles.retweetButton}>
				<EvilIcons
					name={"retweet"}
					size={25}
					color={retweeted ? appColors.retweetedGreen : appColors.lightFontColor}
				/>
				{!hideCount && (
					<Text
						style={[
							styles.retweetButtonIcon,
							{
								color: retweeted ? appColors.retweetedGreen : appColors.lightFontColor,
								fontWeight: retweeted ? "bold" : "300",
							},
						]}
					>
						{retweets}
					</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity onPress={() => like()} style={styles.likeButton}>
				{liked ? (
					<Entypo
						name={"heart"}
						size={18}
						style={{ marginLeft: 4 }}
						color={liked ? appColors.likedPink : appColors.lightFontColor}
					/>
				) : (
					<EvilIcons
						name={"heart"}
						size={25}
						color={liked ? appColors.likedPink : appColors.lightFontColor}
					/>
				)}
				{!hideCount && (
					<Text
						style={[
							styles.likeButtonIcon,
							{
								color: liked ? appColors.likedPink : appColors.lightFontColor,
								fontWeight: liked ? "bold" : "300",
							},
						]}
					>
						{likes}
					</Text>
				)}
			</TouchableOpacity>
			<TouchableOpacity style={styles.shareButton}>
				<SimpleLineIcons name={"share"} size={16} color={appColors.lightFontColor} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
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

export default TweetActionsInfoBar;
