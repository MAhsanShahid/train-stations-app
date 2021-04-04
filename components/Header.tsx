import React from "react";
import {StyleSheet, Text, View} from "react-native";


export interface IHeaderProps {
    name?: string;
    stationData?: number;
}

interface IHeaderState {
    name: string;
    stationData: any;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {name: "", stationData: []};

    }


    render() {
        return (<View style={styles.nav}><Text style={styles.navText}>StationLovers! </Text>

        </View>);
    }

}

const styles = StyleSheet.create({
    nav: {
        height: '10%',
        backgroundColor: '#fff132',
        justifyContent: 'center',

    },
    navText: {
        margin: '5%',
        fontSize: 16

    },

});

