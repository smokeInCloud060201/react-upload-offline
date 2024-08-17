import {useEffect, useState} from "react";

interface NavigatorConnection {
    downlink: number;
    effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    rtt: number;
    saveData: boolean;

    addEventListener(type: 'change', listener: () => void): void;

    removeEventListener(type: 'change', listener: () => void): void;
}

interface Navigator {
    connection?: NavigatorConnection;
}

type NetworkStatus = {
    isOnline: boolean;
    speed: 'fast' | 'slow' | 'unknown';
};

const useInternetConnection = (): NetworkStatus => {
    const [status, setStatus] = useState<NetworkStatus>({
        isOnline: navigator.onLine,
        speed: 'unknown',
    });

    const updateOnlineStatus = () => {
        setStatus((prev) => ({...prev, isOnline: navigator.onLine}));
    };

    const updateNetworkSpeed = () => {
        const connection = (navigator as Navigator).connection;
        if (connection) {
            const {downlink, effectiveType} = connection;
            let speed: 'fast' | 'slow' | 'unknown' = 'unknown';
            if (downlink >= 2 || effectiveType === '4g') {
                speed = 'fast';
            } else if (downlink < 2 || effectiveType === '3g' || effectiveType === '2g' || effectiveType === 'slow-2g') {
                speed = 'slow';
            }

            setStatus((prev) => ({...prev, speed}));
        }
    };

    useEffect(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        const connection = (navigator as Navigator).connection;
        if (connection) {
            updateNetworkSpeed(); // Initial update
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