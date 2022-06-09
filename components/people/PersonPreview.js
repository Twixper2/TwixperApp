import { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ProfileImage from "../UI/ProfileImage";

import { appColors } from "../../constants/colors";
import { PROFILE_SCREEN, TWEET_SCREEN } from "../../constants/screenNames";

import { getPersonData } from "../../utils/storageFunctions";

const PersonPreview = (props) => {
	const navigation = useNavigation();
	const [touched, setTouched] = useState(false);

	// const { personData } = props;
	const personData = getPersonData()[0]
	const { username, userHandle, profileImgURL, userDescription, FollowingStatus } = personData;

	console.log(personData)
	console.log(username, userHandle, profileImgURL, userDescription, FollowingStatus)


	return (
		<View style={styles.container}>
			<Text style={styles.tempText}>This is :{"\n"}PersonPreview !!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: appColors.screenBackgroundColor,
	},
	tempText: {
		fontSize: 32,
		color: appColors.iconColor,
		textAlign: "center",
	},
});

export default PersonPreview;
