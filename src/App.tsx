import React, {useEffect, useState} from 'react';
import useInternetConnection from "./hooks/useInternetConnection";
import {Toast} from "./components/Toast";
import NetworkInfo from "./components/NetworkInfo/NetworkInfo";
import InspectionPage from "./pages/InspectionPage/InspectionPage";
import './app.css'
import {Route, Routes} from "react-router-dom";
import InspectionDetail from "./pages/InspectionDetail/InspectionDetail";


function App() {
    const networkStatus = useInternetConnection();
    const [showToast, setShowToast] = useState(true);
    useEffect(() => {
        setShowToast(true);
    }, [networkStatus]);


    return (
        <div className="app-wrapper">
            <header className="header"
                    style={{}}>
                <h1>
                    Offline Save Example
                </h1>
            </header>
            <main>
                <Routes>
                    <Route path="*" element={<InspectionPage/>}/>
                    <Route path="/inspection/:id" element={<InspectionDetail/>}/>
                </Routes>
            </main>
            {showToast &&
                <Toast type={networkStatus?.isOnline ? "SUCCESS" : "ERROR"}
                       message={networkStatus?.isOnline ? "You are online" : "You are offline"}
                       onClose={() => setShowToast(false)}/>}

            <NetworkInfo isOnline={networkStatus.isOnline} speed={networkStatus.speed} detail={networkStatus.detail}/>
        </div>
    );
}

export default App;
