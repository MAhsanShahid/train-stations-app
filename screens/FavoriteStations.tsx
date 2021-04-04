import React, {Component} from 'react';
import {AsyncStorage, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import {ListItem} from "react-native-elements";

export interface IFavoriteStationsProps {
    navigation?: any,
    favorited?: any,
    evaId?: any
}

interface IFavoriteStationsState {
    favorites: any,
    primaryEvaId: any
}

export class FavoriteStations extends Component<IFavoriteStationsProps, IFavoriteStationsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            favorites: [],
            primaryEvaId: null
        };
        this.stationDetails = this.stationDetails.bind(this);
        this.fetchAllItems = this.fetchAllItems.bind(this);

    }

    stationDetails(ind: any, evaId: number) {
        this.props.navigation.navigate('StationDetails', {
            primaryEvaId: evaId, buttonColor: '#32CD32'
        });
    }

    async fetchAllItems() {
        try {
            let keys = await AsyncStorage.getAllKeys();
            let items = await AsyncStorage.multiGet(keys);
            let favoriteStations: any = [];
            let primaryEvaId = '';
            items.map(item => {
                primaryEvaId = item[1];
                favoriteStations.push({
                    name: item[0],
                    primaryEvaId: item[1],
                });
            });
            this.setState(
                {
                    favorites: favoriteStations,
                    primaryEvaId: primaryEvaId,
                }
            );
            return favoriteStations;
        } catch (error) {
            console.log(error, "problem")
        }
    };

    componentDidMount() {
        this.fetchAllItems();
    }

    componentDidUpdate() {
        this.fetchAllItems();
    }

    render() {
        const {favorites} = this.state;
        return (
            <ScrollView>
                {favorites ? favorites.map((f: any, i: any) => {
                    return <TouchableHighlight key={i} onPress={() => this.stationDetails(i, Number(f.primaryEvaId))}>
                        <ListItem key={i}>
                            <ListItem.Content>
                                <ListItem.Title>{f.name}</ListItem.Title>
                                <ListItem.Subtitle>{f.primaryEvaId}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableHighlight>
                }) : null}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardMainImage: {
        height: 300,
    },
    cardTitle: {
        fontSize: 20,
    },
    cardFavouriteIcon: {
        height: 20,
        width: 20,
        position: "absolute",
        bottom: 15,
        right: 0,
        fontSize: 20
    },
});


