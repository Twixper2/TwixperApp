import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, Button, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoadingScreen from "../shared/LoadingScreen";

import { appColors } from "../../constants/colors";
import { storageKeys } from "../../constants/commonKeys";
import { getValueFor } from "../../utils/storageFunctions";

import * as authActions from "../../store/actions/auth";

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

			const registeredToExperiment = await getValueFor(storageKeys.REGISTERED_EXPERIMENT);

			const isRegistered = JSON.parse(registeredToExperiment);
			if (isRegistered) {
				navigation.replace("App");
			} else {
				// TODO: Navigate To ** I Don't Know ** Screen
				navigation.replace("LoginExperiment");
			}
		} catch (err) {
			setError(err.message);
			navigation.replace("Login");
		}
	};

	if (isLoading) {
		return <LoadingScreen />;
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
						value={expCode}
						style={styles.input}
						onChangeText={onChangeExpCode}
						placeholder="experiment code"
						autoCapitalize="none"
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button title="Confirm" onPress={onInsertExpCodeHandler} disabled={expCode === ""} />
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
});

export default LoginExperimentScreen;
