import React from "react";
import { View, Text, StyleSheet } from "react-native";



const UserFeedScreen = (props) => {
    return(
        <View>
            <Text>User Feed Screen</Text>
        </View>
    );
};


UserFeedScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "",
    };
};

const styles = StyleSheet.create({});


export default UserFeedScreen;
