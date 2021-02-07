import React, { useState, useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native';
import HeaderImage from '../assets/bloodbank1.jpg';
import AutoTypingText from 'react-native-auto-typing-text';
import { AuthContext } from '../config/authprovider';
import auth from '@react-native-firebase/auth'


const LogIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, loading, isError, setError } = useContext(AuthContext);

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
        checkData(isError.message)
    }


    const checkForm = () => {
        if (email === '' || password === '') {
            notFill()
        } else {
            login(email, password)
        }
    }

    return (
        <>
            <View style={styles.signupContainer}>
                <View style={styles.half1}>
                    <ImageBackground source={HeaderImage} style={{ width: '100%', height: '100%' }}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(12, 15, 0, 0.49)' }}>
                            <AutoTypingText charMovingTime={40} delay={0} text={'There is no greater joy than saving a soul...'} style={{ marginTop: 20, fontSize: 25, fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center', color: 'white' }} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.half2}>
                    <View style={styles.form}>
                        <Text style={{ color: '#C43B1E', fontSize: 25, fontWeight: 'bold', marginBottom: 10 }}>LogIn</Text>
                        <TextInput style={styles.inputs} placeholder="Email" onChangeText={(text) => setEmail(text)} />
                        <TextInput secureTextEntry={true} style={styles.inputs} placeholder="Password" onChangeText={(text) => setPassword(text)} />
                        <TouchableOpacity onPress={checkForm} style={styles.LoginBtn}>
                            {loading === true ? <ActivityIndicator size="small" color="white" />
                                : <Text style={{ color: 'white', textAlign: 'center' }}>LogIn</Text>}
                        </TouchableOpacity>
                        <Text style={{marginTop: 10, fontSize: 16}} onPress={() => props.navigation.navigate('ForgotPassword')}>Forgot Password</Text>
                        <Text style={{marginTop: 10, fontSize: 16}} onPress={() => props.navigation.navigate('SignUp')}>Create Account</Text>
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
        marginBottom: 15,
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
})



export default LogIn;