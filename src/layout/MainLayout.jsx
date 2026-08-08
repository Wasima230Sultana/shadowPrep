import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const MainLayout = () => {
  return (
   <div className="">
            <header className='w-full mx-auto '>
                <Navbar></Navbar>
            </header>
            <main className='w-full mx-auto'>
                <Outlet></Outlet>
            </main>
            <footer className='w-full mx-auto'>
                <Footer></Footer>
            </footer>
        </div>
  );
};

export default MainLayout;