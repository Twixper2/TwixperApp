import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const Tweet2 = (props) => {
	const [touched, setTouched] = useState(false);
	const [retweeted, setRetweeted] = useState(false);
	const [retweets, setRetweets] = useState(10);
	const [liked, setLiked] = useState(true);
	const [likes, setLikes] = useState(10);

	const tweet = "Let's get it! 💙\n\nYou can follow today's game live on CITY+ with a subscription - https://t.co/BfVGtMgtQW https://t.co/YM571qZL8k";

	const { tweetData } = props;

	const { tweetId, time, author } = tweetData;
	const photo = { uri: author.profileImgUrl };
	const name = author.userFullName;

	const handle = "@Yair";

	const isReply = false;
	const retweetedBy = "Sandra";
	const navigation = props.navigation;

	const tweetPressed = (pressed = false) => {
		setTouched(pressed);
	};

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
			setLiked(false);
			setLikes(likes + 1);
		}
	};

	// this.state = {
	// 	// name: `${name.first.capitalizeFirstLetter()} ${name.last.capitalizeFirstLetter()}`,
	// 	handle: "@Yair",
	// 	retweetedBy: ["Sandra", "Hannit", "Michael", "Jason", "Queen"][Math.floor(Math.random() * ["Sandra", "Hannit", "Michael", "Jason", "Queen"].length)],
	// };

	return (
		<TouchableHighlight onPress={() => navigation.navigate("Thread")} onPressIn={() => tweetPressed(true)} onPressOut={() => tweetPressed()}>
			{/* <View key={thekey} style={styles.container}> */}
			<View key={tweetId} style={styles.container}>
				{!isReply ? (
					<View style={styles.isReplyContainer}>
						<View style={{ flex: 0.23, borderColor: "red", borderWidth: 0, alignItems: "flex-end" }}>
							<EvilIcons name={"retweet"} size={25} color={"rgb(136, 153, 166)"} />
						</View>
						<Text style={{ flex: 0.5, color: "rgb(136, 153, 166)" }}>{retweetedBy} Retweeted</Text>
					</View>
				) : (
					true
				)}
				<View style={styles.innerContainer}>
					<View style={styles.photoContainer}>
						<View style={styles.innerPhotoContainer}>
							<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
								<Image source={photo} style={styles.photo} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.info}>
						<View style={styles.userDetails}>
							<Text style={styles.userName}>
								{name}
								<Text style={styles.userHandleAndTime}>
									{handle} · {time}
								</Text>
							</Text>
						</View>
						<View style={styles.tweetTextContainer}>
							<Text style={styles.tweetText}>{tweet}</Text>
						</View>
						<View style={styles.tweetActionsContainer}>
							<TouchableOpacity style={styles.commentButton}>
								<EvilIcons name={"comment"} style={styles.commentButtonIcon} size={25} color={"rgb(136, 153, 166)"} />
								<Text style={styles.commentsCount}>20</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => retweet()} style={styles.retweetButton}>
								<EvilIcons name={"retweet"} size={25} color={retweeted ? "rgb(23, 191, 99)" : "rgb(136, 153, 166)"} />
								<Text
									style={[
										styles.retweetButtonIcon,
										{ color: retweeted ? "rgb(23, 191, 99)" : "rgb(136, 153, 166)", fontWeight: retweeted ? "bold" : "300" },
									]}
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
								<Text
									style={[
										styles.likeButtonIcon,
										{ color: liked ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)", fontWeight: liked ? "bold" : "300" },
									]}
								>
									{likes}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.shareButton}>
								<SimpleLineIcons name={"share"} size={16} color={"rgb(136, 153, 166)"} />
							</TouchableOpacity>
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
		borderColor: "yellow",
		flexDirection: "column",
		borderWidth: 0,
	},
	innerPhotoContainer: { height: 100, alignItems: "center" },
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
	userName: { color: "white", fontWeight: "bold" },
	userHandleAndTime: {
		color: "rgb(136, 153, 166)",
		marginLeft: 5,
	},
	tweetTextContainer: { flex: 1, borderColor: "blue", borderWidth: 0 },
	tweetText: { color: "white", paddingRight: 10 },
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

export default Tweet2;
