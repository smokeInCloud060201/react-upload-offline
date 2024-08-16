import { handlers } from './handlers';
import {setupWorker} from "msw/browser";

// Initialize the service worker
export const worker = setupWorker(...handlers);