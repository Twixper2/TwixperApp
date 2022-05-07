import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState();

	const dispatch = useDispatch();

	const onSignInHandler = async () => {
		try {
			console.log(username);
			console.log(password);
			// await dispatch(authActions.user_login(username, password));

			// await dispatch(authActions.authenticate_twitter("oob"));
			// setOpenUrl(true);
		} catch (err) {
			setError(err.message);
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
						<TextInput value={username} style={styles.input} onChangeText={onChangeUsername} placeholder="Username" autoCapitalize="none" />
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
					<View style={styles.buttonContainer}>
						<Button title="Login" onPress={onSignInHandler} disabled={password === "" || username === ""} />
					</View>
					<View style={styles.footerCopyright}>
						<Text style={styles.copyrightText}>
							Twixper will record data regarding your usage and it will be available to the researchers that own the experiment. Twixper might
							make changes in content you would normally see in twitter. We will never post on behalf of your name or change things you write.
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
		backgroundColor: "rgba(207, 242, 253, 0.5)",
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
		fontFamily: "sans-serif",
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
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},
	buttonContainer: {
		width: "40%",
		marginTop: "10%",
		marginHorizontal: "30%",
		justifyContent: "center",
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
		color: "#aaa",
		marginBottom: 0,
	},
});

export default LoginScreen;
