export type NetworkConnectionType = 'slow-2g' | '2g' | '3g' | '4g';

export interface NavigatorConnection {
    downlink: number;
    effectiveType: NetworkConnectionType
    rtt: number;
    saveData: boolean;
}

export interface NavigatorConnectionWithEvent extends NavigatorConnection {
    addEventListener(type: 'change', listener: () => void): void;

    removeEventListener(type: 'change', listener: () => void): void;
}

export interface Navigator {
    connection?: NavigatorConnectionWithEvent;
}

export type SpeedConnectionType = 'fast' | 'slow' | 'unknown';

export type NetworkStatus = {
    isOnline: boolean;
    speed: SpeedConnectionType;
    detail: NavigatorConnection;
};
