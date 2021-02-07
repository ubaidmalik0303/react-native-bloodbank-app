import React from 'react';
import SignUp from '../screens/signup';
import LogIn from '../screens/login';
import ForgotPassword from '../screens/forgotpassword';
import { createStackNavigator } from '@react-navigation/stack';



const AuthStack = () => {

    const Stack = createStackNavigator();
    const headerStyle = {
        title: "Blood Bank",
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: 26,
            borderRadius: 5,
            alignSelf: 'center'
        },
        headerStyle: {
            backgroundColor: '#C43B1E',
        }
    }

    return (
        <Stack.Navigator>
            <Stack.Screen options={headerStyle} name="LogIn" component={LogIn} />
            <Stack.Screen options={headerStyle} name="SignUp" component={SignUp} />
            <Stack.Screen options={headerStyle} name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    )
}


export default AuthStack;