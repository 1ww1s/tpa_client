"use client"

import { FC } from "react";
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import classes from './map.module.scss'

export const MapCompany: FC = () => {
    
    
    const mapData = {
        center: [56.825, 35.985],
        zoom: 12,
    };
      
    const coordinates = [
        [56.812148, 35.984049],
    ];

    return (
        <div className={classes.map}>
            <YMaps>  
                <Map  width={'100%'} height={'100%'} defaultState={mapData} >
                    {coordinates.map((coordinate, ind) => <Placemark key={ind} geometry={coordinate} />)}
                </Map>
            </YMaps>
        </div>
    )
}