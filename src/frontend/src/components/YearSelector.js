import React from "react";
import { Link } from "react-router-dom";
import './YearSelector.scss';

export const YearSelector = ({teamName}) => {
    let years = [];

    const startDate = process.env.REACT_APP_DATE_START_YEAR;
    const endDate = process.env.REACT_APP_DATE_END_YEAR;

    for (let i = startDate; i <= endDate; i++) {
        years.push(i);
    }
    return (
        <ol className="YearSelector">
       { years.map(year =>(
       
         <li className="year-list">
           <Link to={`/team/${teamName}/matches/${year}`}>  {year}</Link>
        </li>
     
       )
         )}
        </ol>
      );
}

