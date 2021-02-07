import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import HeaderImage from '../assets/bloodbank2.jpg'
import AutoTypingText from 'react-native-auto-typing-text';
import auth from '@react-native-firebase/auth';


const ForgotPassword = (props) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)


    const notFill = () => {
        Alert.alert(
            "Error",
            "Please Fill Email Fields!",
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }

    const checkData = (msg) => {
        Alert.alert(
            "Error",
            msg,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }

    const sendMail = () => {
        setLoading(true)
        if (email === '') {
            notFill()
        } else {
            auth().sendPasswordResetEmail(email).then(() => {
                setLoading(false)
                props.navigation.navigate('LogIn')
            }).catch((err) => {
                checkData(err.message)
            })
        }

    }

    return (
        <>
            <View style={styles.signupContainer}>
                <View style={styles.half1}>
                    <ImageBackground source={HeaderImage} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(12, 15, 0, 0.49)' }}>
                            <AutoTypingText charMovingTime={40} delay={0} text={'Your blood is precious: Donate, save a life & make it divine.....'} style={{ marginTop: 25, fontSize: 25, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center', color: 'white' }} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.half2}>
                    <View style={styles.form}>
                        <Text style={{ color: '#C43B1E', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>Forgot Password</Text>
                        <TextInput style={styles.inputs} placeholder="Email" onChangeText={(text) => setEmail(text)} />
                        <TouchableOpacity style={styles.LoginBtn}>
                            {loading === true ? <ActivityIndicator size="small" color="white" animating={loading} />
                                : <Text style={{ color: 'white', textAlign: 'center' }} onPress={sendMail} >Send Mail</Text>}
                        </TouchableOpacity>
                        <Text style={{ marginTop: 15, marginBottom: 10 }} onPress={() => navigation.navigate('LogIn')} >LogIn</Text>
                        <Text onPress={() => navigation.navigate('SignUp')} >Create Account</Text>
                    </View>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    signupContainer: {
        flex: 1,
    },
    half1: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 15,
    },
    LoginBtn: {
        backgroundColor: '#C43B1E',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
})


export default ForgotPassword;