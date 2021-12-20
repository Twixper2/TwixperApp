import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//  TODO: Look on rn-shop-app :
//          - enableScreens ?
//          - rootReducer !
//          - store = createStore ??


import CopyWelcomeScreen from "./screens/CopyWelcomeScreen";

export default function App() {
    return (
        <CopyWelcomeScreen />
        
        // <View style={styles.container}>
        //     <Text>Open up App.js to start working on your app!</Text>
        //     <StatusBar style="auto" />
        // </View>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: "#fff",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
});
