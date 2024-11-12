import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { BusRoute } from "../parse-scripts/parseAllBuses";
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const BusButton: React.FC<BusRoute & { navigation: any, isFavorite: boolean }> = ({ num, name, link, navigation, isFavorite }) => {
    return (
        <TouchableOpacity style={[styles.buttonStyle, isFavorite && styles.favoriteButtonStyle]} onPress={() => navigation.navigate('BusDetails', { num, name, link })}>
            <Text style={styles.buttonFont}>{num}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#0000FF",
        margin: "auto",
        marginVertical: "3%",
        borderRadius: 30,
        minWidth: 110,
        maxWidth: 130,
        height: 100,
        justifyContent: "center",
    },
    favoriteButtonStyle: {
        backgroundColor: "#FF0000",
    },
    buttonFont: {
        fontSize: 40,
        color: "#FFFFFF",
        textAlign: "center",
    }
});