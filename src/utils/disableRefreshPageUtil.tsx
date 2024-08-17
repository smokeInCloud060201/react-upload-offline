import {useEffect} from "react";

export const useDisableRefresh = () => {
    useEffect(() => {
        const disableRefresh = (event: KeyboardEvent) => {
            if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', disableRefresh);

        return () => {
            window.removeEventListener('keydown', disableRefresh);
        };
    }, []);
};

export const usePreventDataLoss = () => {
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = ''; // Required for Chrome
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};

export const useHandlePageRefresh = () => {
    useEffect(() => {
        // Perform any action on page load
        return () => {
            // Perform any cleanup action if needed before the component unmounts
        };
    }, []);
};