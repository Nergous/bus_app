import React from "react";
import "node-libs-react-native/globals";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Buses from "./components/Buses";
import BusDetails from "./components/BusDetails";
import StopDetails from "./components/StopDetails";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Buses">
                <Stack.Screen
                    name="Buses"
                    component={Buses}
                    options={{
                        headerTitle: () => (
                            <View style={styles.headerContainer}>
                                <Text style={styles.title}>Расписание автобусов Сыктывкар</Text>
                            </View>
                        ),
                    }}
                />
                <Stack.Screen
                    name="BusDetails"
                    component={BusDetails}
                    options={({route}) => ({
                        headerTitle: "Автобус №" + route.params.num,
                    })}
                />
                <Stack.Screen
                    name="StopDetails"
                    component={StopDetails}
                    options={({route}) => ({
                        headerTitle: route.params.stop.name,
                    })}
                />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});