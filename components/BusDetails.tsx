import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from "react";
import parseStops, { Stop } from "../parse-scripts/parseStops";
import AsyncStorage from '@react-native-async-storage/async-storage';

type BusDetailsParams = {
    BusDetails: { num: string; name: string; link: string };
};

type BusDetailsRouteProp = RouteProp<BusDetailsParams, 'BusDetails'>;
type BusDetailsNavigationProp = StackNavigationProp<BusDetailsParams, 'BusDetails'>;

type Props = {
    route: BusDetailsRouteProp;
    navigation: BusDetailsNavigationProp;
};

const BusDetails: React.FC<Props> = ({ route, navigation }) => {
    const { num, name, link } = route.params;
    const [stops, setStops] = useState<Stop[]>([]);
    const [direction, setDirection] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const fetchStops = async (newDirection: string) => {
        const url = `https://route51.ru/${link}${newDirection}`;
        const response = await parseStops(url);
        if (response) {
            setStops(response);
            setDirection(newDirection);
        }
    };

    const toggleFavorite = async () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        const favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
        if (newFavoriteStatus) {
            favorites.push(num);
        } else {
            const index = favorites.indexOf(num);
            if (index > -1) {
                favorites.splice(index, 1);
            }
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    };

    useEffect(() => {
        const checkFavorite = async () => {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
            setIsFavorite(favorites.includes(num));
        };
        checkFavorite();
        fetchStops('');
    }, [link]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.directionButton} onPress={() => fetchStops(direction === '?direction=1' ? '' : '?direction=1')}>
                <Text style={styles.directionButtonText}>{direction === '?direction=1' ? 'Обратное направление' : 'Изменить направление'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <Text style={styles.favoriteButtonText}>{isFavorite ? '★' : '☆'}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Маршрут: {name}</Text>
            <FlatList
                data={stops}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.stopButton} onPress={() => navigation.navigate('StopDetails', { stop: item })}>
                        <Text style={styles.stopButtonText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    stopButton: {
        backgroundColor: "#0000FF",
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
    },
    stopButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
    },
    directionButton: {
        backgroundColor: "#FFA500",
        marginBottom: 10,
        padding: 15,
        borderRadius: 5,
    },
    directionButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
    },
    favoriteButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    favoriteButtonText: {
        fontSize: 24,
    },
});

export default BusDetails;