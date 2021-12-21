import React from "react";
import {
    View,
    Text,
    Image,
    Button,
    Dimensions,
    StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CopyWelcomeScreen = (props) => {
    const onSignInHandler = () => {};

    return (
        <View style={styles.screenContainer}>
            <View style={styles.screenWrapper}>
                <View style={styles.signWrapper}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require("../assets/images/logo_no_desc.png")}
                        />
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.textH1}>
                            Help discover{" "}
                            <Text
                                style={{ ...styles.textH1, color: "#1aa1f5" }}
                            >
                                amazing{" "}
                            </Text>
                        </Text>
                        <Text style={styles.textH1}>findings. It's easy.</Text>
                    </View>
                    <View style={styles.twitterButtonContainer}>
                        <FontAwesome.Button
                            name="twitter"
                            backgroundColor="#1da1f2"
                            onPress={onSignInHandler}
                            iconStyle={{
                                backgroundColor: "white",
                                color: "#1da1f2",
                            }}
                            style={styles.twitterButton}
                        >
                            Sign in with Twitter
                        </FontAwesome.Button>
                    </View>
                    <View style={styles.footerCopyright} >
                            <Text style={styles.copyrightText}>Twixper will record data regarding your usage and it will be available to the researchers that own the experiment.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        height: "100%",
        backgroundColor: "rgba(207, 242, 253, 0.5)",
    },
    screenWrapper: {
        height: "70%",
        display: "flex",
        justifyContent: "center",
        marginHorizontal: "3%",
    },
    signWrapper: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 14.8,
    },
    image: {
        marginTop: "10%",
        paddingBottom: "2%",
        maxWidth: "100%",
        maxHeight: "100%",
        resizeMode: "contain",
        flexDirection: "row" /* remove extra space below image */,
    },
    textWrapper: {
        overflow: "hidden",
        fontSize: 14.8,
        paddingHorizontal: "7%",
        fontFamily: "sans-serif",
        justifyContent: "center",
        alignItems: "center",
    },
    textH1: {
        fontSize: 24,
        fontWeight: "bold",
    },
    twitterButtonContainer: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: "9%",
    },
    footerCopyright: {
        bottom: '0%',
        paddingVertical: '3%',
        paddingHorizontal: '8%',
    },
    copyrightText: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',

        fontSize: 13,
        color: '#aaa',
        marginBottom: 0
    }
});

export default CopyWelcomeScreen;
