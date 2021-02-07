import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
import profilePic from '../assets/profile.jpg';
import { AuthContext } from '../config/authprovider';
import { DrawerHeaderOther } from './drawerheader';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';



const Profile = (props) => {

    const { logout, isError, setError, logoutloading, user } = useContext(AuthContext);
    const [wait, setWait] = useState(true);
    const [profileData, setProfileData] = useState(null)

    const checkData = (msg) => {
        Alert.alert(
            "Error",
            msg,
            [
                { text: "OK", onPress: () => setError(false) }
            ],
            { cancelable: false }
        );
    }

    if (isError !== false) {
        checkDatar(isError)
    }

    const signout = () => {
        logout()
    }

    const imagePicker = () => {
        launchImageLibrary({}, (res) => {
            if (res.didCancel) {
                console.log("Error")
            } else {

                const imageUpload = storage().ref("profilePics/" + res.fileName).putFile(res.uri)
                imageUpload.on('state_changed', (snapshot) => {
                    console.log(snapshot)
                }, (error) => {
                    console.log(error)
                }, () => {
                    imageUpload.snapshot.ref.getDownloadURL().then(async (downloadUrl) => {
                        console.log(downloadUrl)
                        await auth().currentUser.updateProfile({
                            photoURL: downloadUrl
                        })
                        await firestore().collection('userInfo').doc(auth().currentUser.uid).update({
                            photourl: downloadUrl
                        })
                    })
                })

            }
        })
    }

    const dataRequest = (doc) => {
        setProfileData(doc.data())
        setWait(false)
    }

    useEffect(() => {
        const db = firestore().collection('userInfo').doc(auth().currentUser.uid).onSnapshot(dataRequest)
        return db;
    }, [])



    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : <><DrawerHeaderOther navigation={props.navigation} />
                <View style={styles.container}>
                    <View style={styles.top}>
                    </View>
                    <View style={styles.body}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '30%', marginTop: -70, marginLeft: 0 }}>
                                {profileData.photourl === 'N/A' ? <Avatar
                                    rounded
                                    size="large"
                                    source={profilePic}
                                    onPress={imagePicker}
                                /> : <Avatar
                                        rounded
                                        source={{ uri: profileData.photourl }}
                                        size="large"
                                        onPress={imagePicker}
                                    />}
                            </View>
                            <View style={{ width: '50%', position: 'relative', zIndex: -1 }}>
                                <View style={{ marginLeft: -30, marginTop: -56, backgroundColor: 'white', padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10, }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{profileData.displayname}</Text>
                                </View>
                            </View>
                        </View>
                        <ScrollView>
                            <View style={styles.detailcards}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Medical Information: </Text>
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <View style={{ width: '50%' }}>
                                        <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Blood Group:</Text> {profileData.bloodgroup}</Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Diseas:</Text> {profileData.diseas}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Smoke:</Text> {profileData.smoker}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailcards}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Personal Information: </Text>
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <View style={{ width: '50%' }}>
                                        <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Age:</Text> {profileData.age}</Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Weight:</Text> {profileData.weight}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '100%' }}>
                                        <Text><Text style={{ fontSize: 14, fontWeight: 'bold' }}>Gender:</Text> {profileData.gender}</Text>
                                    </View>
                                </View>
                                <Divider style={{ marginVertical: 10 }} />
                                <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Phone No:</Text>
                                <Text>{profileData.phoneno}</Text>
                                <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>Email:</Text>
                                <Text>{profileData.email}</Text>
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <View style={{ width: '60%' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Adress:</Text>
                                        <Text>{profileData.adress}</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>City:</Text>
                                        <Text>{profileData.city}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailcards}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%', paddingHorizontal: 10 }}>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('Update Information')} style={{ backgroundColor: '#C43B1E', padding: 5, borderRadius: 5 }}>
                                            <Text style={{ color: 'white', textAlign: 'center' }}>Edit</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '50%', paddingHorizontal: 10 }}>
                                        <TouchableOpacity onPress={signout} style={{ backgroundColor: 'skyblue', padding: 5, borderRadius: 5 }}>
                                            {logoutloading === true ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                </View></>}
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 12,
    },
    top: {
        flex: 1,
    },
    body: {
        flex: 6,
        backgroundColor: '#C43B1E',
        padding: 30,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    detailcards: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
})


export default Profile;