import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tweet = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}> {props.children} </Text>{" "}
			</View>{" "}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#1aa1f5",
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	buttonText: {
		color: "white",
		fontFamily: "sans-serif",
		fontSize: 18,
	},
});

export default Tweet;
