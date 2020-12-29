import React from 'react';
import { Countries, Data } from '../data/CountryData';
import { useLocation } from 'react-router-dom';

const nullData: Data = {
    name: "",
    code: "",
    population: 0,
    size: 0,
    density: 0
};

type CountryType = {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const idTypes: string[] = ["name", "code", "population", "size", "density"];

function DescribeData() {
    const location = useLocation<string>();
    const countryData: any = Countries.find(country => country.code === location.state);
    return (
        <React.Fragment>
            {idTypes.map((id) => {
                const value = countryData[id];
                return (
                    <div key={id}>
                        <h3>{id}</h3>
                        <div>{value}</div>
                    </div>
                );
            })}
        </React.Fragment>
    );
}

export default DescribeData;
