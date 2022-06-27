import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import PeopleList from "../people/PeopleList";

import * as searchActions from "../../utils/actions/search";

import { appColors } from "../../constants/colors";
import { getStringValue, getObjectValue } from "../../utils/storageFunctions";
import { collationNames, searchKeys } from "../../constants/commonKeys";

const PeopleSearchResults = () => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [peopleResults, setPeopleResults] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadSearchPeopleResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			let searchQuery = await getStringValue(collationNames.SEARCH + searchKeys.QUERY);
			await searchActions.get_search_people(searchQuery);
			let searchPeopleArr = await getObjectValue(collationNames.SEARCH + searchKeys.PEOPLE_RESULTS + searchQuery);
			setPeopleResults(searchPeopleArr.peopleResults);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadSearchPeopleResults().then(() => {
			setIsLoading(false);
		});
	}, [loadSearchPeopleResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadSearchPeopleResults} />
			</View>
		);
	}

	if (!isLoading && peopleResults.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No Search People Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PeopleList onRefresh={loadSearchPeopleResults} isLoading={isLoading} data={peopleResults} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: appColors.screenBackgroundColor,
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

export default PeopleSearchResults;
