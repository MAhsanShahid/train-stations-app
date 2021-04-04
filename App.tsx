import 'react-native-gesture-handler';
import React from 'react';
import {AsyncStorage, StyleSheet} from 'react-native';
import {StationDetails} from "./screens/StationDetails";
import {StationSearchBar} from "./components/StationSearchBar";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FavoriteStations} from "./screens/FavoriteStations";

const Stack = createStackNavigator();
export default function App() {
    AsyncStorage.clear();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="StationSearch">
                <Stack.Screen
                    name="StationSearch"
                    component={StationSearchBar}
                    options={{title: 'Stations Search'}}
                />
                <Stack.Screen
                    name="StationDetails"
                    options={{title: 'Station Details'}}
                    component={StationDetails}
                />
                <Stack.Screen
                    name="FavoriteStations"
                    options={{title: 'Favorite Stations'}}
                    component={FavoriteStations}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
