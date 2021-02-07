import React, { useState, useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    Alert
} from 'react-native';
import HeaderImage from '../assets/bloodbank.jpg';
import AutoTypingText from 'react-native-auto-typing-text';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../config/authprovider';
import firestore from '@react-native-firebase/firestore';


const SignUp = (props) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const { register, loading, isError, setError } = useContext(AuthContext);

    const notFill = () => {
        Alert.alert(
            "Some Thing Is Missing",
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
        checkData(isError.message)
    }

    const checkForm = () => {
        if (firstname === '' || lastname === '' || email === '' || password === '') {
            notFill()
        } else if (password !== confirmPassword) {
            checkData("Confirm Password Not Same.")
        } else {
            register(email, password, firstname, lastname);
        }
    }




    return (
        <>
            <View style={styles.signupContainer}>
                <View style={styles.half1}>
                    <ImageBackground source={HeaderImage} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(12, 15, 0, 0.49)' }}>
                            <AutoTypingText charMovingTime={40} delay={0} text={'Be a blood donor, be a hero – a real one....'} style={{ marginTop: 25, fontSize: 25, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center', color: 'white', width: '100%' }} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.half2}>
                    <View style={styles.form}>
                        <Text style={{ color: '#C43B1E', fontSize: 25, fontWeight: 'bold' }}>SignUp</Text>
                        <TextInput style={styles.inputs} placeholder="First Name" onChangeText={(text) => setFirstname(text)} />
                        <TextInput style={styles.inputs} placeholder="Last Name" onChangeText={(text) => setLastname(text)} />
                        <TextInput style={styles.inputs} placeholder="Email" onChangeText={(text) => setEmail(text)} />
                        <TextInput secureTextEntry={true} style={styles.inputs} placeholder="Password" onChangeText={(text) => setPassword(text)} />
                        <TextInput secureTextEntry={true} style={styles.inputs} placeholder="Confirm Password" onChangeText={(text) => setConfirmpassword(text)} />
                        <TouchableOpacity style={styles.signupBtn} onPress={checkForm}>
                            {loading === true ? <ActivityIndicator size="small" color="white" animating={loading} />
                                : <Text style={{ color: 'white', textAlign: 'center' }}>SignUp</Text>}
                        </TouchableOpacity>
                        <Text style={{ marginTop: 15 }} onPress={() => props.navigation.navigate('LogIn')} >Already Have Account?</Text>
                    </View>
                </View>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    signupContainer: {
        flex: 1,
    },
    half1: {
        flex: 2,
    },
    half2: {
        flex: 3,
        padding: 30,
        backgroundColor: '#C43B1E',
    },
    form: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: -100,
        borderRadius: 10,
    },
    inputs: {
        borderBottomColor: '#C43B1E',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
    signupBtn: {
        backgroundColor: '#C43B1E',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

export default SignUp;


