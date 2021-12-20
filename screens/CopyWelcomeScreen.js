import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

const CopyWelcomeScreen = (props) => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.screenWrapper}>
                <View style={styles.signWrapper}>
                    <Image
                        style={styles.image}
                        source={require("../assets/images/logo_no_desc.png")}
                    />
                    <View style={styles.textWrapper} >
                        <Text style={styles.textH1}>Help discover</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // *{
    //     box-sizing: border-box;
    // }
    screenContainer: {
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(207, 242, 253, 0.5)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    screenWrapper: {
        height: Dimensions.get("window").height * 0.7,
        display: "flex",
        justifyContent: "center",
        marginVertical: "3%",
    },
    signWrapper: {
        textAlign: "center",
        justifyContent: "center",
        // margin: 10% 5%;
        fontSize: 14.8,
    },
    image: {
        marginTop: "10%",
        paddingBottom: "2%",
        maxWidth: "100%",
        maxHeight: "100%",
        flexDirection: "row" /* remove extra space below image */,
    },
    textWrapper: {
        overflow: "hidden",
        fontSize: 14.8,
        paddingHorizontal: '7%',
        // fontFamily: ''
    },
    textH1: {
        fontSize: 32
    }
});

export default CopyWelcomeScreen;
