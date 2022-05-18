import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

//  TODO: Hackathon- onPress: shareButton, comments and there amount?
const TweetActionsInfoBar = (props) => {
	const { favorited, favorite_count, retweet_count } = props.tweetData.myTweetPreview;

	// TODO: Prev version didn't had comments number
	const [retweeted, setRetweeted] = useState(props.tweetData.myTweetPreview.retweeted);
	const [retweets, setRetweets] = useState(retweet_count);
	const [liked, setLiked] = useState(favorited);
	const [likes, setLikes] = useState(favorite_count);

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
				<EvilIcons name={"comment"} style={styles.commentButtonIcon} size={25} color={"rgb(136, 153, 166)"} />
				<Text style={styles.commentsCount}>20</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => retweet()} style={styles.retweetButton}>
				<EvilIcons name={"retweet"} size={25} color={retweeted ? "rgb(23, 191, 99)" : "rgb(136, 153, 166)"} />
				<Text
					style={[styles.retweetButtonIcon, { color: retweeted ? "rgb(23, 191, 99)" : "rgb(136, 153, 166)", fontWeight: retweeted ? "bold" : "300" }]}
				>
					{retweets}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => like()} style={styles.likeButton}>
				{liked ? (
					<Entypo name={"heart"} size={18} style={{ marginLeft: 4 }} color={liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)"} />
				) : (
					<EvilIcons name={"heart"} size={25} color={liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)"} />
				)}
				<Text style={[styles.likeButtonIcon, { color: liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)", fontWeight: liked ? "bold" : "300" }]}>
					{likes}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.shareButton}>
				<SimpleLineIcons name={"share"} size={16} color={"rgb(136, 153, 166)"} />
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
		color: "rgb(136, 153, 166)",
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
