import React, {Component} from 'react';
import {AsyncStorage, Image, StyleSheet, Text, View} from 'react-native';
import {Card} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


export interface IStationDetailsProps {
    primaryEvaId?: any
    navigation?: any
}

interface IStationDetailsState {
    stationWithEvaId: any,
    primaryEvaId: any,
    favorites: any,
    updateFavIcon: any,
    updateFavButText: any,
    updateFavButCol: any,
}

export class StationDetails extends Component<IStationDetailsProps, IStationDetailsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            stationWithEvaId: {},
            primaryEvaId: null,
            favorites: [],
            updateFavIcon: '',
            updateFavButText: '',
            updateFavButCol: '',
        };
        this.storeData = this.storeData.bind(this);
        this.viewFavorites = this.viewFavorites.bind(this);
        this.apiCall = this.apiCall.bind(this);
    }

    apiCall() {
    }

    componentDidMount() {
        const {primaryEvaId} = this.props.route.params;
        fetch('http://bahnql.herokuapp.com/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                query: `{
                            stationWithEvaId(evaId: ` + primaryEvaId + `) {
                                name
                                location {
                                  latitude
                                  longitude
                                }
                                picture {
                                  url
                                }
                              }
                        }`
            }),
        }).then(res => res.json())
            .then(res => {
                    this.setState({stationWithEvaId: res.data.stationWithEvaId, primaryEvaId: primaryEvaId})
                }
            );
    }

    componentDidUpdate(prevProps: Readonly<IStationDetailsProps>, prevState: Readonly<IStationDetailsState>, snapshot?: any): void {
        if (this.state.primaryEvaId !== this.props.route.params.primaryEvaId) {
            fetch('http://bahnql.herokuapp.com/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query: `{
                            stationWithEvaId(evaId: ` + this.props.route.params.primaryEvaId + `) {
                                name
                                location {
                                  latitude
                                  longitude
                                }
                                picture {
                                  url
                                }
                              }
                        }`
                }),
            }).then(res => res.json())
                .then(res => {
                        this.setState({
                            stationWithEvaId: res.data.stationWithEvaId,
                            primaryEvaId: this.props.route.params.primaryEvaId
                        })
                    }
                );

        }
    }

    storeData(stationWithEvaId: any, primaryEvaId: any) {
        try {
            AsyncStorage.setItem(
                stationWithEvaId.name,
                JSON.stringify(primaryEvaId),
            );
        } catch (error) {
            console.log('Error Saving Data')
        }
    };

    removeDateFromFavorites(name: any) {
        AsyncStorage.removeItem(name).then(() => {
            this.setState({
                updateFavIcon: 'star-o',
                updateFavButCol: '#3b5998',
                updateFavButText: 'Add to Favorites!',
            });
        });
    }

    addToFavorites(stationWithEvaId: any, primaryEvaId: any) {
        AsyncStorage.getItem(stationWithEvaId.name).then((data) => {
            if (data) {
                this.removeDateFromFavorites(stationWithEvaId.name);
            } else {
                this.setState({
                    updateFavIcon: 'star',
                    updateFavButCol: '#32CD32',
                    updateFavButText: 'Favorited! :)',
                });
                this.storeData(stationWithEvaId, primaryEvaId);
            }
        });
    }

    viewFavorites(primaryEvaId: any) {
        this.props.navigation.navigate('FavoriteStations', {
            primaryEvaId: primaryEvaId
        });
    }

    render() {
        this.apiCall();
        const {stationWithEvaId} = this.state;
        const {primaryEvaId} = this.props.route.params;
        return stationWithEvaId?.name ?
            <Card key={primaryEvaId}>
                <Card.Title style={styles.cardTitle}>{stationWithEvaId.name}</Card.Title>
                <View>
                    <Icon.Button
                        name={this.state.updateFavIcon ? this.state.updateFavIcon : 'star-o'}
                        backgroundColor={this.state.updateFavButCol ? this.state.updateFavButCol : '#3b5998'}
                        style={styles.cardFavouriteIcon}
                        onPress={() => this.addToFavorites(stationWithEvaId, primaryEvaId)}
                    >
                        {this.state.updateFavButText ? this.state.updateFavButText : 'Add to Favorites!'}
                    </Icon.Button>
                    <Card.Divider/>
                    <Icon.Button
                        name={'eye'}
                        backgroundColor={'#3b5998'}
                        style={styles.cardFavouriteIcon}
                        onPress={() => this.viewFavorites(primaryEvaId)}
                    >
                        View Favorites!
                    </Icon.Button>
                </View>
                <Card.Divider/>
                <View>
                    <Image
                        style={styles.cardMainImage}
                        source={{uri: stationWithEvaId.picture.url}}
                    />
                    <Text>{'Latitude: ' + stationWithEvaId.location.latitude + '\nLongitude: ' + stationWithEvaId.location.latitude}</Text>
                </View>
            </Card>
            : null
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
        alignContent: 'center',
        justifyContent: 'center'
    },
});



