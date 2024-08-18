import React from "react";
import ArrowTop from '../../assets/ArrowTop.svg'

export interface ICardProps {
    header: string;
    applicable?: boolean;
    children: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({header, children, applicable = true}) => {

    return (
        <div className='card'>
            <div className='card-header'>
                <div className='left'>
                    {applicable && <img className='card-header__icon' src={ArrowTop}/>}
                    <h2>{header}</h2>
                </div>
                {applicable && (
                    <div className='card-applicable'><p className='checkbox'/> Not applicable</div>
                )}
            </div>
            <div className='card-body'>
                {children}
            </div>

        </div>
    )
}

export default Card;