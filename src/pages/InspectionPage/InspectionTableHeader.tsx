import React from "react";
import './index.css'
import SortIcon from '../../assets/sortIcon.svg'

const InspectionTableHeader = () => {
    const headerColumnDef = [
        {
            name: 'Workday',
            width: '8%',
            showIcon: true
        },
        {
            name: 'Start Time',
            width: '8%',
            showIcon: true
        },
        {
            name: 'Section',
            width: '12%',
            showIcon: true
        }, {
            name: 'Contract No.',
            width: '10%',
            showIcon: true
        }
        , {
            name: 'Contractor Name',
            width: '12%',
            showIcon: true
        }
        , {
            name: 'Location',
            width: '12%',
            showIcon: true
        }
        , {
            name: 'Night Work',
            width: '8%',
            showIcon: true
        }
        , {
            name: 'Zone',
            width: '10%',
            showIcon: true
        }
        , {
            name: '',
            width: '10%',
            showIcon: false
        }
        , {
            name: '',
            width: '10%',
            showIcon: false
        }

    ]

    return (
        <div className='inspection-table__header'>
            {headerColumnDef.map((item, index) => (
                <div className={''} key={index}
                     style={{width: item.width, display: 'flex', justifyContent: 'flex-start', fontSize: '14px'}}>
                    <p>
                        {item.showIcon &&
                            <img src={SortIcon} alt={'sort icon'}/>}
                    </p>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default InspectionTableHeader;