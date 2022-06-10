import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { appColors } from "../../constants/colors";

const ConfirmButton = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={[styles.button, props.button]}>
				<Text style={[styles.buttonText, props.text]}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: appColors.iconColor,
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

export default ConfirmButton;
