import React from "react";
import {ScrollView, TouchableHighlight} from "react-native";
import {ListItem} from 'react-native-elements';


export interface IStationListProps {
    stationsList?: any;
    navigation: any;
}

interface IStationListState {
    stationsList: any;
}

export class StationsList extends React.Component<IStationListProps, IStationListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            stationsList: props,
        };
        this.stationDetails = this.stationDetails.bind(this);
    }

    stationDetails(ind: any, evaId: any) {
        this.props.navigation.navigate('StationDetails', {
            primaryEvaId: evaId
        });
    }

    render() {
        const {stationsList} = this.props;
        return (
            <ScrollView>
                {stationsList ? (stationsList.map((s: any, i: any) => (
                    <TouchableHighlight key={i} onPress={() => this.stationDetails(i, s.primaryEvaId)}>
                        <ListItem key={i}>
                            <ListItem.Content>
                                <ListItem.Title>{s.name}</ListItem.Title>
                                <ListItem.Subtitle>{s.primaryEvaId}</ListItem.Subtitle>
                            </ListItem.Content>

                        </ListItem>
                    </TouchableHighlight>
                ))) : null}
            </ScrollView>
        );
    }
}

