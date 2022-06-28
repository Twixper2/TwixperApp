import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Image, TextInput, Alert, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { localStorageKeys } from "../../constants/commonKeys";

import CreateTweetHeader from "../../components/UI/CreateTweetHeader";

import * as tweetsActions from "../../utils/actions/tweets";

const CreateTweetScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [error, setError] = useState();
	const [tweetText, setTweetText] = useState("");
	const [profileImgURL, setProfileImgURL] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const getUserData = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			let userEntity = await getObjectValue(localStorageKeys.USER_TWITTER_ENTITY);
			setProfileImgURL(userEntity.profileImgURL);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		getUserData().then(() => {
			setIsLoading(false);
		});
	}, [getUserData]);

	useEffect(() => {
		if (error) {
			Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
			navigation.navigate("Home");
		}
	}, [error]);

	const onTextChange = (text) => {
		setTweetText(text);
	};

	const onPostTweet = async () => {
		if (tweetText !== "") {
			try {
				await tweetsActions.post_tweet(tweetText);
				navigation.goBack();
			} catch (err) {
				setError(err.message);
				navigation.navigate("Home");
			}
		}
	};

	if (isLoading || !profileImgURL) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<View style={styles.headerContainer}>
				<CreateTweetHeader navigation={navigation} disabled={tweetText === ""} onPressTweet={onPostTweet} />
			</View>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						onPress={() => navigation.navigate("DrawerToggle")}
						source={{ uri: profileImgURL }}
						style={styles.image}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						value={tweetText}
						multiline={true}
						numberOfLines={0}
						style={styles.textInput}
						placeholder="What's happening?"
						underlineColorAndroid="transparent"
						placeholderTextColor={appColors.lightFontColor}
						onChangeText={onTextChange}
					/>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<FontAwesome
					name={"photo"}
					color={appColors.iconColor}
					size={26}
					onPress={() => {
						console.log("ToDo!");
					}}
				/>
				<MaterialIcons
					name="gif"
					color={appColors.iconColor}
					size={20}
					style={styles.gifIcon}
					onPress={() => {
						console.log("ToDo!");
					}}
				/>
				<FontAwesome5
					name={"poll-h"}
					color={appColors.iconColor}
					size={26}
					onPress={() => {
						console.log("ToDo!");
					}}
				/>
				<SimpleLineIcons
					name={"location-pin"}
					color={appColors.iconColor}
					size={26}
					onPress={() => {
						console.log("ToDo!");
					}}
				/>
				<Feather
					name={"circle"}
					color="gray"
					size={26}
					onPress={() => {
						console.log("ToDo!");
					}}
				/>
				<MaterialCommunityIcons
					name="plus-circle"
					color={appColors.iconColor}
					style={styles.plusIcon}
					size={26}
					onPress={() => {
						console.log("ToDo!");
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: appColors.backgroundColor,
	},
	headerContainer: {
		paddingTop: 15,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: appColors.screenBackgroundColor,
		borderColor: "red",
		borderWidth: 0,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	imageContainer: {
		flex: 0.2,
		borderColor: "red",
		borderWidth: 0,
		height: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	inputContainer: {
		flex: 0.8,
		borderColor: "red",
		borderWidth: 0,
		padding: 0,
		marginTop: 20,
	},
	textInput: {
		height: "auto",
		width: "100%",
		marginTop: 15,
		color: "white",
		borderColor: "red",
		borderWidth: 0,
	},
	bottomContainer: {
		padding: 10,
		width: "100%",
		alignSelf: "baseline",
		elevation: 8,
		backgroundColor: appColors.backgroundColor,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	gifIcon: {
		borderWidth: 1.5,
		borderColor: appColors.iconColor,
		padding: 2,
		borderRadius: 3,
	},
	plusIcon: {
		borderLeftColor: "black",
		borderLeftWidth: 0.8,
		paddingLeft: 15,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		backgroundColor: appColors.screenBackgroundColor,
	},
});

export default CreateTweetScreen;
