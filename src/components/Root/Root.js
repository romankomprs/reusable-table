import React from "react";
import { format, parse } from "date-fns";
// import Moment from 'react-moment';

import useTable from '../../hooks/useTable'

import mockData from "./mockData";

const COLUMNS = [
    {
        accessor: "id",
        label: "ID"
    },
    {
        accessor: "name",
        label: "Name"
    },
    {
        accessor: ({ dateOfBirth}) => format(parse(dateOfBirth, "yyyy-MM-dd", new Date()), "do MMMM yyyy"),
        label: "Date of Birth"
    },
    {
        accessor: "favouriteFood",
        label: "Favourite Food"
    },
]

const Root = () => {
    console.log("Root: rendering");
    const { headers, pagination: { nextPage, pageNumber, previousPage, totalPages}, rows } = useTable( {columns: COLUMNS, data: mockData, pagination: {pageSize: 2} })
    return (
        <div className="centred">
            <h1>React Interview Questions</h1>
            <p>
                How would you desing a reusable table in React? What features will you support? Be sure to consider legibility, 
                reusability and performance.
            </p>

            <table>
                <thead>
                    <tr>
                        {headers.map(({ label }, index) => (
                            <th key={index}>{label}</th>
                        ))}                        
                    </tr>
                </thead>
                <tbody>                    
                    {rows.map((row, index) => (
                        <tr key={index}>
                               {row.cells.map((cell, index) => (
                                <td key={index}>{cell.renderedValue}</td>
                            ))}                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={()=> previousPage()}>&lt;</button>
                <span>Page {pageNumber} of {totalPages}</span>
                <button onClick={()=> nextPage()}>&gt;</button>
            </div>

        </div>
    );
};

export default Root;
