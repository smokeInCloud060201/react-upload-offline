import React, {useCallback, useEffect, useState} from "react";
import {inspectionService} from "../../services/inspection.service";
import InspectionTableHeader from "./InspectionTableHeader";
import {DEFAULT_12HR_TIME_FORMAT, DEFAULT_DATE_FORMAT} from "../../constants/app.constant";
import moment from "moment";
import MoreDetail from '../../assets/MoreDetail.svg';
import {useNavigate} from "react-router-dom";

interface RowProps {
    item: WorkdayInspection;
}

const InspectionPage = () => {

    const [inspectionList, setInspectionList] = useState<WorkdayInspection[]>([]);
    const navigative = useNavigate();

    const getInspectionList = useCallback(async () => {
        const {data: {data}} = await inspectionService.getAvailableInspectionList();
        setInspectionList(data);
    }, [])

    useEffect(() => {
        getInspectionList();
    }, [getInspectionList]);

    const Row: React.FC<RowProps> = ({item}) => {
        return (
            <div style={{
                width: '100%',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                height: '50px',
                borderRadius: '8px',
                fontSize: '14px',
                textAlign: 'left',
                padding: '0 4px',
            }}>
                <div className={'row-col'} style={{width: '8%'}}>
                    {moment(item?.start_time).format(DEFAULT_DATE_FORMAT)}
                </div>
                <div className={'row-col'} style={{width: '8%'}}>
                    {moment(item?.start_time).format(DEFAULT_12HR_TIME_FORMAT).toUpperCase()}
                </div>
                <div className={'row-col'} style={{width: '12%'}}>
                    {item?.worksite?.section?.name}
                </div>
                <div className={'row-col'} style={{width: '10%'}}>
                    {item?.worksite?.contract?.contract_no}
                </div>
                <div className={'row-col line-clamp'} style={{width: '12%'}}>
                    {item?.worksite?.contractor_name}
                </div>
                <div className={'row-col'} style={{width: '12%'}}>
                    {item?.worksite?.location}
                </div>
                <div className={'row-col'} style={{width: '8%'}}>
                    {item?.night_work ? "Yes" : "No"}
                </div>
                <div className={'row-col'} style={{width: '10%'}}>
                    {item?.worksite?.zone}
                </div>
                <div className={'row-col'} style={{width: '10%', justifyContent: 'flex-end'}}>
                    <button style={{
                        backgroundColor: '#00B0B2',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        width: '70px',
                        color: 'white',
                        minHeight: '30px'

                    }} onClick={() => navigative(`/inspection/${item.id}`)}>Book
                    </button>
                </div>
                <div className={'row-col'} style={{width: '10%', justifyContent: 'flex-end'}}>
                    <button style={{border: '1px solid #ccc', padding: '4px 10px', borderRadius: '4px'}}>
                        <img src={MoreDetail} alt={'more detail'}/>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='inspection-table-wrapper'>
            <InspectionTableHeader/>
            <div className='table-content'>
                {inspectionList.map((item, index) => {
                    return (
                        <Row key={index} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default InspectionPage;