import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authActions from "../../store/actions/auth";
import ConfirmButton from "../../components/UI/ConfirmButton";

import LoadingScreen2 from "../shared/LoadingScreen2";

import { appColors } from "../../constants/colors";

//  TODO: Important!! Need To Refactor This !!
const LoginExperimentScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [expCode, setExpCode] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
			// TODO:  Add ReRender !!
		}
	}, [error]);

	const onChangeExpCode = (text) => {
		setExpCode(text);
	};

	const onInsertExpCodeHandler = async () => {
		try {
			setIsLoading(true);
			await dispatch(authActions.register_to_experiment(expCode));
			const registeredToExperiment = await AsyncStorage.getItem("registeredToExperiment");
			if (registeredToExperiment) {
				navigation.replace("App");
			} else {
				// TODO: Navigate To ** I Don't Know ** Screen
				navigation.replace("LoginExperiment");
			}
		} catch (err) {
			setError(err.message);
			navigation.replace("LoginTwitter");
		}
	};

	if (isLoading) {
		return <LoadingScreen2 />;
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

	return (
		<View style={styles.screenContainer}>
			<View style={styles.imageContainer}>
				<Image source={require("../../assets/images/twixperEdited.png")} style={styles.image} />
			</View>
			<View style={styles.insertCodeContainer}>
				<Text style={styles.textH4}>To start, insert the experiment code you got:</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						onChangeText={onChangeExpCode}
						value={expCode}
						placeholder="experiment code"
					/>
				</View>
				<View style={styles.buttonContainer2}>
					<Button title="Confirm" onPress={onInsertExpCodeHandler} disabled={expCode === ""} />
					{/* <ConfirmButton style={styles.button} onPress={onInsertExpCodeHandler}>
						Confirm
					</ConfirmButton> */}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		height: "100%",
		paddingVertical: "20%",
		paddingHorizontal: "10%",
		backgroundColor: appColors.loginScreensBackground,
	},
	imageContainer: {
		textAlign: "center",
	},
	image: {
		maxWidth: "100%",
		maxHeight: "100%",
		resizeMode: "contain",
		flexDirection: "row",
	},
	insertCodeContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginBottom: 32,
	},
	textH4: {
		fontSize: 21,
		fontWeight: "bold",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	},
	inputContainer: {
		width: "80%",
		marginHorizontal: "5%",
		marginTop: "10%",
		marginBottom: "2%",
	},
	input: {
		fontSize: 16,
		width: "100%",
		backgroundColor: "white",
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: appColors.silverBorderColor,
		borderBottomWidth: 1,
	},
	buttonContainer: {
		width: "40%",
		marginHorizontal: "30%",
		marginTop: "3%",
		justifyContent: "center",
	},
	buttonContainer2: {
		width: "40%",
		marginTop: "10%",
		marginHorizontal: "30%",
		justifyContent: "center",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		backgroundColor: appColors.loginScreensBackground,
	},
});

export default LoginExperimentScreen;
