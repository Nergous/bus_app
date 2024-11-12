import { BusButton } from "./BusButton";
import { FlatList, StyleSheet, View } from "react-native";
import parseAllBuses, { BusRoute } from "../parse-scripts/parseAllBuses";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Buses({ navigation }) {
    const [items, setItems] = useState<BusRoute[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);

    const fetchData = useCallback(async () => {
        const response = await parseAllBuses("https://route51.ru/komi/timetable/syktyvkar");
        if (response) {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
            setFavorites(favorites);

            // Сортировка списка автобусов: избранные вверху
            const sortedItems = response.sort((a, b) => {
                const aIsFavorite = favorites.includes(a.num);
                const bIsFavorite = favorites.includes(b.num);
                if (aIsFavorite && !bIsFavorite) return -1;
                if (!aIsFavorite && bIsFavorite) return 1;
                return 0;
            });

            setItems(sortedItems);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <BusButton num={item.num} name={item.name} link={item.link} navigation={navigation} isFavorite={favorites.includes(item.num)} />
                )}
                keyExtractor={(item) => item.link}
                numColumns={2}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    listContent: {
        justifyContent: "space-around",
    }
});