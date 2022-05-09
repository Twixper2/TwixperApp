import { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authActions from "../../store/actions/auth";
import ConfirmButton from "../../components/UI/ConfirmButton";

//  TODO: Important!! Need To Refactor This !!
const LoginExperimentScreen = ({ props, navigation }) => {
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
			await dispatch(authActions.register_to_experiment(expCode));
			const registeredToExperiment = await AsyncStorage.getItem("registeredToExperiment");
			if (registeredToExperiment) {
				props.navigation.navigate("UserFeed");
			} else {
				// TODO: Navigate To ** I Don't Know ** Screen
				props.navigation.navigate("LoginExperiment");
			}
		} catch (err) {
			setError(err.message);
			props.navigation.navigate("LoginTwitter");
		}
	};

	return (
		<View style={styles.screenContainer}>
			<View style={styles.imageContainer}>
				<Image source={require("../../assets/images/twixperEdited.png")} style={styles.image} />
			</View>
			<View style={styles.insertCodeContainer}>
				<Text style={styles.textH4}>To start, insert the experiment code you got:</Text>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} onChangeText={onChangeExpCode} value={expCode} placeholder="experiment code" />
				</View>
				<View style={styles.buttonContainer}>
					<ConfirmButton style={styles.button} onPress={onInsertExpCodeHandler}>
						Confirm
					</ConfirmButton>
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
		// backgroundColor: "#f0f8fd",
		backgroundColor: "rgba(207, 242, 253, 0.5)",
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
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},
	buttonContainer: {
		width: "40%",
		marginHorizontal: "30%",
		marginTop: "3%",
		justifyContent: "center",
	},
});

export default LoginExperimentScreen;
