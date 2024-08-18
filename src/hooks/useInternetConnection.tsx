import {useEffect, useState} from "react";
import {
    NetworkStatus,
    Navigator,
    SpeedConnectionType,
    NavigatorConnection
} from "../interface";

const useInternetConnection = (): NetworkStatus => {
    const [status, setStatus] = useState<NetworkStatus>({
        isOnline: navigator.onLine,
        speed: 'unknown',
        detail: {rtt: 0, effectiveType: "4g", downlink: 0, saveData: false}
    });

    const updateOnlineStatus = () => {
        setStatus((prev) => ({...prev, isOnline: navigator.onLine}));
    };

    const updateNetworkSpeed = () => {
        const connection = (navigator as Navigator).connection;
        if (connection) {
            const {downlink, effectiveType, rtt, saveData} = connection;
            let speed: SpeedConnectionType = "fast";
            if (downlink < 2 || effectiveType === '3g' || effectiveType === '2g' || effectiveType === 'slow-2g') {
                speed = 'slow';
            }
            const detail: NavigatorConnection = {
                rtt: rtt,
                effectiveType: effectiveType,
                saveData: saveData,
                downlink: downlink
            }

            setStatus((prev) => ({...prev, speed: speed, detail: detail}));
        }
    };

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        const connection = (navigator as Navigator).connection;
        if (connection) {
            updateNetworkSpeed();
            connection.addEventListener('change', updateNetworkSpeed);
        }

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);

            if (connection) {
                connection.removeEventListener('change', updateNetworkSpeed);
            }
        };
    }, []);

    return status;
};
export default useInternetConnection;