import React from 'react';
import { AuthProvider } from './authprovider';
import Navigation from './navigation';


const Routes = () => {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    )
}

export default Routes;