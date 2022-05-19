import { View, TextInput, StyleSheet } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { appColors } from "../../constants/colors";

const SearchInput = ({ onChangeText, text, onSubmitEditing, onClear }) => {
	return (
		<View style={styles.inputTextContainer}>
			<Ionicons name="search-outline" size={22} style={styles.icon} />
			<TextInput
				value={text}
				style={styles.input}
				autoCorrect
				autoCapitalize="none"
				keyboardType="default"
				returnKeyType="search"
				clearButtonMode="always"
				placeholder="Search Twitter"
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				selectionColor={appColors.screenBackgroundColor}
			/>
			<MaterialIcons name="clear" size={22} style={styles.icon} onPress={onClear} />
		</View>
	);
};

const styles = StyleSheet.create({
	inputTextContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: appColors.lightFontColor,
		borderRadius: 10,
		paddingHorizontal: 12,
	},
	input: {
		width: "60%",
		height: 40,
		padding: 5,
		marginHorizontal: 6,
		borderColor: appColors.lightFontColor,
		backgroundColor: appColors.lightFontColor,
	},
	icon: {
		fontWeight: "bold",
		color: appColors.screenBackgroundColor,
	},
});

export default SearchInput;
