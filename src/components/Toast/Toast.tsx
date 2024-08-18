import React, {useEffect, useMemo} from "react";
import "./index.css"

interface ToastProps {
    onClose: () => void;
    message?: string;
    type?: ToastType;
    duration?: number;
}

export type ToastType = "ERROR" | "WARNING" | "SUCCESS"

const Toast: React.FC<ToastProps> = ({onClose, message = "", type = "SUCCESS", duration = 4000}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration, onClose]);

    const getTypeToast = useMemo(() => {
        switch (type) {
            case "ERROR":
                return 'error'
            case "WARNING":
                return "warning";
            case "SUCCESS":
                return "success";
            default:
                return "success";
        }
    }, [type]);

    return (
        <div className='toast-wrapper'>
            <div className={`toast-type ${getTypeToast}`}/>
            <div>{message}</div>
        </div>
    )
}


export default Toast;