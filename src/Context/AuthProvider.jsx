import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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



    const authInfo={
        user,
        createUser,
        signInWithEmailAndPasswordFunc,
        signInWithPopUpFunc
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;