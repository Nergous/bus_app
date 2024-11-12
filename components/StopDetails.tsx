import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import parseTime, { StopTime } from "../parse-scripts/parseTimes";
import { Stop } from "../parse-scripts/parseStops";

type StopDetailsParams = {
    StopDetails: { stop: Stop };
};

type StopDetailsRouteProp = RouteProp<StopDetailsParams, 'StopDetails'>;
type StopDetailsNavigationProp = StackNavigationProp<StopDetailsParams, 'StopDetails'>;

type Props = {
    route: StopDetailsRouteProp;
    navigation: StopDetailsNavigationProp;
};

const StopDetails: React.FC<Props> = ({ route }) => {
    const { stop } = route.params;
    const [stopTimes, setStopTimes] = useState<StopTime[]>([]);

    useEffect(() => {
        const fetchTime = async () => {
            const response = await parseTime("https://route51.ru/" + stop.link);
            if (response) {
                setStopTimes(response);
            }
        };

        fetchTime();
    }, [stop.link]);

    const renderItem = ({ item }: { item: StopTime }) => (
        <View style={styles.row}>
            <Text style={[styles.cell, styles.smallCell]}>{item.hour}</Text>
            <Text style={[styles.cell, styles.largeCell]}>{item.minutes.replace(/\s+/g, " ").trim()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={stopTimes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={[styles.headerCell, styles.smallCell]}>Часы</Text>
                        <Text style={[styles.headerCell, styles.largeCell]}>Минуты</Text>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Нет расписания</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 26,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    cell: {
        textAlign: 'left',
        fontSize: 26,
    },
    smallCell: {
        flex: 1,
    },
    largeCell: {
        flex: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 26,
        color: '#888',
    },
});

export default StopDetails;