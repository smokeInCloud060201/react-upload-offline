import React from "react";
import {NetworkStatus} from "../../interface";
import './index.css'

const NetworkInfo: React.FC<NetworkStatus> = ({speed, isOnline, detail}) => {

    const Row = ({name, value, icon}: any) => {
        return (
            <div className='row'>
                <div>{name}</div>

                <div>{value} {icon}</div>
            </div>
        )
    }

    return (
        <div className='network-info-wrapper'>
            <header className='network-info--header'>
                Network Status Information
            </header>
            <main className='content'>
                <Row name={'Online'} value={isOnline ? 'Yes' : 'No'}
                     icon={<div className={`active-icon ${isOnline ? 'online' : 'offline'}`}/>}/>
                <Row name={'Speed'} value={speed}/>
                <Row name={'Type'} value={detail?.effectiveType}/>
                <Row name={'Download speed'} value={`${detail?.downlink} Mbps`}/>
                <Row name={'Delay'} value={`${detail?.rtt} ms`}/>
            </main>
        </div>

    )
}

export default NetworkInfo;