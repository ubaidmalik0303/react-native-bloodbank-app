import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(false);
    const [isError, setError] = useState(false)
    const [logoutloading, setlogoutloading] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                logoutloading,
                setlogoutloading,
                loading,
                setloading,
                isError,
                setError,
                user,
                setUser,
                login: async (email, password) => {
                    setloading(true)
                    await auth().signInWithEmailAndPassword(email, password).then(() => {
                        setError(false)
                        setloading(false)
                    }).catch((err) => {
                        setloading(false)
                        setError(err)
                    })
                },
                register: async (email, password, firstname, lastname) => {
                    setloading(true)
                    await auth().createUserWithEmailAndPassword(email, password).then(() => {
                        auth().currentUser.updateProfile({
                            displayName: firstname + ' ' + lastname,
                        }).then(() => {
                            firestore().collection("userInfo").doc(auth().currentUser.uid).set({
                                updated: false,
                                uid: auth().currentUser.uid,
                                displayname: firstname + ' ' + lastname,
                                email: auth().currentUser.email,
                                age: "N/A",
                                weight: "N/A",
                                gender: "N/A",
                                bloodgroup: "N/A",
                                smoker: "N/A",
                                diseas: "N/A",
                                phoneno: "N/A",
                                adress: "N/A",
                                city: "N/A",
                                photourl: 'N/A'
                            })
                            setloading(false)
                        }).catch((err) => {
                            setloading(false)
                            setError(err)
                        })
                    }).catch((err) => {
                        setloading(false)
                        setError(err)
                    })
                },
                updateinformation: async (age, weight, gender, diseas, smoker, bloodgroup, phoneno, city, adress) => {
                    setloading(true)
                    try {
                        await firestore().collection("userInfo").doc(auth().currentUser.uid).set({
                            updated: true,
                            uid: auth().currentUser.uid,
                            displayname: auth().currentUser.displayName,
                            email: auth().currentUser.email,
                            age: age,
                            weight: weight,
                            gender: gender,
                            bloodgroup: bloodgroup,
                            smoker: smoker,
                            diseas: diseas,
                            phoneno: phoneno,
                            adress: adress,
                            city: city,
                            photourl: 'N/A'
                        })
                        setloading(false)
                    } catch (err) {
                        setloading(false)
                        setError(err)
                    }
                },
                logout: async () => {
                    await auth().signOut()
                }
            }
            }
        >
            { children}
        </AuthContext.Provider >
    )

}