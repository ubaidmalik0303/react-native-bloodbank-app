import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import HeaderImage from '../assets/bloodbank.jpg';
import AutoTypingText from 'react-native-auto-typing-text';
import RNPickerSelect from 'react-native-picker-select';
import { Divider } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../config/authprovider';
import { DrawerHeaderOther } from './drawerheader';


const Information = (props) => {

    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [bloodgroup, setBloodgroup] = useState('A+');
    const [gender, setGender] = useState('Male');
    const [smoker, setSmoker] = useState('');
    const [diseas, setDiseas] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [wait, setWait] = useState(true)

    const { updateinformation, isError, setError, logout, logoutloading, loading, user } = useContext(AuthContext);

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
        checkData(isError)
    }

    const signout = () => {
        logout()
    }

    const update = async () => {
        if (age === '' || weight === '' || bloodgroup === '' || gender === '' || smoker === '' || diseas === '' || phoneno === '' || adress === '' || city === '') {
            notFill()
        } else {
            await updateinformation(age, weight, gender, diseas, smoker, bloodgroup, phoneno, city.toLowerCase(), adress)
            props.navigation.navigate('Home');
        }
    }

    const dataRequest = (doc) => {
        if (doc.data().bloodgroup !== 'N/A') {
            setAge(doc.data().age)
            setGender(doc.data().gender)
            setWeight(doc.data().weight)
            setBloodgroup(doc.data().bloodgroup)
            setSmoker(doc.data().smoker)
            setDiseas(doc.data().diseas)
            setPhoneno(doc.data().phoneno)
            setAdress(doc.data().adress)
            setCity(doc.data().city)
            setEmail(doc.data().email)
        }
        setWait(false)
    }

    useEffect(() => {
        const db = firestore().collection('userInfo').doc(auth().currentUser.uid).onSnapshot(dataRequest);
        return db
    }, [])



    return (
        <>
            {wait ? <ActivityIndicator style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }} size="large" color="black" /> : <><DrawerHeaderOther navigation={props.navigation} />
                <View style={styles.container}>
                    <View style={styles.card} >
                        <Text style={{ fontSize: 20, color: '#C43B1E', textAlign: 'center', marginBottom: 30, fontWeight: 'bold' }}>Update Information</Text>
                        <ScrollView>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '40%' }}>
                                    <Text>Age: </Text>
                                    <TextInput value={age} keyboardType='number-pad' placeholder="19" onChangeText={(text) => setAge(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                                <View style={{ width: '40%', marginLeft: 'auto' }}>
                                    <Text>Weight: </Text>
                                    <TextInput value={weight} keyboardType='number-pad' placeholder="60kg" onChangeText={(text) => setWeight(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <Divider style={{ marginVertical: 15 }} />
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <View style={{ width: '40%' }}>
                                    <Text>Gender: </Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={true}
                                        value={gender}
                                        onValueChange={(value) => setGender(value)}
                                        items={[
                                            { label: 'Male', value: 'Male' },
                                            { label: 'Female', value: 'Female' },
                                        ]}
                                    />
                                </View>
                                <View style={{ width: '40%', marginLeft: 'auto' }}>
                                    <Text>Blood Group: </Text>
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
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <View style={{ width: '40%' }}>
                                    <Text>Any Diseas? </Text>
                                    <TextInput value={diseas} placeholder="Diseas/no" onChangeText={(text) => setDiseas(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                                <View style={{ width: '40%', marginLeft: 'auto' }}>
                                    <Text>Are You Smoker? </Text>
                                    <TextInput value={smoker} placeholder="yes/no" onChangeText={(text) => setSmoker(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                            <Divider style={{ marginVertical: 15 }} />
                            <View style={{ width: '100%', paddingVertical: 15 }}>
                                <Text>Phone No: </Text>
                                <TextInput value={phoneno} placeholder='03039000800' onChangeText={(text) => setPhoneno(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '60%' }}>
                                    <Text>Adress: </Text>
                                    <TextInput value={adress} placeholder="House no 1 Street 7" onChangeText={(text) => setAdress(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                                <View style={{ width: '30%', marginLeft: 'auto' }}>
                                    <Text>City: </Text>
                                    <TextInput value={city} placeholder="Karachi" onChangeText={(text) => setCity(text)} style={{ borderBottomColor: '#C43B1E', borderBottomWidth: 2, }} />
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={styles.LoginBtn} onPress={update}>
                            {loading === true ? <ActivityIndicator size="small" color="white" />
                                : <Text style={{ color: 'white', textAlign: 'center' }} >Update</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.LogoutBtn} onPress={signout}>
                            {logoutloading === true ? <ActivityIndicator size="small" color="white" />
                                : <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>}
                        </TouchableOpacity>
                    </View>
                </View></>}
        </>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 12,
        backgroundColor: '#C43B1E',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        flex: 1,
    },
    LoginBtn: {
        backgroundColor: '#C43B1E',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    LogoutBtn: {
        backgroundColor: 'skyblue',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})




export default Information;