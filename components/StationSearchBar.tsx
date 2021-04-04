import React from "react";
import {View} from "react-native";
import {SearchBar} from 'react-native-elements';
import {StationsList} from './StationsList'
import {FavoriteStations} from "../screens/FavoriteStations";

export interface IStationSearchBarProps {
}

interface IStationSearchBarState {
    searchText: string;
    stationData: any;
    operationLocations: any;

}

export class StationSearchBar extends React.Component<IStationSearchBarProps, IStationSearchBarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchText: "",
            stationData: [],
            operationLocations: [],
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(searchtext: any) {
        if (searchtext != null) {
            return fetch('http://bahnql.herokuapp.com/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    query: `{
                          search(searchTerm: "` + searchtext + `") {
                            stations {
                              name
                              primaryEvaId
                            }
                            operationLocations {
                              name
                              id
                              regionId
                              abbrev
                              locationCode
                            }
                          }
                        }`
                }),
            }).then(res => res.json())
                .then(res => {
                    {
                        res.data ? this.setState({
                            stationData: [...res.data.search.stations],
                            operationLocations: [...res.data.search.operationLocations]
                        }) : this.setState({stationData: null})
                    }
                });
        }
    };

    render() {
        const {searchText, stationData, operationLocations} = this.state;
        return (
            <>
                <View>
                    <SearchBar
                        platform='android'
                        placeholder='Search Stations Here...'
                        onChangeText={(e) => this.setState({searchText: e})}
                        value={searchText}
                        onSubmitEditing={() => this.updateSearch(searchText)}
                    />
                    {searchText !== '' ?
                        <StationsList stationsList={stationData} navigation={this.props.navigation}/> : null}
                </View>
                <View>
                    <FavoriteStations navigation={this.props.navigation}/>
                </View>
            </>
        );
    }
}
