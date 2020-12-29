import React, { useState, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Countries, Data } from '../data/CountryData';
import { Link } from 'react-router-dom'

/* material core */
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '82vh',
    },
    buttonArea: {
        height: '6vh',
        textAlign: 'center',
    }
});

const ListData: React.FC = () => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangeRowsPerPage = useCallback(() => {
        setRowsPerPage(prev => prev + 10);
    }, []);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Countries.slice(0, rowsPerPage).map((country: Data) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={country.code}>
                                    {columns.map((column) => {
                                        const value = country[column.id];
                                        const to = {
                                            pathname: `/list/${country.code}`,
                                            state: country.code
                                        };
                                        const countryName: JSX.Element = <Link to={to}>{value}</Link>;
                                        if (column.id === 'name') {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {countryName}
                                                </TableCell>
                                            );
                                        } else {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        }

                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div className={classes.buttonArea}>
                    <Button color="primary" onClick={handleChangeRowsPerPage}>see more</Button>
                </div>
            </TableContainer>
        </Paper>
    );
};

export default ListData;