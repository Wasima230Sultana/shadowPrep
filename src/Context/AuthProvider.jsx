import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
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

    const updateProfileFunc=(updateData)=>{
        return updateProfile(auth.currentUser,updateData)
    }

    const sendPasswordResetEmailFunc =(email)=>{
        setLoading(true);
        return sendPasswordResetEmail(auth,email);
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
        loading,
        setUser,
        createUser,
        signInWithEmailAndPasswordFunc,
        signInWithPopUpFunc,
        signOutUser,
        updateProfileFunc,
        sendPasswordResetEmailFunc

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;