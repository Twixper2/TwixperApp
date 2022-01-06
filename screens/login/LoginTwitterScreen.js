import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Linking, Image, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

import * as authActions from "../../store/actions/auth";

const LoginTwitterScreen = (props) => {
    const authUrl = useSelector((state) => state.auth.authUrl);

    const [code, setCode] = useState();
    const [error, setError] = useState();
    const [openUrl, setOpenUrl] = useState(false);

    const dispatch = useDispatch();

    const onSignInHandler = async () => {
        try {
            await dispatch(authActions.authenticate_twitter("oob"));
            setOpenUrl(true);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (error) {
            Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
            props.navigation.navigate("LoginTwitter");
        }
    }, [error]);

    const openAuthLink = async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            console.log(`Don't know how to open this URL: ${url}`);
        }
    };

    const onChangeCode = (text) => {
        setCode(text);
    };

    const onInsertCodeHandler = async () => {
        try {
            await dispatch(authActions.authenticate_access_token(code));
            const registeredToExperiment = await AsyncStorage.getItem("registeredToExperiment");
            if (!registeredToExperiment) {
                props.navigation.navigate("LoginExperiment");
            } else {
                // TODO: Navigate To Feed Screen
                props.navigation.navigate("UserFeed");
            }
        } catch (err) {
            setError(err.message);
            props.navigation.navigate("LoginTwitter");
        }
    };

    let signIn = (
        <View style={styles.signInWrapper}>
            <View style={styles.textWrapper}>
                <Text style={styles.textH1}>
                    Help discover{" "}
                    <Text
                        style={{
                            ...styles.textH1,
                            color: "#1aa1f5",
                        }}
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
                    size={29}
                    iconStyle={{
                        backgroundColor: "white",
                        color: "#1da1f2",
                    }}
                    style={styles.twitterButton}
                >
                    Sign in with Twitter
                </FontAwesome.Button>
            </View>
            <View style={styles.footerCopyright}>
                <Text style={styles.copyrightText}>
                    Twixper will record data regarding your usage and it will be available to the researchers that own the experiment. Twixper might make
                    changes in content you would normally see in twitter. We will never post on behalf of your name or change things you write.
                </Text>
            </View>
        </View>
    );
    let insertCode = (
        <View style={styles.insertCodeWrapper}>
            <View style={{ ...styles.textWrapper, ...styles.textInsertCode }}>
                <Text style={styles.textH3}>Please insert the code from Twitter :</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} onChangeText={onChangeCode} value={code} placeholder="twitter pin code" keyboardType="numeric" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Ok" onPress={onInsertCodeHandler} />
            </View>
        </View>
    );

    if (authUrl && openUrl) {
        openAuthLink(authUrl);
        setOpenUrl(false);

        // insertCode = (
        //     <View style={styles.screenContainer}>
        //         <View style={styles.screenWrapper}>
        //             <View style={styles.insertCodeWrapper}>
        //                 <Text style={styles.textH3}>
        //                     Please insert the code you got from Twitter:
        //                 </Text>
        //             </View>
        //         </View>
        //     </View>
        // );

        // return (
        //     <View
        //         style={{
        //             flex: 1,
        //             justifyContent: "center",
        //             alignItems: "center",
        //         }}
        //     >
        //         <Text>Goog Job Dini !!!</Text>
        //     </View>
        // );
    }

    return (
        <View style={styles.screenContainer}>
            <View style={styles.screenWrapper}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require("../../assets/images/logo_no_desc.png")} />
                </View>
                {authUrl ? insertCode : signIn}
            </View>
        </View>
    );
};

LoginTwitterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "",
    };
};

const styles = StyleSheet.create({
    screenContainer: {
        height: "100%",
        backgroundColor: "rgba(207, 242, 253, 0.5)",
    },
    screenWrapper: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        // marginHorizontal: "3%",
    },
    signInWrapper: {
        height: "80%",
        marginHorizontal: "3%",
    },
    insertCodeWrapper: {
        height: "80%",
        marginHorizontal: "3%",
    },
    imageContainer: {
        marginTop: "45%",
        paddingVertical: "5%",
        paddingHorizontal: "2%",
    },
    image: {
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
    textH3: {
        fontSize: 19,
        fontWeight: "bold",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    twitterButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "9%",
    },
    footerCopyright: {
        bottom: "0%",
        paddingVertical: "25%",
        paddingHorizontal: "5%",
    },
    textInsertCode: {
        marginTop: "10%",
    },
    copyrightText: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",

        fontSize: 13,
        color: "#aaa",
        marginBottom: 0,
    },
    inputContainer: {
        width: "80%",
        marginHorizontal: "10%",
        marginTop: "10%",
        marginBottom: "2%",
    },
    input: {
        width: "100%",
        backgroundColor: "white",
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    buttonContainer: {
        width: "40%",
        marginHorizontal: "30%",
        marginTop: "3%",
        justifyContent: "center",
    },
});

export default LoginTwitterScreen;
