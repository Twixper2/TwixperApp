import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PeopleList from "../people/PeopleList";

import * as tweetsActions from "../../store/actions/tweets";

import { appColors } from "../../constants/colors";

const PeopleSearchResults = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const { peopleResults: searchResults, query } = useSelector((state) => state.tweets.search);
	const dispatch = useDispatch();

	const loadSearchPeopleResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(tweetsActions.get_search_people(query));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadSearchPeopleResults().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadSearchPeopleResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadSearchPeopleResults} />
			</View>
		);
	}

	if (!isLoading && searchResults.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No Search People Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PeopleList onRefresh={loadSearchPeopleResults} isLoading={isLoading} data={searchResults} />
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
