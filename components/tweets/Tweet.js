import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tweet = (props) => {
	const { tweetData } = props;

	return (
		<View style={styles.screenContainer}>
			<View style={styles.postBorder}>
				<View style={styles.userAvatarContainer}>
					<View style={styles.userAvatar}></View>
				</View>
				<View style={styles.postContent}></View>
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
		flexDirection: "column",
		paddingVertical: 16,
		paddingRight: 0,
		paddingLeft: 16,
		borderBottomColor: "#eee",
		borderBottomWidth: 2,
	},
	userAvatarContainer: {
		width: "100%",
		height: "100%",
		flex: 12,
	},
	userAvatar: {
		width: 80,
		height: 80,
	},
	postContent: {
		flex: 86.5,
	},
});

export default Tweet;
