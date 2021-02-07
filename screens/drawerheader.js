import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

const DrawerHeaderMain = (props) => {
    return (
        <>
            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: '#C43B1E' }}>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()} style={{ width: 30, marginLeft: 10, marginTop: 15 }}>
                    <View style={{ borderColor: 'white', borderWidth: 2, marginTop: 4 }}></View>
                    <View style={{ borderColor: 'white', borderWidth: 2, marginTop: 4 }}></View>
                    <View style={{ borderColor: 'white', borderWidth: 2, marginTop: 4 }}></View>
                </TouchableOpacity >
                <Text style={{
                    color: 'white',
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    fontSize: 26,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>Blood Bank</Text>
            </View>
        </>
    )
}


const DrawerHeaderOther = (props) => {
    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#C43B1E' }}>
                <TouchableOpacity onPress={props.navigation.goBack} >
                    <Text style={{ marginLeft: 20, fontSize: 40, color: 'white', fontWeight: 'bold' }}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={{
                        color: 'white',
                        marginTop: 10,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        fontSize: 26,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>Blood Bank</Text>
            </View>
        </>
    )
}

export { DrawerHeaderMain, DrawerHeaderOther };