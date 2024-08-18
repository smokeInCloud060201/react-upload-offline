import {useEffect} from "react";


const useWorker = () => {

    useEffect(() => {
        const worker = new Worker(new URL("./worker/worker.ts", import.meta.url));
        worker.postMessage('PUSH_OFFLINE');

        worker.postMessage('RESET_EXPIRED_RECORD');

        worker.onmessage = (e) => {
            console.log(e.data + ' on main');
        }

        return () => {
            worker.terminate();
        };
    }, []);
}

export default useWorker;