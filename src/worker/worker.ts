import {WORKER_EVENTS} from "../constants/app.constant";

// eslint-disable-next-line no-restricted-globals
self.onmessage = (event) => {
    switch (event.data) {
        case WORKER_EVENTS.PUSH_OFFLINE: {
            // eslint-disable-next-line no-restricted-globals
            self.postMessage('This is push offline actions');

            //call API to push images
            break;
        }

        case 'RESET_EXPIRED_RECORD': {
            // eslint-disable-next-line no-restricted-globals
            self.postMessage("RESET_EXPIRED_RECORD");

            //Reset record in indexedDB
            break;
        }

        default: {
            console.error('Unknown event', event.data);
            break;
        }
    }
}

export {}