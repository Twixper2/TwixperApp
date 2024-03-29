import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Button, Alert, StyleSheet, Platform } from "react-native";
import { useDispatch } from "react-redux";

import LoadingScreen from "../shared/LoadingScreen";
import { getValueFor } from "../../utils/storageFunctions";

import { appColors } from "../../constants/colors";
import { storageKeys } from "../../constants/commonKeys";

import * as authActions from "../../store/actions/auth";

const LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [error, setError] = useState();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSignInHandler = async () => {
		try {
			setIsLoading(true);
			await dispatch(authActions.user_login(username, password));

			const registeredToExperiment = await getValueFor(storageKeys.REGISTERED_EXPERIMENT);

			const isRegistered = JSON.parse(registeredToExperiment);
			if (!isRegistered) {
				navigation.replace("LoginExperiment");
			} else {
				navigation.replace("App");
			}
		} catch (err) {
			setError(err.message);
			navigation.replace("Login");
		}
	};

	useEffect(() => {
		if (error) {
			Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
			navigation.navigate("Login");
		}
	}, [error]);

	const onChangeUsername = (text) => {
		setUsername(text);
	};

	const onChangePassword = (text) => {
		setPassword(text);
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<View style={styles.screenContainer}>
			<View style={styles.screenWrapper}>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={require("../../assets/images/logo_no_desc.png")} />
				</View>
				<View style={styles.insertCredentialsWrapper}>
					<View style={{ ...styles.textWrapper, ...styles.textInsertCode }}>
						<Text style={styles.textH3}>Please enter your Twitter account</Text>
						<Text style={styles.textH3}>Username and Password :</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							value={username}
							style={styles.input}
							onChangeText={onChangeUsername}
							placeholder="Username"
							autoCapitalize="none"
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							value={password}
							style={styles.input}
							onChangeText={onChangePassword}
							placeholder="Password"
							autoCapitalize="none"
							secureTextEntry={true}
						/>
					</View>
					<View style={[styles.buttonContainer, Platform.OS === "ios" && styles.iosButtonAdj]}>
						<Button title="Login" onPress={onSignInHandler} disabled={password === "" || username === ""} />
					</View>
					<View style={styles.footerCopyright}>
						<Text style={styles.copyrightText}>
							Twixper will record data regarding your usage and it will be available to the researchers
							that own the experiment. Twixper might make changes in content you would normally see in
							twitter. We will never post on behalf of your name or change things you write.
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		height: "100%",
		backgroundColor: appColors.loginScreensBackground,
	},
	screenWrapper: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		// marginHorizontal: "3%",
	},
	imageContainer: {
		marginTop: "45%",
		paddingVertical: "5%",
		paddingHorizontal: "2%",
	},
	image: {
		maxWidth: "100%",
		maxHeight: "100%",
		resizeMode: "contain",
		flexDirection: "row" /* remove extra space below image */,
	},
	insertCredentialsWrapper: {
		height: "90%",
		marginHorizontal: "3%",
	},
	textInsertCode: {
		marginTop: "10%",
		marginBottom: "8%",
	},
	textWrapper: {
		overflow: "hidden",
		fontSize: 14.8,
		paddingHorizontal: "7%",
		fontFamily: "open-sans",
		justifyContent: "center",
		alignItems: "center",
	},
	textH3: {
		fontSize: 19,
		fontWeight: "bold",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	inputContainer: {
		width: "80%",
		marginHorizontal: "10%",
		marginTop: "5%",
	},
	input: {
		width: "100%",
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderBottomColor: appColors.silverBorderColor,
		borderBottomWidth: 1,
	},
	buttonContainer: {
		width: "40%",
		marginTop: "10%",
		marginHorizontal: "30%",
		justifyContent: "center",
	},
	iosButtonAdj: {
		// borderColor: "#ccc",
		// borderWidth: 0.5,
		// borderRadius: 30,
	},
	footerCopyright: {
		bottom: "0%",
		paddingVertical: "40%",
		paddingHorizontal: "5%",
	},
	copyrightText: {
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",

		fontSize: 13,
		color: appColors.mediumGreyFontColor,
		marginBottom: 0,
	},
});

export default LoginScreen;
