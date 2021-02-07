import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authstack';
import AppDrawer from './appdrawer';
import { AuthContext } from './authprovider';
import auth from '@react-native-firebase/auth';


const Navigation = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitialising] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitialising(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    if (initializing) return null;

    return (
        <>
            <NavigationContainer>
                {user ? <AppDrawer /> : <AuthStack />}
            </NavigationContainer>
        </>
    );

}

export default Navigation;