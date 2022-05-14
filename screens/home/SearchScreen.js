import { StyleSheet, Text, View, Button } from "react-native";

const SearchScreen = (props) => {
	const { navigation } = props;

	return (
		<View>
			<Text>This is SearchScreen !!</Text>
			<Button
				title="Followers"
				onPress={() => {
					navigation.navigate("Followers");
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SearchScreen;
