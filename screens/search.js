import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import profilePic from '../assets/profile.jpg';
import { DrawerHeaderOther } from './drawerheader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../config/authprovider';


const Search = (props) => {

    const [wait, setWait] = useState(true);
    const bloodgroup = props.route.params.bloodgroup
    const city = props.route.params.city
    const [profileData, setProfileData] = useState([])

    const { user } = useContext(AuthContext);


    const searchResult = (data) => {
        setProfileData(data.docs)
        setWait(false)
    }

    useEffect(() => {

        if (bloodgroup === 'O+' || bloodgroup === 'O-') {
            const db = firestore().collection('userInfo')
                .where('bloodgroup', 'in', ['O+', 'O-'])
                .where('city', '==', city)
                .onSnapshot(searchResult)
            return db
        } else if (bloodgroup === 'A+' || bloodgroup === 'A-') {
            const db = firestore().collection('userInfo')
                .where('bloodgroup', 'in', ['A+', 'A-', 'O+', 'O-'])
                .where('city', '==', city)
                .onSnapshot(searchResult)
            return db
        } else if (bloodgroup === 'B+' || bloodgroup === 'B-') {
            const db = firestore().collection('userInfo')
                .where('bloodgroup', 'in', ['B+', 'B-', 'O+', 'O-'])
                .where('city', '==', city)
                .onSnapshot(searchResult)
            return db
        } else if (bloodgroup === 'AB+' || bloodgroup === 'AB-') {
            const db = firestore().collection('userInfo')
                .where('city', '==', city)
                .onSnapshot(searchResult)
            return db
        }

    }, [props.route.params.bloodgroup, props.route.params.city])



    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : <>
                <DrawerHeaderOther navigation={props.navigation} />

                <View style={{ flex: 12, padding: 20 }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 15 }}>Search Results:</Text>
                    <ScrollView>
                        {profileData.length === 0 ? <Text style={{ alignSelf: 'center' }}>No Result Found</Text> : profileData.map((data, key) => {
                            if (data.data().uid === auth().currentUser.uid || data.data().bloodgroup === 'N/A') {
                                return false
                            } else {
                                return <TouchableOpacity key={key} onPress={() => props.navigation.navigate('Donor Profile', { userid: data.data().uid })}>
                                    <View style={{ borderRadius: 5, backgroundColor: 'white', padding: 5, marginBottom: 20 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {data.data().photourl === 'N/A' ? <Avatar
                                                rounded
                                                size="large"
                                                source={profilePic}
                                            /> : <Avatar
                                                    rounded
                                                    source={{ uri: data.data().photourl }}
                                                    size="large"
                                                />}
                                            <View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{data.data().displayname}</Text>
                                                <View style={{ flexDirection: 'row', padding: 5 }}>
                                                    <Text style={{ marginRight: 20, fontSize: 14 }}><Text style={{ fontSize: 16, fontWeight: 'bold' }}>Age: </Text> {data.data().age}</Text>
                                                    <Text style={{ fontSize: 14 }}><Text style={{ fontSize: 16, fontWeight: 'bold' }}>Blood Group: </Text> {data.data().bloodgroup}</Text>
                                                </View>
                                                <Text style={{ fontSize: 14 }}><Text style={{ fontSize: 16, fontWeight: 'bold' }}>City: </Text> {data.data().city}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        })}
                    </ScrollView>
                </View>

            </>}
        </>
    );

}


export default Search;