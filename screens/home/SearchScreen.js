import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import SearchInput from "../../components/search/SearchInput";
import SearchTabsNavigator from "../../navigation/SearchTabsNavigator";

import * as tweetsActions from "../../store/actions/tweets";

import { appColors } from "../../constants/colors";

const SearchScreen = () => {
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState(false);

	console.log("Hey Search Screen");

	const dispatch = useDispatch();

	const onClear = () => {
		setSearchText("");
		setSearchResults(false);
	};

	const onSearchHandler = async () => {
		try {
			await dispatch(tweetsActions.get_search_tweets(searchText));
			setSearchResults(true);
		} catch (err) {
			console.log("Err - Need to handle this\n" + err);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<SearchInput onChangeText={setSearchText} text={searchText} onSubmitEditing={onSearchHandler} onClear={onClear} />
			</View>
			<View style={styles.resultsContainer}>
				{searchResults ? <SearchTabsNavigator /> : <Text style={styles.noResults}>Try searching for people, topics or keywords</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		alignItems: "center",
		backgroundColor: appColors.screenBackgroundColor,
	},
	searchContainer: {
		display: "flex",
		alignItems: "center",
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
	resultsContainer: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		paddingTop: 15,
		paddingHorizontal: 5,
		backgroundColor: appColors.screenBackgroundColor,
	},
	noResults: {
		fontSize: 15,
		color: appColors.lightFontColor,
	},
});

export default SearchScreen;
