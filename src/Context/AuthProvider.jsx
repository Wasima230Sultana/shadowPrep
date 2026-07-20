import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {auth} from '../firebase/firebase.init'
import { GoogleAuthProvider } from "firebase/auth";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]= useState(null);
    const [loading,setLoading] = useState(true);

    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword (auth,email,password);
    }

    const signInWithEmailAndPasswordFunc =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const signInWithPopUpFunc=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        return()=>{
            unsubscribe();
        }
    },[])

    const signOutUser=()=>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo={
        user,
        createUser,
        signInWithEmailAndPasswordFunc,
        signInWithPopUpFunc,
        signOutUser

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;