import { useState, useEffect } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./store/AuthSlice";
import Header from "./components/Header/Header";
import Footer from "./components/footer/Footer";
import authService from "./appwrite/auth";
import Logo from "./components/Logo";

function App() {
  const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    

  useEffect(() => {
    authService
      .getCurUser()
      .then((userData) => {
        if (userData) dispatch(logIn({ userData }));
        else dispatch(logOut());
      })
      .finally(() => setLoading(false));
    
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between  shadow-2xl border-2 border-orange-100 bg-orange-100">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <div className="w-full block">
        <Footer />
        {/* <SampleForm/> */}
      </div>
    </div>
  ) : null;
}

export default App;
