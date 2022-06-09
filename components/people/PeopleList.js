import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import PersonPreview from './PersonPreview'

const PeopleList = ({ data, onRefresh, isLoading }) => {
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="small" color="rgb(29, 161, 242)" />
            </View>
        );
    }

    return (
        <View style={styles.peopleList}>
            <FlatList
                onRefresh={onRefresh}
                refreshing={isLoading}
                data={data}
                keyExtractor={(item) => item.tweetId}
                renderItem={(itemData) => <PersonPreview tweetData={itemData.item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    peopleList: {
        // height: "90%",
        display: "flex",
        justifyContent: "center",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "rgb(27, 40, 54)",
    },
});

export default PeopleList;
