import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { Stop } from "../parse-scripts/parseStops";

export const StopButton: React.FC<Stop & { navigation: any }> = ({ name, link, navigation }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('StopDetails', { name, link })}>
            <Text style={styles.buttonFont}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#0000FF",
        margin: 30,
        borderRadius: 130,
        minWidth: 130,
        minHeight: 130,
        justifyContent: "center",
    },
    buttonFont: {
        fontSize: 50,
        color: "#FFFFFF",
        textAlign: "center",
    }
});