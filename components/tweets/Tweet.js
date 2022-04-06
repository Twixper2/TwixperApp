import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Tweet = (props) => {
	const { tweetData } = props;

	return (
		<View style={styles.screenContainer}>
			<View style={styles.postBorder}>
				<View style={styles.userAvatarContainer}>
					<View style={styles.userAvatar}>
						<Image source={{ uri: tweetData.author.profileImgUrl }} style={styles.userImage} />
					</View>
				</View>
				<View style={styles.postContent}>
					<View style={styles.postUserInfo}>
						<Text style={styles.textH4}>
							{tweetData.author.userFullName} { tweetData.author.isVerified && <AntDesign name="checkcircle" size={18} style={styles.checkCircle} />}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	postBorder: {
		display: "flex",
		flexDirection: "row",
		paddingVertical: 16,
		paddingRight: 0,
		paddingLeft: 16,
		borderBottomColor: "#eee",
		borderBottomWidth: 2,
	},
	userAvatarContainer: {
		width: "100%",
		height: "100%",
		flex: 2,
	},
	userAvatar: {
		width: 60,
		height: 60,
	},
	userImage: {
		width: 60,
		height: 60,
		resizeMode: "contain",
		borderRadius: 50,
	},
	postContent: {
		flex: 8,
		width: "100%",
	},
	postUserInfo: {
		// display: "flex",
		// justifyContent: "center",
		// alignItems: "center",
		marginVertical: 8,
		marginHorizontal: 0,
		maxWidth: "95%",
	},
	textH4: {
		maxWidth: "74%",
		fontSize: 18,
		fontWeight: "bold",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		marginRight: 8,
	},
	checkCircle: {
		marginRight: 8,
		color: "#1aa1f5",
	},
});

export default Tweet;
