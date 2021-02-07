import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Avatar } from 'react-native-elements';
import profilePic from '../assets/profile.jpg';
import auth from '@react-native-firebase/auth';
import { DrawerHeaderMain } from './drawerheader';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import { AuthContext } from '../config/authprovider';


const Home = (props) => {

    const [wait, setWait] = useState(true);
    const [profileData, setProfileData] = useState(null)
    const [city, setCity] = useState('');
    const [bloodgroup, setBloodgroup] = useState('A+');


    const notFill = () => {
        Alert.alert(
            "Some Thing Missing",
            "Please Fill All Fields!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    const search = () => {
        if (city === '' || bloodgroup === '') {
            notFill()
        } else {
            props.navigation.navigate('Search', {
                city,
                bloodgroup,
            })
        }
    }

    const dataRequest = (data) => {
        setProfileData(data.docs)
        setWait(false)
    }


    useEffect(() => {
        const db = firestore().collection('userInfo').onSnapshot(dataRequest)
        return db;
    }, [])



    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : <>
                <DrawerHeaderMain navigation={props.navigation} />

                <View style={{ flex: 12 }}>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <TextInput placeholder="City" style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, width: '50%' }} onChangeText={(text) => setCity(text)} />
                        <View style={{ width: '30%' }}>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={true}
                                value={bloodgroup}
                                onValueChange={(value) => setBloodgroup(value)}
                                items={[
                                    { label: 'A+', value: 'A+' },
                                    { label: 'A-', value: 'A-' },
                                    { label: 'B+', value: 'B+' },
                                    { label: 'B-', value: 'B-' },
                                    { label: 'O+', value: 'O+' },
                                    { label: 'O-', value: 'O-' },
                                    { label: 'AB+', value: 'AB+' },
                                    { label: 'AB-', value: 'AB-' },
                                ]}
                            />
                        </View>
                        <TouchableOpacity onPress={search} style={{ marginLeft: 5, backgroundColor: 'skyblue', borderRadius: 5, width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 14 }}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>Donors:</Text>
                        <ScrollView>

                            {profileData.map((data, key) => {

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

                </View>

            </>}

        </>

    );

}




export default Home;