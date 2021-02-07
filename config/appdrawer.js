import React, { useContext } from 'react';
import Information from '../screens/information';
import Profile from '../screens/profile';
import Home from '../screens/home';
import Search from '../screens/search';
import DonorProfile from '../screens/donorprofile';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import profilePic from '../assets/profile.jpg';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './authprovider';




const CustomDrawer = (props) => {

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: 'white', padding: 10 }}>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                {auth().currentUser ? !auth().currentUser.photoURL ? <Avatar
                    rounded
                    size="xlarge"
                    source={profilePic}
                /> : <Avatar
                        rounded
                        source={{ uri: auth().currentUser.photoURL }}
                        size="xlarge"
                    /> : false}
                <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{auth().currentUser ? auth().currentUser.displayName : false}</Text>
            </View>
            <DrawerItem onPress={() => props.navigation.navigate('Home')} label="Home" />
            <DrawerItem onPress={() => props.navigation.navigate('Profile')} label="Profile" />
            <DrawerItem onPress={() => props.navigation.navigate('Update Information')} label="Update Information" />
            <DrawerItem onPress={() => auth().signOut()} label="Logout" />
        </DrawerContentScrollView>
    )
}

const AppDrawer = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={CustomDrawer}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Update Information" component={Information} />
            <Drawer.Screen name="Search" component={Search} />
            <Drawer.Screen name="Donor Profile" component={DonorProfile} />
        </Drawer.Navigator>
    )
}

export default AppDrawer;