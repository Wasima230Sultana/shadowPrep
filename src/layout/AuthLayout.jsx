import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
         <div className="">
            <header className='w-11/12 mx-auto '>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </main>
            <footer className='w-11/12 mx-auto'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;