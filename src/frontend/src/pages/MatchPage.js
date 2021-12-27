import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { YearSelector } from "../components/YearSelector";
import './MatchPage.scss';

export const MatchPage = () => {

    const [matches, setMatches] = useState([]);
    const { teamName, year } = useParams();



    useEffect(() => {
        const fetchMatches = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`);
            const data = await response.json();
            setMatches(data);
        }
        fetchMatches();
    }, [teamName, year])

    return (
        <div className="MatchPage">
            <div className="year-selector" >
                <h4>Select Year</h4>
                <YearSelector key={year} teamName={teamName} />
            </div>


            <div>
                <h1> {teamName} matches in {year}</h1>

                {
                    matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)
                }
            </div>

        </div>
    );
}

